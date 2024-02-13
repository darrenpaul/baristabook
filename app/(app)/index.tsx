import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import appStyles, { containerStyles } from "@/constants/styles";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { fetchPublicRecipes, fetchUserRecipes } from "@/api/recipe";
import { Recipe } from "@/types/recipe";
import RecipeListCard from "@/components/cards/RecipeListCard";
import PageLoader from "@/components/loaders/PageLoader";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import AccordionHeader from "@/components/accordion/AccordionHeader";

export default function App() {
  const insets = useSafeAreaInsets();

  const [session, setSession] = useState<Session | null>(null);
  const [publicRecipesValue, setPublicRecipes] = useState<Recipe[]>();
  const [userRecipesValue, setUserRecipes] = useState<Recipe[]>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      getPublicRecipes();
      getUserRecipes();
    }
  }, [session]);

  async function getPublicRecipes() {
    if (!session?.user?.id) return;
    fetchPublicRecipes(session.user.id, 3).then(({ data, error }) => {
      if (!error) {
        const newRecipes = data;
        setPublicRecipes(newRecipes);
      }
    });
  }

  async function getUserRecipes() {
    if (!session?.user?.id) return;
    fetchUserRecipes(session.user.id, 3).then(({ data, error }) => {
      if (!error) {
        const newRecipes = data;
        setUserRecipes(newRecipes);
      }
    });
  }

  function renderUserRecipes() {
    if (!userRecipesValue) return <PageLoader />;

    return userRecipesValue.map((recipe) => (
      <RecipeListCard key={recipe.id} recipe={recipe} />
    ));
  }

  function renderPublicRecipes() {
    if (!publicRecipesValue) return <PageLoader />;

    return publicRecipesValue.map((recipe) => (
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

      <View style={containerStyles.pageContainer}>
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
            <AccordionHeader
              title="Your Recipes"
              active={true}
              disabled={false}
            />
            {renderUserRecipes()}

            <AccordionHeader title="Recipes" active={true} disabled={false} />
            {renderPublicRecipes()}
          </View>
        </ScrollView>

        <BottomNavigation />
      </View>
    </SafeAreaProvider>
  );
}
