import { recipeTable } from "@/constants/database";
import { RecipeCreateData } from "@/types/recipe";
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

export function createRecipe(data: RecipeCreateData) {
  return supabase.from(recipeTable).insert(data);
}
