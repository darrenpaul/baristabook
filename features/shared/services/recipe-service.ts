import { fetchPublicRecipes, fetchUserRecipes } from "@/api/recipe";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Recipe, RecipeInformation } from "@/types/recipe";
import { grams } from "@/constants/weights";
import { celsius } from "@/constants/temperatures";

export function useRecipeService(session: Session | null) {
  const [publicRecipesValue, setPublicRecipes] = useState<Recipe[]>();
  const [userRecipesValue, setUserRecipes] = useState<Recipe[]>();

  useEffect(() => {
    if (session && session.user) {
      const userId = session.user.id;
      getPublicRecipes({ userId: userId, setFn: setPublicRecipes });
      getUserRecipes({ userId: userId, setFn: setUserRecipes });
    }
  }, [session]);

  return { publicRecipes: publicRecipesValue, userRecipes: userRecipesValue };
}

export function useRecipeInformationStateService() {
  const [recipeValue, setRecipe] = useState<RecipeInformation>({
    name: "",
    flavours: [],
    rating: 5,
    image: "",
    weight_measurement: grams.value,
    temperature_measurement: celsius.value,
    is_public: false,
    notes: "",
  });

  return { recipeValue, setRecipe };
}

type Props = {
  userId: string;
  setFn: Function;
  limit?: number;
};

export async function getPublicRecipes({ userId, setFn, limit = 3 }: Props) {
  fetchPublicRecipes(userId, limit).then(({ data, error }) => {
    if (!error) {
      const newRecipes = data;
      setFn(newRecipes);
    }
  });
}

export async function getUserRecipes({ userId, setFn, limit = 3 }: Props) {
  fetchUserRecipes(userId, limit).then(({ data, error }) => {
    if (!error) {
      const newRecipes = data;
      setFn(newRecipes);
    }
  });
}
