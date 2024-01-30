import { grinderTable } from "@/constants/database";
import { GrinderCreateData } from "@/types/grinder";
import { supabase } from "@/utils/supabase";

export function fetchGrinders(userId: string) {
  return supabase.from(grinderTable).select("*").eq("user_id", userId);
}

export function fetchGrinder(grinderId: string, userId: string) {
  return supabase
    .from(grinderTable)
    .select("*")
    .eq("id", grinderId)
    .eq("user_id", userId)
    .single();
}

export function createGrinder(data: GrinderCreateData) {
  return supabase.from(grinderTable).insert(data);
}
