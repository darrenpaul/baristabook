import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteRecipe, fetchRecipe } from "@/api/recipe";
import RecipeCoffeeView from "@/components/recipe/RecipeCoffeeView";
import RecipeGrinderView from "@/components/recipe/RecipeGrinderView";
import RecipeBrewerView from "@/components/recipe/RecipeBrewerView";
import RecipeInstructionsView from "@/components/recipe/RecipeInstructionsView";
import PageLoader from "@/components/loaders/PageLoader";
import { Recipe } from "@/types/recipe";
import RecipeView from "@/components/recipe/RecipeView";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { Preferences } from "@/types/user";
import { containerStyles } from "@/styles";
import { useAuthService } from "@/services/auth-service";
import RecipeGrindView from "@/components/recipe/RecipeGrindView";
import { useUserService } from "@/services/user-service";
import { homeRoute } from "@/constants/routes";
import { buttonDanger } from "@/constants/button-types";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";

export default function Page() {
  const { id: recipeId } = useLocalSearchParams();
  const [preferencesValue, setPreferences] = useState<Preferences>({
    weight: "",
    temperature: "",
  });
  const [recipeValue, setRecipe] = useState<Recipe>();
  const router = useRouter();
  const { session } = useAuthService();
  const { user } = useUserService(session);

  useEffect(() => {
    if (user) {
      setPreferences({
        ...preferencesValue,
        weight: user.weight,
        temperature: user.temperature,
      });
      if (!session?.user?.id || !recipeId || typeof recipeId !== "string")
        return;
      fetchRecipe(recipeId, session?.user?.id).then(({ data, error }) => {
        if (!error) {
          setRecipe(data);
        }
      });
    }
  }, [user]);

  const isRecipeOwner = useMemo(() => {
    if (session?.user.id === recipeValue?.user_id) {
      return true;
    }
    return false;
  }, [session, recipeValue]);

  async function onDelete() {
    if (!recipeId || typeof recipeId !== "string") return;
    await deleteRecipe(recipeId);
    router.push(homeRoute.path);
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
          <ButtonWrapper
            text="Delete"
            icon="trash"
            type={buttonDanger}
            onPressFn={onDelete}
          />
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
