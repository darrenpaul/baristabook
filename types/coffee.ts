export type CoffeeData = {
  name: string;
  roast: string;
  intensity: number;
  flavours: string[];
  store_name?: string;
  store_url?: string;
  purchase_date?: Date;
  purchase_price?: number;
  purchase_currency?: string;
  image?: string;
  notes?: string;
  user_id: string;
};

export type Coffee = {
  id: string;
  created_at: string;
  name: string;
  roast: string;
  store_name: string;
  store_url: string;
  purchase_date: Date;
  purchase_price: number;
  purchase_currency: string;
  intensity: number;
  flavours: string[];
  image?: string;
  notes?: string;
  userId: string;
};

export type Coffee = {
  id: string;
  created_at: string;
  name: string;
  roast: string;
  store_name: string;
  store_url: string;
  purchase_date: Date;
  purchase_price: number;
  purchase_currency: string;
  intensity: number;
  flavours: string[];
  image?: string;
  notes?: string;
  userId: string;
};
