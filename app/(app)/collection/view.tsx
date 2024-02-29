import BrewerList from "@/features/collection/BrewerList";
import CoffeeList from "@/features/collection/CoffeeList";
import GrinderList from "@/features/collection/GrinderList";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { useAuthService } from "@/services/auth-service";
import React from "react";

export default function Page() {
  const { session } = useAuthService();

  return (
    <PageWrapper title="Collection">
      {session && <CoffeeList session={session} />}
      {session && <GrinderList session={session} />}
      {session && <BrewerList session={session} />}
    </PageWrapper>
  );
}
