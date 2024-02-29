import { createSuggestion } from "@/api/support/suggest-feature";
import DropdownWrapper from "@/components/dropdowns/DropdownWrapper";
import ImagePicker from "@/components/image/ImagePicker";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import ModalWrapper from "@/components/wrappers/ModalWrapper";
import { suggestionsImagesBucket } from "@/constants/storage-buckets";
import {
  containerStyles,
  inputStyles,
  marginStyles,
  paddingStyles,
} from "@/styles";
import { handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  visible: boolean;
  hideFn: Function;
  userId: string;
};

const types = [
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Other",
    value: "other",
  },
];

const components = [
  {
    label: "Coffee",
    value: "coffee",
  },
  {
    label: "Water",
    value: "water",
  },
  {
    label: "Grinder",
    value: "grinder",
  },
  {
    label: "Brewer",
    value: "brewer",
  },
  {
    label: "Grind",
    value: "grind",
  },
  {
    label: "Recipe",
    value: "recipe",
  },
  {
    label: "Other",
    value: "other",
  },
];

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [typeValue, setType] = useState<string>();
  const [componentValue, setComponent] = useState<string>();
  const [suggestionValue, setSuggestions] = useState<string>();
  const [imageValue, setImage] = useState<string>();

  async function onSave() {
    if (!nameValue || !typeValue || !suggestionValue || !componentValue) return;

    setLoading(true);

    const imagePath = await handleImageUpload({
      directory: suggestionsImagesBucket,
      imageUri: imageValue,
      userId: props.userId,
    });

    if (imagePath === undefined) return;

    const data = {
      name: nameValue,
      type: typeValue,
      component: componentValue,
      image: imagePath,
      suggestion: suggestionValue,
      user_id: props.userId,
    };

    const { error } = await createSuggestion(data);

    if (!error) {
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Suggestion Created Successfully",
      });

      props.hideFn();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Something went wrong",
      });
    }

    setLoading(false);
  }

  return (
    <ModalWrapper
      title="Suggestion"
      visible={props.visible}
      hideFn={props.hideFn}
    >
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
          onChangeText={(value) => {
            setName(value);
            validateTextInput({ value: value, setFn: setNameError });
          }}
          placeholder="Name"
        />

        <DropdownWrapper
          value={typeValue}
          setFn={setType}
          items={types}
          placeholder="Select Suggestion Type"
        />

        <DropdownWrapper
          value={componentValue}
          setFn={setComponent}
          items={components}
          placeholder="Select Component"
        />

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
          multiline
          numberOfLines={8}
          value={suggestionValue}
          onChangeText={setSuggestions}
          placeholder="Suggest a feature for the app"
        />

        <ButtonWrapper
          text="Save"
          icon="floppy-disk"
          onPressFn={onSave}
          loading={loadingValue}
        />
      </View>
    </ModalWrapper>
  );
}
