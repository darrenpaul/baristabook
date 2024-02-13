export type UserCreate = {
  name: string;
};

export type Preferences = {
  weight: string;
  temperature: string;
};

export type User = {
  created_at: string;
  id: string;
  name: string;
  user_id: string;
} & Preferences;
