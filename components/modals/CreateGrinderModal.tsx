import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

import appStyles from "@/constants/styles";
import ModalHeader from "@/components/headers/ModalHeader";
import { GrinderCreateData } from "@/types/grinder";
import { createGrinder } from "@/api/grinder";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
};

export default function Component(props: ModalProps) {
  const [nameValue, setNameValue] = useState<string>("");
  const [notesValue, setNotesValue] = useState<string>("");

  async function handleSave() {
    const data: GrinderCreateData = {
      name: nameValue,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } = await createGrinder(data);
    if (!error) {
      setNameValue("");
      setNotesValue("");

      props.onSaveFn();
      props.hideFn();
    }
  }

  function renderContent() {
    return (
      <View style={(appStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text="Add Grinder" hideFn={() => props.hideFn()} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View
              style={{
                display: "flex",
                gap: 12,
                paddingHorizontal: 20,
                paddingBottom: 48,
              }}
            >
              <TextInput
                style={appStyles.textInput}
                value={nameValue}
                onChangeText={setNameValue}
                placeholder="Name"
              />

              <TextInput
                style={appStyles.areaInput}
                multiline
                numberOfLines={4}
                value={notesValue}
                onChangeText={setNotesValue}
                placeholder="Notes"
              />

              <TouchableOpacity style={appStyles.button} onPress={handleSave}>
                <Text style={appStyles.buttonText}>Save</Text>
                <FontAwesome name="floppy-disk" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.hideFn()}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {renderContent()}
    </Modal>
  );
}
