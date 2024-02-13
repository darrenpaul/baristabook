import { supabase } from "@/utils/supabase";
import { createUser } from "./user";

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
}

export async function signUp(name: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return { data: null, error };
  }

  await createUser({ name });

  return { data, error };
}

export function signOut() {
  return supabase.auth.signOut();
}
