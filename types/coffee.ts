export type CoffeeData = {
  name: string;
  roast: string;
  purchase_from: string;
  purchase_date: Date;
  purchase_price: string;
  intensity: number;
  notes: string;
  user_id: string;
};

export type CoffeeResponseData = {
  created_at: string;
  id: string;
  image: string;
  intensity: number;
  name: string;
  notes: string;
  purchase_date: string;
  purchase_from: string;
  purchase_price: string;
  roast: string;
  user_id: string;
};
