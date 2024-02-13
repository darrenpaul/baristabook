import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import appStyles, { containerStyles } from "@/constants/styles";
import { useLocalSearchParams } from "expo-router";
import { fetchRecipe } from "@/api/recipe";
import RecipeCoffeeView from "@/components/recipe/RecipeCoffeeView";
import RecipeGrinderView from "@/components/recipe/RecipeGrinderView";
import RecipeBrewerView from "@/components/recipe/RecipeBrewerView";
import RecipeInstructionsView from "@/components/recipe/RecipeInstructionsView";
import PageLoader from "@/components/loaders/PageLoader";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import EditRecipeModal from "@/components/modals/EditRecipeModal";
import { Recipe } from "@/types/recipe";
import RecipeView from "@/components/recipe/RecipeView";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { fetchUser } from "@/api/user";
import { Preferences, User } from "@/types/user";

export default function Page() {
  const { id: recipeId } = useLocalSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [userValue, setUser] = useState<User>();
  const [preferencesValue, setPreferences] = useState<Preferences>({
    weight: "",
    temperature: "",
  });
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
    if (session) {
      fetchUser().then((response) => {
        const { data } = response;
        setUser(data);
        setPreferences({
          ...preferencesValue,
          weight: data.weight,
          temperature: data.temperature,
        });
        getRecipe();
      });
    }
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
    if (!recipeValue || !preferencesValue) return <PageLoader />;

    return (
      <View style={containerStyles.columnContainer}>
        <RecipeView recipe={recipeValue} />

        <RecipeCoffeeView recipe={recipeValue} />

        <RecipeGrinderView recipe={recipeValue} />

        <RecipeBrewerView recipe={recipeValue} />

        <RecipeInstructionsView
          recipe={recipeValue}
          preferences={preferencesValue}
        />

        <TouchableOpacity
          style={appStyles.buttonSecondary}
          onPress={() => setCoffeeModalValue(true)}
        >
          <Text style={appStyles.buttonSecondaryText}>Edit</Text>
          <FontAwesome name="pen" size={20} color="black" />
        </TouchableOpacity>

        <EditRecipeModal
          recipe={recipeValue}
          visible={coffeeModalValue}
          hideFn={() => setCoffeeModalValue(false)}
          onSaveFn={() => {}}
        />
      </View>
    );
  }

  return <PageWrapper title="Recipe">{renderRecipe()}</PageWrapper>;
}
