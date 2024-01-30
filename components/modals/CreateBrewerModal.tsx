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
import Dropdown from "@/components/dropdowns/Dropdown";
import { coffeeBrewMethods } from "@/constants/coffee-brew-methods";
import ModalHeader from "@/components/headers/ModalHeader";
import { BrewerCreateData } from "@/types/brewer";
import { createBrewer } from "@/api/brewers";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
};

export default function Component(props: ModalProps) {
  const [nameValue, setNameValue] = useState<string>("");
  const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<string>("");
  const [notesValue, setNotesValue] = useState<string>("");

  async function handleSave() {
    const data: BrewerCreateData = {
      name: nameValue,
      method: coffeeBrewMethod,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } = await createBrewer(data);
    if (!error) {
      setNameValue("");
      setCoffeeBrewMethod("");
      setNotesValue("");

      props.onSaveFn();
      props.hideFn();
    }
  }

  function renderContent() {
    return (
      <View style={(appStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text="Add Brewer" hideFn={() => props.hideFn()} />

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

              <Dropdown
                value={coffeeBrewMethod}
                setFn={setCoffeeBrewMethod}
                items={coffeeBrewMethods}
                icon="magnifying-glass"
                placeholder="Select Coffee Recipe Method"
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
