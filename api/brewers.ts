import { brewerTable } from "@/constants/database";
import { BrewerCreateData } from "@/types/brewer";
import { supabase } from "@/utils/supabase";

export function fetchBrewers(userId: string) {
  return supabase.from(brewerTable).select("*").eq("user_id", userId);
}

export function fetchBrewer(grinderId: string, userId: string) {
  return supabase
    .from(brewerTable)
    .select("*")
    .eq("id", grinderId)
    .eq("user_id", userId)
    .single();
}

export function createBrewer(data: BrewerCreateData) {
  return supabase.from(brewerTable).insert(data);
}
