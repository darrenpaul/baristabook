import React, { useEffect, useState } from "react";
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";
import { signOut } from "@/api/auth";
import { updateUser } from "@/api/user";
import { Preferences, User } from "@/types/user";
import { useAuthService } from "@/features/shared/services/auth-service";
import { useUserService } from "@/features/shared/services/user-service";
import { gramSettings } from "@/constants/grind-settings";
import { celsiusSettings } from "@/constants/temperature-settings";
import CoffeeList from "@/features/collection/CoffeeList";
import GrinderList from "@/features/collection/GrinderList";
import BrewerList from "@/features/collection/BrewerList";

export default function Page() {
  const { session } = useAuthService();
  const { user } = useUserService(session);
  const [preferencesValue, setPreferences] = useState<Preferences>({
    weight: gramSettings.label,
    temperature: celsiusSettings.label,
  });

  useEffect(() => {
    if (user) {
      setPreferences({
        weight: user.weight,
        temperature: user.temperature,
      });
    }
  }, [user]);

  async function onUpdatePreferences() {
    if (!session?.user.id || !user || !preferencesValue) return;
    const newData: User = {
      ...user,
      weight: preferencesValue.weight,
      temperature: preferencesValue.temperature,
    };
    await updateUser(session?.user.id, newData);
  }

  async function onSignOut() {
    await signOut();
  }

  return (
    <PageWrapper title="Collection">
      {session && <CoffeeList session={session} />}
      {session && <GrinderList session={session} />}
      {session && <BrewerList session={session} />}
    </PageWrapper>
  );
}
