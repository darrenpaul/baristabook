import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { containerStyles, paddingStyles } from "@/styles";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";

type ComponentProps = {
  value: string | undefined;
  setFn: Function;
};

const windowWidth =
  Dimensions.get("window").width -
  paddingStyles.horizontalGutter.paddingHorizontal * 2;

const options: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsMultipleSelection: false,
  allowsEditing: true,
  aspect: [4, 3],
  cameraType: ImagePicker.CameraType.back,
  quality: 1,
};

export default function Component(props: ComponentProps) {
  const [imageUriValue, setImageUri] = useState<string>(); // Image URI for preview

  async function onImageSelect(isCamera: boolean = false) {
    Haptics.selectionAsync();

    // REQUEST PERMISSIONS
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await ImagePicker.requestCameraPermissionsAsync();

    const result = isCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const img = result.assets[0];
      setImageUri(img.uri);
      props.setFn(result.assets[0].uri);
    }
  }

  return (
    <View style={containerStyles.column}>
      {imageUriValue && (
        <Image
          width={windowWidth}
          height={windowWidth}
          source={{ uri: imageUriValue }}
        />
      )}

      <View style={containerStyles.row}>
        <ButtonWrapper
          text="Upload"
          icon="upload"
          type={buttonSecondary}
          onPressFn={onImageSelect}
        />

        <ButtonWrapper
          text="Camera"
          icon="camera"
          type={buttonSecondary}
          onPressFn={() => onImageSelect(true)}
        />
      </View>
    </View>
  );
}
