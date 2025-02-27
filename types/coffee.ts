export type CoffeeData = {
  name: string;
  roast: string;
  roast_date?: Date;
  intensity: number;
  flavours: string[];
  store_name?: string;
  store_url?: string;
  purchase_date?: Date;
  purchase_price?: number;
  purchase_currency?: string;
  image?: string;
  rating: number;
  notes?: string;
  user_id: string;
};

export type Coffee = {
  id: string;
  created_at: string;
  name: string;
  roast: string;
  roast_date?: Date;
  store_name: string;
  store_url: string;
  purchase_date: Date;
  purchase_price: number;
  purchase_currency: string;
  intensity: number;
  flavours: string[];
  image?: string;
  rating: number;
  notes?: string;
  userId: string;
};
