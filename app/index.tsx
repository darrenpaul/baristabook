import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase";
import appStyles from "@/constants/styles";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { fetchRecipes } from "@/api/recipe";
import { Recipe } from "@/types/recipe";
import RecipeListCard from "@/components/cards/RecipeListCard";
import PageLoader from "@/components/loaders/PageLoader";

export default function App() {
  const insets = useSafeAreaInsets();

  const [session, setSession] = useState<Session | null>(null);
  const [recipesValue, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) handleRefresh();
  }, [session]);

  async function getBrews() {
    if (!session?.user?.id) return;
    const { data, error, status } = await fetchRecipes(session.user.id);
    if (!error) {
      const newRecipes = data;
      setRecipes(newRecipes);
    }
  }

  async function handleRefresh() {
    getBrews();
  }

  function renderContent() {
    if (!recipesValue) return <PageLoader />;

    return recipesValue.map((recipe) => (
      <RecipeListCard key={recipe.id} recipe={recipe} />
    ));
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={appStyles.pageContainer}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              gap: 24,
              paddingHorizontal: 20,
              paddingBottom: 48,
              height: "100%",
              paddingTop: insets.top,
            }}
          >
            <Text style={appStyles.headerText}>Recipes</Text>
            {renderContent()}
          </View>
        </ScrollView>

        <BottomNavigation />
      </View>
    </SafeAreaProvider>
  );
}
