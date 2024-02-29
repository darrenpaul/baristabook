import { suggestionTable } from "@/constants/database";
import { supabase } from "@/utils/supabase";

type CreateSuggestion = {
  name: string;
  component: string;
  image?: string;
  suggestion: string;
  user_id: string;
  type: string;
};

export function createSuggestion(data: CreateSuggestion) {
  return supabase.from(suggestionTable).insert(data);
}
