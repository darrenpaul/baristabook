import React from "react";
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";
import { signOut } from "@/api/auth";
import AccountUserPreferencesForm from "@/features/account/forms/AccountUserPreferencesForm";
import AccountSupportForm from "@/features/account/forms/AccountSupportForm";
import { useAuthService } from "@/features/shared/services/auth-service";
import { useUserService } from "@/features/shared/services/user-service";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";

export default function Page() {
  const { session } = useAuthService();
  const { user } = useUserService(session);

  async function onSignOut() {
    await signOut();
  }
  return (
    <PageWrapper title="Account">
      {user && <AccountUserPreferencesForm user={user} />}

      {user && <AccountSupportForm user={user} />}

      <ButtonWrapper
        text="Logout"
        icon="arrow-right-from-bracket"
        onPressFn={onSignOut}
      />
    </PageWrapper>
  );
}
