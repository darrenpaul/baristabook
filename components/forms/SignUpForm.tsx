import React, { useEffect, useState } from "react";
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
  marginStyles,
} from "@/styles";
import {
  validateTextInput,
  validateEmail,
  validatePassword,
} from "@/utils/input-validation";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { signUp } from "@/api/auth";
import Toast from "react-native-toast-message";
import { buttonSecondary } from "@/constants/button-types";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";

type ComponentProps = {
  toggleForm: Function;
};

export default function Component(props: ComponentProps) {
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [emailValue, setEmail] = useState<string>();
  const [emailErrorValue, setEmailError] = useState<boolean>(false);
  const [passwordValue, setPassword] = useState<string>();
  const [passwordErrorValue, setPasswordError] = useState<boolean>(false);
  const [canSubmitValue, setCanSubmit] = useState<boolean>(false);
  const [isSubmittingValue, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (
      !nameValue ||
      !emailValue ||
      !passwordValue ||
      nameErrorValue ||
      emailErrorValue ||
      passwordErrorValue
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [emailErrorValue, passwordErrorValue]);

  async function onSignUp() {
    setIsSubmitting(true);

    validateTextInput({ value: nameValue, setFn: setNameError });
    validateEmail({ value: emailValue, setFn: setEmailError });
    validatePassword({ value: passwordValue, setFn: setPasswordError });

    if (
      !nameValue ||
      !emailValue ||
      !passwordValue ||
      nameErrorValue ||
      emailErrorValue ||
      passwordErrorValue
    ) {
      setIsSubmitting(false);
      return;
    }

    const { error } = await signUp(nameValue, emailValue, passwordValue);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Authentication",
        text2: error.message,
      });
    }
  }

  return (
    <View style={[containerStyles.column, paddingStyles.horizontalGutter]}>
      <Text style={typographyStyles.heading}>Sign Up For Barista Book</Text>

      <TextInput
        autoComplete="name"
        editable={!isSubmittingValue}
        style={[
          inputStyles.textInput,
          nameErrorValue && inputStyles.textInputError,
        ]}
        value={nameValue}
        onChangeText={(value) => {
          setName(value);
          validateTextInput({ value: value, setFn: setNameError });
        }}
        placeholder="Name"
      />

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

      <ButtonWrapper
        disabled={!canSubmitValue || isSubmittingValue}
        text="Sign Up"
        icon="right-to-bracket"
        loading={isSubmittingValue}
        onPressFn={onSignUp}
      />

      <ButtonWrapper
        text="Already have an account?"
        type={buttonSecondary}
        loading={isSubmittingValue}
        onPressFn={() => props.toggleForm()}
      />
    </View>
  );
}
