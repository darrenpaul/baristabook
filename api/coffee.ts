import { coffeeTable } from "@/constants/database";
import { supabase } from "@/utils/supabase";

export function fetchCoffees(userId: string) {
  return supabase.from(coffeeTable).select("*").eq("user_id", userId);
}

export function fetchCoffee(coffeeId: string, userId: string) {
  return supabase
    .from(coffeeTable)
    .select("*")
    .eq("id", coffeeId)
    .eq("user_id", userId)
    .single();
}
