import { grinderTable } from "@/constants/database";
import { Grinder, GrinderCreateData } from "@/types/grinder";
import { supabase } from "@/utils/supabase";

export function createGrinder(data: GrinderCreateData) {
  return supabase.from(grinderTable).insert(data);
}

export function updateGrinder(grinderId: string, data: GrinderCreateData) {
  return supabase.from(grinderTable).update(data).eq("id", grinderId);
}

export function deleteGrinder(grinderId: string) {
  return supabase.from(grinderTable).delete().eq("id", grinderId);
}

export function fetchGrinders(userId: string, limit: number = 10) {
  return supabase
    .from(grinderTable)
    .select("*")
    .eq("user_id", userId)
    .limit(limit);
}

export function fetchGrinder(grinderId: string, userId: string) {
  return supabase
    .from(grinderTable)
    .select("*")
    .eq("id", grinderId)
    .eq("user_id", userId)
    .single();
}
