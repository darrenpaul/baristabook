export type RecipeCoffee = {
  coffee_name: string;
  coffee_roast: string;
  coffee_roast_date?: Date;
  coffee_store: string;
  coffee_store_url: string;
  coffee_purchase_date: Date;
  coffee_purchase_currency: string;
  coffee_purchase_price: number;
  coffee_intensity: number;
  coffee_flavours: string[];
  coffee_rating: number;
  coffee_image?: string;
  coffee_notes?: string;
};

export type RecipeEquipment = {
  brewer_id: string;
  coffee_id: string;
  grinder_id: string;
  water_hardness: string;
};

export type RecipeGrind = {
  grind_size: string;
  grind_duration: number;
  grind_weight: number;
  grind_image?: string;
  grind_notes: string;
};

export type RecipeGrinder = {
  grinder_name: string;
  grinder_notes: string;
};

export type RecipeBrewer = {
  brewer_name: string;
  brewer_method: string;
  brewer_image?: string;
  brewer_notes?: string;
};

export type RecipeInformation = {
  name: string;
  flavours: string[];
  rating: number;
  image: string;
  weight_measurement: string;
  temperature_measurement: string;
  is_public: boolean;
  notes: string;
};

export type RecipeInstructions = {
  instruction_pre_infusion_duration: number;
  instruction_extraction_duration: number;
  instruction_weight: number;
  instruction_temperature: number;
  instruction_pressure: number;
  instruction_notes: string;
};

export type RecipeCreate = {
  name: string;
  water_hardness: string;
  flavours: string[];
  rating: number;
  image: string;
  notes: string;
  user_id: string;
} & RecipeCoffee &
  RecipeGrinder &
  RecipeBrewer &
  RecipeGrind &
  RecipeInstructions &
  RecipeInformation;

export type Recipe = {
  id: string;
  water_hardness: string;
  user_id: string;
  created_at: string;
  updated_at: string;
} & RecipeCoffee &
  RecipeGrinder &
  RecipeBrewer &
  RecipeGrind &
  RecipeInstructions &
  RecipeInformation;
