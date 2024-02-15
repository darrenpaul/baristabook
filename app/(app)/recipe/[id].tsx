import { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import appStyles from "@/features/shared/styles/styles";
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
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";
import { fetchUser } from "@/api/user";
import { Preferences } from "@/types/user";
import {
  buttonStyles,
  typographyStyles,
  containerStyles,
} from "@/features/shared/styles/index";
import { useAuthService } from "@/features/shared/services/auth-service";
import RecipeGrindView from "@/components/recipe/RecipeGrindView";

export default function Page() {
  const { id: recipeId } = useLocalSearchParams();
  const [preferencesValue, setPreferences] = useState<Preferences>({
    weight: "",
    temperature: "",
  });
  const [recipeValue, setRecipe] = useState<Recipe>();
  const [coffeeModalValue, setCoffeeModalValue] = useState<boolean>(false);

  const { session } = useAuthService();

  useEffect(() => {
    if (session) {
      fetchUser().then((response) => {
        const { data } = response;
        setPreferences({
          ...preferencesValue,
          weight: data.weight,
          temperature: data.temperature,
        });
        getRecipe();
      });
    }
  }, [session]);

  const isRecipeOwner = useMemo(() => {
    if (session?.user.id === recipeValue?.user_id) {
      return true;
    }
    return false;
  }, [session, recipeValue]);

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
      <View style={containerStyles.column}>
        <RecipeView recipe={recipeValue} />

        <RecipeCoffeeView recipe={recipeValue} />

        <RecipeGrinderView recipe={recipeValue} />

        <RecipeGrindView recipe={recipeValue} preferences={preferencesValue} />

        <RecipeBrewerView recipe={recipeValue} />

        <RecipeInstructionsView
          recipe={recipeValue}
          preferences={preferencesValue}
        />

        {isRecipeOwner === true && (
          <TouchableOpacity
            style={buttonStyles.buttonSecondary}
            onPress={() => setCoffeeModalValue(true)}
          >
            <Text style={typographyStyles.buttonSecondaryText}>Edit</Text>
            <FontAwesome name="pen" size={20} color="black" />
          </TouchableOpacity>
        )}

        {/* <EditRecipeModal
          recipe={recipeValue}
          visible={coffeeModalValue}
          hideFn={() => setCoffeeModalValue(false)}
          onSaveFn={() => {}}
        /> */}
      </View>
    );
  }

  return <PageWrapper title="Recipe">{renderRecipe()}</PageWrapper>;
}
