import { userTable } from "@/constants/database";
import { UserCreate, User } from "@/types/user";
import { supabase } from "@/utils/supabase";

export function fetchBrewers(userId: string) {
  return supabase.from(userTable).select("*").eq("user_id", userId);
}

export function fetchUser() {
  return supabase.from(userTable).select("*").single();
}

export function createUser(data: UserCreate) {
  return supabase.from(userTable).insert(data);
}

export function updateUser(id: string, data: User) {
  return supabase.from(userTable).update(data).eq("id", id);
}
