import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { fetchCoffees } from "@/api/coffee";
import { Coffee } from "@/types/coffee";

export function useCoffeeService(session: Session | null) {
  const [coffeesValue, setCoffees] = useState<Coffee[]>([]);

  useEffect(() => {
    if (session && session.user) {
      const userId = session.user.id;
      getCoffees({ userId: userId, setFn: setCoffees });
    }
  }, [session]);

  return { coffees: coffeesValue };
}

type Props = {
  userId: string;
  setFn: Function;
  limit?: number;
};

export async function getCoffees({ userId, setFn, limit = 10 }: Props) {
  fetchCoffees(userId, limit).then(({ data, error }) => {
    if (!error) {
      setFn(data);
    }
  });
}
