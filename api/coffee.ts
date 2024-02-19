import { coffeeTable } from "@/constants/database";
import { CoffeeData } from "@/types/coffee";
import { supabase } from "@/utils/supabase";

export function createCoffee(data: CoffeeData) {
  return supabase.from(coffeeTable).insert(data);
}

export function updateCoffee(coffeeId: string, data: CoffeeData) {
  return supabase.from(coffeeTable).update(data).eq("id", coffeeId);
}

export function deleteCoffee(coffeeId: string) {
  return supabase.from(coffeeTable).delete().eq("id", coffeeId);
}

export function fetchCoffees(userId: string, limit: number = 10) {
  return supabase
    .from(coffeeTable)
    .select("*")
    .eq("user_id", userId)
    .limit(limit);
}

export function fetchCoffee(coffeeId: string, userId: string) {
  return supabase
    .from(coffeeTable)
    .select("*")
    .eq("id", coffeeId)
    .eq("user_id", userId)
    .single();
}
