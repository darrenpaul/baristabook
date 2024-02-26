export type GrinderCreateData = {
  name: string;
  image?: string;
  notes: string;
  user_id: string;
};

export type Grinder = {
  created_at: string;
  id: string;
  name: string;
  image: string;
  notes: string;
  user_id: string;
};
