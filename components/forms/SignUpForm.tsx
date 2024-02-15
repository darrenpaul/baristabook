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
} from "@/features/shared/styles/index";
import {
  validateTextInput,
  validateEmail,
  validatePassword,
} from "@/utils/input-validation";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { signUp } from "@/api/auth";
import Toast from "react-native-toast-message";

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
      <Text style={typographyStyles.heading}>Sign Up For BrewLog</Text>

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

      <TouchableOpacity
        disabled={!canSubmitValue || isSubmittingValue}
        style={[
          buttonStyles.button,
          (!canSubmitValue && buttonStyles.buttonDisabled) ||
            (isSubmittingValue && buttonStyles.buttonDisabled),
        ]}
        onPress={onSignUp}
      >
        {isSubmittingValue && <ActivityIndicator />}

        {!isSubmittingValue && (
          <>
            <Text style={typographyStyles.buttonText}>Sign Up</Text>
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
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
