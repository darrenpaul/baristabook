import { set } from "date-fns";
import { Alert } from "react-native";

type Props = {
  title: string;
  message: string;
  onConfirmFn: Function;
  setLoadingFn?: Function;
};

export function useConfirmService({
  title = "Warning",
  message = "Are you sure you want to continue?",
  onConfirmFn = () => {},
  setLoadingFn = () => {},
}: Props) {
  function onConfirm() {
    setLoadingFn(true);
    Alert.alert(title, message, [
      {
        text: "No",
        style: "cancel",
        onPress: () => setLoadingFn(false),
      },
      { text: "Yes", onPress: () => onConfirmFn() },
    ]);
  }

  return { onConfirm };
}
