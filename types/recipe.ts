export type RecipeCreateData = {
  name: string;
  brewer_id: string;
  coffee_id: string;
  grinder_id: string;
  water_hardness: string;
  grind_size: string;
  grind_duration: number;
  grind_weight: number;
  grind_notes: string;
  brew_pre_infusion_duration: number;
  brew_duration: number;
  brew_weight: number;
  brew_temperature: number;
  brew_pressure: number;
  brew_flavour: string;
  brew_rating: number;
  brew_notes: string;
  user_id: string;
};

export type RecipeResponseData = {
  created_at: string;
  id: string;
  name: string;
  brewer_id: string;
  coffee_id: string;
  grinder_id: string;
  water_hardness: string;
  grind_size: string;
  grind_duration: number;
  grind_weight: number;
  grind_notes: string;
  brew_pre_infusion_duration: number;
  brew_duration: number;
  brew_weight: number;
  brew_temperature: number;
  brew_pressure: number;
  brew_flavour: string;
  brew_rating: number;
  brew_notes: string;
  user_id: string;
};

export type RecipeEquipment = {
  brewer_id: string;
  coffee_id: string;
  grinder_id: string;
  water_hardness: string;
};

export type RecipeGrind = {
  size: string;
  duration: number;
  weight: number;
  notes: string;
};

export type Recipe = {
  pre_infusion_duration: number;
  duration: number;
  weight: number;
  temperature: number;
  pressure: number;
  flavour: string;
  rating: number;
  notes: string;
};
