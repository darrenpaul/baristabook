import { recipeTable } from "@/constants/database";
import { RecipeCreate, Recipe } from "@/types/recipe";
import { supabase } from "@/utils/supabase";

export function fetchRecipes(userId: string) {
  return supabase.from(recipeTable).select("*").eq("user_id", userId);
}

export function fetchRecipe(id: string, userId: string) {
  return supabase
    .from(recipeTable)
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();
}

export function createRecipe(data: RecipeCreate) {
  return supabase.from(recipeTable).insert(data);
}

export function updateRecipe(id: string, data: RecipeCreate) {
  return supabase.from(recipeTable).update(data).eq("id", id);
}
