import React, { useState, ReactNode } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import {
  aeroPress,
  coffeeBrewMethods,
  frenchPress,
} from "@/constants/coffee-brew-methods";
import { BrewerCreateData } from "@/types/brewer";
import { createBrewer } from "@/api/brewers";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
import {
  containerStyles,
  inputStyles,
  typographyStyles,
  buttonStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import { AeroPress, CoffeeMachine, FrenchPress } from "@/components/icons";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
};

export default function Component(props: ModalProps) {
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<string>();
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>();

  function renderIcon(): ReactNode {
    if (coffeeBrewMethod === frenchPress.label) {
      return <FrenchPress />;
    }
    if (coffeeBrewMethod === aeroPress.label) {
      return <AeroPress />;
    }
    return <CoffeeMachine />;
  }

  async function handleSave() {
    if (!nameValue || !coffeeBrewMethod) {
      validateTextInput({ value: nameValue, setFn: setNameError });
      return;
    }

    const imagePath = await handleImageUpload({
      directory: brewerImagesBucket,
      imageUri: imageValue,
      userId: props.userId,
    });

    const data: BrewerCreateData = {
      name: nameValue,
      method: coffeeBrewMethod,
      image: imagePath,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } = await createBrewer(data);
    if (!error) {
      setName("");
      setCoffeeBrewMethod("");
      setImage("");
      setNotes("");

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
          style={[
            inputStyles.textInput,
            nameErrorValue && inputStyles.textInputError,
          ]}
          value={nameValue}
          onChangeText={setName}
          placeholder="Name"
        />

        <Dropdown
          value={coffeeBrewMethod}
          setFn={setCoffeeBrewMethod}
          items={coffeeBrewMethods}
          icon={renderIcon()}
          placeholder="Select Coffee Recipe Method"
        />

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
          multiline
          numberOfLines={4}
          value={notesValue}
          onChangeText={setNotes}
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
      title="Add Brewer"
      visible={props.visible}
      hideFn={props.hideFn}
    >
      {renderContent()}
    </ModalWrapper>
  );
}
