import { recipeTable } from "@/constants/database";
import { RecipeCreate, Recipe } from "@/types/recipe";
import { supabase } from "@/utils/supabase";

export function fetchPublicRecipes(userId: string, limit: number = 10) {
  return supabase
    .from(recipeTable)
    .select("*")
    .eq("is_public", true)
    .neq("user_id", userId)
    .limit(limit)
    .order("updated_at", { ascending: false });
}

export function fetchUserRecipes(userId: string, limit: number = 10) {
  return supabase
    .from(recipeTable)
    .select("*")
    .eq("user_id", userId)
    .limit(limit)
    .order("updated_at", { ascending: false });
}

// export async function fetchRecipes(userId: string) {
//   const [publicRecipes, UserRecipes] = await Promise.all([
//     fetchPublicRecipes(userId),
//     fetchUserRecipes(userId),
//   ]);
//   return publicRecipes;
// }

export function fetchRecipe(id: string, userId: string) {
  return supabase
    .from(recipeTable)
    .select("*")
    .eq("id", id)
    .or(`user_id.eq.${userId},is_public.eq.${true}`)
    .single();
}

export function createRecipe(data: RecipeCreate) {
  return supabase.from(recipeTable).insert(data);
}

export function updateRecipe(id: string, data: RecipeCreate) {
  return supabase.from(recipeTable).update(data).eq("id", id);
}
