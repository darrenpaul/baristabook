import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import appStyles, { containerStyles, paddingStyles } from "@/constants/styles";
import { validateEmail, validatePassword } from "@/utils/input-validation";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { signIn } from "@/api/auth";

type ComponentProps = {
  toggleForm: Function;
};

export default function Component(props: ComponentProps) {
  const [emailValue, setEmail] = useState<string>();
  const [emailErrorValue, setEmailError] = useState<boolean>(false);
  const [passwordValue, setPassword] = useState<string>();
  const [passwordErrorValue, setPasswordError] = useState<boolean>(false);
  const [canSubmitValue, setCanSubmit] = useState<boolean>(false);
  const [isSubmittingValue, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (
      !emailValue ||
      !passwordValue ||
      emailErrorValue ||
      passwordErrorValue
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [emailErrorValue, passwordErrorValue]);

  async function onSignIn() {
    setIsSubmitting(true);

    validateEmail({ value: emailValue, setFn: setEmailError });
    validatePassword({ value: passwordValue, setFn: setPasswordError });

    if (!canSubmitValue) {
      setIsSubmitting(false);
      return;
    }

    await signIn(emailValue, passwordValue);
  }

  return (
    <View style={[containerStyles.columnContainer, paddingStyles.horizontal]}>
      <Text style={appStyles.headerText}>Sign Into Your Account</Text>

      <TextInput
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        editable={!isSubmittingValue}
        style={[
          appStyles.textInput,
          emailErrorValue && appStyles.textInputError,
        ]}
        value={emailValue}
        onChangeText={(value) => {
          setEmail(value);
          validateEmail({ value: value, setFn: setEmailError });
        }}
        placeholder="Email"
      />

      <TextInput
        style={[
          appStyles.textInput,
          passwordErrorValue && appStyles.textInputError,
        ]}
        editable={!isSubmittingValue}
        value={passwordValue}
        secureTextEntry={true}
        onChangeText={(value) => {
          setPassword(value);
          validatePassword({ value: value, setFn: setPasswordError });
        }}
        placeholder="Password"
      />

      <TouchableOpacity
        disabled={!canSubmitValue || isSubmittingValue}
        style={[
          appStyles.button,
          (!canSubmitValue && appStyles.buttonDisabled) ||
            (isSubmittingValue && appStyles.buttonDisabled),
        ]}
        onPress={onSignIn}
      >
        {isSubmittingValue && <ActivityIndicator />}

        {!isSubmittingValue && (
          <>
            <Text style={appStyles.buttonText}>Sign In</Text>
            <FontAwesome name="right-to-bracket" size={20} color="white" />
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isSubmittingValue}
        style={appStyles.buttonSecondary}
        onPress={() => props.toggleForm()}
      >
        <Text style={appStyles.buttonSecondaryText}>
          Don't have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
