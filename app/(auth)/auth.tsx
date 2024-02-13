import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { homeRoute } from "@/constants/routes";
import SignInForm from "@/components/forms/SignInForm";
import { containerStyles } from "@/constants/styles";
import CoffeeCollage from "@/components/illustrations/CoffeeCollage";
import SignUpForm from "@/components/forms/SignUpForm";

export default function App() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isSignInValue, setIsSignIn] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        Toast.show({
          type: "error",
          text1: "Authentication",
          text2: "No authenticated user found. Redirecting to login.",
        });
        router.push(homeRoute.path);
      }
    });
  }, []);

  function renderForm() {
    if (isSignInValue) {
      return <SignInForm toggleForm={() => setIsSignIn(false)} />;
    }
    return <SignUpForm toggleForm={() => setIsSignIn(true)} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={containerStyles.pageContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <CoffeeCollage />
          </View>

          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              paddingTop: 24,
            }}
          >
            {renderForm()}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Toast />
    </KeyboardAvoidingView>
  );
}
