import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

type ValidateTextInputProps = {
  value: string | number | undefined;
  setFn: Function;
};

export function validateTextInput(props: ValidateTextInputProps) {
  if (props.value === "" || props.value === undefined) {
    props.setFn(true);
    return;
  }
  props.setFn(false);
}

export function validateEmail(props: ValidateTextInputProps) {
  if (props.value === "" || props.value === undefined) {
    props.setFn(true);
    return;
  }

  if (!isEmail(props.value.toString())) {
    props.setFn(true);
    return;
  }

  props.setFn(false);
}

export function validatePassword(props: ValidateTextInputProps) {
  if (props.value === "" || props.value === undefined) {
    props.setFn(true);
    return;
  }

  if (!isStrongPassword(props.value.toString())) {
    props.setFn(true);
    return;
  }

  props.setFn(false);
}
