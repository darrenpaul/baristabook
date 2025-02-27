import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { fetchBrewers } from "@/api/brewers";
import { Brewer } from "@/types/brewer";

export function useBrewerService(session: Session | null) {
  const [brewersValue, setBrewers] = useState<Brewer[]>([]);

  useEffect(() => {
    handleRefresh();
  }, [session]);

  function handleRefresh() {
    if (session && session.user) {
      const userId = session.user.id;
      getBrewers({ userId: userId, setFn: setBrewers });
    }
  }

  return { brewers: brewersValue, refreshFn: handleRefresh };
}

type Props = {
  userId: string;
  setFn: Function;
  limit?: number;
};

export async function getBrewers({ userId, setFn, limit = 10 }: Props) {
  fetchBrewers(userId, limit).then(({ data, error }) => {
    if (!error) {
      setFn(data);
    }
  });
}
