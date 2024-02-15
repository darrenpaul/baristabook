export type BrewerCreateData = {
  name: string;
  method: string;
  image?: string;
  notes?: string;
  user_id: string;
};

export type Brewer = {
  created_at: string;
  id: string;
  name: string;
  method: string;
  image?: string;
  notes?: string;
  user_id: string;
};
