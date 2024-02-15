import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import appStyles from "@/features/shared/styles/styles";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  title: string;
  placeholder: string;
  initialValue: string | number;
  onSaveFn: Function;
  inputType: "numeric" | "default";
};

export default function Component(props: ModalProps) {
  const [nameValue, setNameValue] = useState<string>();

  useEffect(() => {
    if (props.visible === true) setNameValue(props.initialValue.toString());
  }, [props.visible]);

  function handleSave() {
    props.onSaveFn(nameValue);
    setNameValue("");
    props.hideFn();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.hideFn();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={appStyles.headerText}>{props.title}</Text>

          <TextInput
            style={appStyles.textInput}
            value={nameValue}
            onChangeText={setNameValue}
            placeholder={props.placeholder}
            keyboardType={props.inputType}
          />

          <View style={appStyles.buttonGroupHorizontal}>
            <TouchableOpacity
              style={{ ...appStyles.buttonSecondary, flex: 1 }}
              onPress={() => props.hideFn()}
            >
              <Text style={appStyles.buttonSecondaryText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...appStyles.button, flex: 1 }}
              onPress={handleSave}
            >
              <Text style={appStyles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    gap: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
