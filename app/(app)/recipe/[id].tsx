import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import PageHeader from "@/components/headers/PageHeader";
import appStyles from "@/constants/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { fetchRecipe } from "@/api/recipe";
import RecipeCoffeeView from "@/components/recipe/RecipeCoffeeView";
import RecipeGrinderView from "@/components/recipe/RecipeGrinderView";
import RecipeBrewerView from "@/components/recipe/RecipeBrewerView";
import RecipeInstructionsView from "@/components/recipe/RecipeInstructionsView";
import PageLoader from "@/components/loaders/PageLoader";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import EditRecipeModal from "@/components/modals/EditRecipeModal";
import { recipeImagesBucket } from "@/constants/storage-buckets";
import Rating from "@/components/Rating";
import Image from "@/components/Image";
import { Recipe } from "@/types/recipe";
import { format } from "date-fns";
import { dateFormat } from "@/constants/date";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import RecipeView from "@/components/recipe/RecipeView";

export default function Page() {
  const insets = useSafeAreaInsets();

  const { id: recipeId } = useLocalSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [recipeValue, setRecipe] = useState<Recipe>();
  const [coffeeModalValue, setCoffeeModalValue] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getRecipe();
  }, [session]);

  async function getRecipe() {
    if (!session?.user?.id || !recipeId || typeof recipeId !== "string") return;
    const { data, error } = await fetchRecipe(recipeId, session?.user?.id);
    if (!error) {
      const newRecipe = data;
      setRecipe(newRecipe);
    }
  }

  function renderRecipe() {
    if (!recipeValue) return <PageLoader />;

    return (
      <ScrollView>
        <View
          style={{
            display: "flex",
            gap: 24,
            paddingHorizontal: 20,
            paddingBottom: 48,
          }}
        >
          <RecipeView recipe={recipeValue} />

          <RecipeCoffeeView recipe={recipeValue} />

          <RecipeGrinderView recipe={recipeValue} />

          <RecipeBrewerView recipe={recipeValue} />

          <RecipeInstructionsView recipe={recipeValue} />

          <TouchableOpacity
            style={appStyles.buttonSecondary}
            onPress={() => setCoffeeModalValue(true)}
          >
            <Text style={appStyles.buttonSecondaryText}>Edit</Text>
            <FontAwesome name="pen" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <EditRecipeModal
          recipe={recipeValue}
          visible={coffeeModalValue}
          hideFn={() => setCoffeeModalValue(false)}
          onSaveFn={() => {}}
        />
      </ScrollView>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={[
          appStyles.pageContainer,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <PageHeader text="Recipe" />
        {renderRecipe()}
      </View>
    </SafeAreaProvider>
  );
}
