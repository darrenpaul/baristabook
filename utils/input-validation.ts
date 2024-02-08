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
