import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Grinder } from "@/types/grinder";
import { fetchGrinders } from "@/api/grinder";

export function useGrinderService(session: Session | null) {
  const [grindersValue, setGrinders] = useState<Grinder[]>([]);

  useEffect(() => {
    handleRefresh();
  }, [session]);

  function handleRefresh() {
    if (session && session.user) {
      const userId = session.user.id;
      getGrinders({ userId: userId, setFn: setGrinders });
    }
  }

  return { grinders: grindersValue, refreshFn: handleRefresh };
}

type Props = {
  userId: string;
  setFn: Function;
  limit?: number;
};

export async function getGrinders({ userId, setFn, limit = 10 }: Props) {
  fetchGrinders(userId, limit).then(({ data, error }) => {
    if (!error) {
      setFn(data);
    }
  });
}
