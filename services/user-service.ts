import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { User } from "@/types/user";
import { fetchUser } from "@/api/user";

export function useUserService(session: Session | null) {
  const [userValue, setUser] = useState<User>();

  useEffect(() => {
    if (session && session.user) {
      getUser({ setFn: setUser });
    }
  }, [session]);

  return { user: userValue };
}

type Props = {
  setFn: Function;
};

export async function getUser({ setFn }: Props) {
  fetchUser().then(({ data, error }) => {
    if (!error) {
      setFn(data);
    }
  });
}
