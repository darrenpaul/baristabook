import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles, { containerStyles } from "@/constants/styles";
import Dropdown from "@/components/dropdowns/Dropdown";
import { coffeeBrewMethods } from "@/constants/coffee-brew-methods";
import ModalHeader from "@/components/headers/ModalHeader";
import { BrewerCreateData } from "@/types/brewer";
import { createBrewer } from "@/api/brewers";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/components/image/ImagePicker";

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

  async function onUploadImage(
    imageUri: string | undefined,
    userId: string
  ): Promise<string | undefined> {
    if (imageUri) {
      const { data: imageData, error: imageError } = await handleImageUpload({
        directory: brewerImagesBucket,
        imageUri: imageUri,
        userId: userId,
      });
      if (imageError) {
        return;
      }
      return imageData?.path;
    }
    return "";
  }

  async function handleSave() {
    if (!nameValue || !coffeeBrewMethod) {
      validateTextInput({ value: nameValue, setFn: setNameError });
      return;
    }

    const imagePath = await onUploadImage(imageValue, props.userId);

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
      <View style={(containerStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text="Add Brewer" hideFn={() => props.hideFn()} />

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
              style={[
                appStyles.textInput,
                nameErrorValue && appStyles.textInputError,
              ]}
              value={nameValue}
              onChangeText={setName}
              placeholder="Name"
            />

            <Dropdown
              value={coffeeBrewMethod}
              setFn={setCoffeeBrewMethod}
              items={coffeeBrewMethods}
              icon="magnifying-glass"
              placeholder="Select Coffee Recipe Method"
            />

            <ImagePicker value={imageValue} setFn={setImage} />

            <TextInput
              style={appStyles.areaInput}
              multiline
              numberOfLines={4}
              value={notesValue}
              onChangeText={setNotes}
              placeholder="Notes"
            />

            <TouchableOpacity style={appStyles.button} onPress={handleSave}>
              <Text style={appStyles.buttonText}>Save</Text>
              <FontAwesome name="floppy-disk" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
