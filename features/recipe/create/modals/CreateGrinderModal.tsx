import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import {
  containerStyles,
  typographyStyles,
  inputStyles,
  buttonStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import { GrinderCreateData } from "@/types/grinder";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
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
      <View
        style={[
          containerStyles.column,
          paddingStyles.horizontalGutter,
          marginStyles.bottomGutter,
        ]}
      >
        <TextInput
          style={inputStyles.textInput}
          value={nameValue}
          onChangeText={setNameValue}
          placeholder="Name"
        />

        <TextInput
          style={inputStyles.areaInput}
          multiline
          numberOfLines={4}
          value={notesValue}
          onChangeText={setNotesValue}
          placeholder="Notes"
        />

        <TouchableOpacity style={buttonStyles.button} onPress={handleSave}>
          <Text style={typographyStyles.buttonText}>Save</Text>
          <FontAwesome name="floppy-disk" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ModalWrapper
      title="Add Grinder"
      visible={props.visible}
      hideFn={props.hideFn}
    >
      {renderContent()}
    </ModalWrapper>
  );
}
