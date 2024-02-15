import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  containerStyles,
  paddingStyles,
  typographyStyles,
  inputStyles,
  buttonStyles,
} from "@/features/shared/styles/index";
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
  const [isSubmittingValue, setIsSubmitting] = useState<boolean>(false);

  const buttonDisabled = useMemo(() => {
    if (
      !emailValue ||
      !passwordValue ||
      emailErrorValue ||
      passwordErrorValue
    ) {
      return false;
    }
    return true;
  }, [emailErrorValue, passwordErrorValue]);

  async function onSignIn() {
    setIsSubmitting(true);

    validateEmail({ value: emailValue, setFn: setEmailError });
    validatePassword({ value: passwordValue, setFn: setPasswordError });

    if (!buttonDisabled || !emailValue || !passwordValue) {
      setIsSubmitting(false);
      return;
    }

    await signIn(emailValue, passwordValue);
  }

  return (
    <View style={[containerStyles.column, paddingStyles.horizontalGutter]}>
      <Text style={typographyStyles.heading}>Sign Into Your Account</Text>

      <TextInput
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        editable={!isSubmittingValue}
        style={[
          inputStyles.textInput,
          emailErrorValue && inputStyles.textInputError,
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
          inputStyles.textInput,
          passwordErrorValue && inputStyles.textInputError,
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
        disabled={!buttonDisabled}
        style={[
          buttonStyles.button,
          !buttonDisabled && buttonStyles.buttonDisabled,
        ]}
        onPress={onSignIn}
      >
        {isSubmittingValue && <ActivityIndicator />}

        {!isSubmittingValue && (
          <>
            <Text style={typographyStyles.buttonText}>Sign In</Text>
            <FontAwesome name="right-to-bracket" size={20} color="white" />
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isSubmittingValue}
        style={buttonStyles.buttonSecondary}
        onPress={() => props.toggleForm()}
      >
        <Text style={typographyStyles.buttonSecondaryText}>
          Don't have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
