import { Session } from "@supabase/supabase-js";
import { Slot } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { loginRoute } from "@/constants/routes";
import Toast from "react-native-toast-message";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Layout() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session === null) {
        Toast.show({
          type: "error",
          text1: "Authentication",
          text2: "No authenticated user found. Redirecting to login.",
        });
        router.push(loginRoute.path);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <Slot />

        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
