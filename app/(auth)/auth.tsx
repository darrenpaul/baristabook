import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { homeRoute } from "@/constants/routes";
import SignInForm from "@/components/forms/SignInForm";
import CoffeeCollage from "@/components/illustrations/CoffeeCollage";
import SignUpForm from "@/components/forms/SignUpForm";
import { useAuthService } from "@/services/auth-service";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { containerStyles } from "@/styles";

export default function App() {
  const router = useRouter();
  const { session } = useAuthService();
  const [isSignInValue, setIsSignIn] = useState(true);

  useEffect(() => {
    if (session) {
      Toast.show({
        type: "error",
        text1: "Authentication",
        text2: "No authenticated user found. Redirecting to login.",
      });
      router.push(homeRoute.path);
    }
  }, [session]);

  function renderForm() {
    if (isSignInValue) {
      return <SignInForm toggleForm={() => setIsSignIn(false)} />;
    }
    return <SignUpForm toggleForm={() => setIsSignIn(true)} />;
  }

  return (
    <KeyboardAwareScrollView>
      <View style={containerStyles.column}>
        <CoffeeCollage />

        {renderForm()}
      </View>

      <Toast />
    </KeyboardAwareScrollView>
  );
}
