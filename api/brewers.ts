import { brewerTable } from "@/constants/database";
import { Brewer, BrewerCreateData } from "@/types/brewer";
import { supabase } from "@/utils/supabase";

export function createBrewer(data: BrewerCreateData) {
  return supabase.from(brewerTable).insert(data);
}

export function updateBrewer(brewerId: string, data: BrewerCreateData) {
  return supabase.from(brewerTable).update(data).eq("id", brewerId);
}

export function deleteBrewer(brewerId: string) {
  return supabase.from(brewerTable).delete().eq("id", brewerId);
}

export function fetchBrewers(userId: string, limit: number = 10) {
  return supabase
    .from(brewerTable)
    .select("*")
    .eq("user_id", userId)
    .limit(limit);
}

export function fetchBrewer(grinderId: string, userId: string) {
  return supabase
    .from(brewerTable)
    .select("*")
    .eq("id", grinderId)
    .eq("user_id", userId)
    .single();
}
