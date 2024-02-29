import { Modal, View } from "react-native";
import ModalHeader from "@/components/headers/ModalHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ModalProps = {
  title: string;
  visible: boolean;
  hideFn: Function;
  children: React.ReactNode;
};

export default function Component(props: ModalProps) {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.hideFn()}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ModalHeader text={props.title} hideFn={() => props.hideFn()} />

      <KeyboardAwareScrollView>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          {props.children}
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}
