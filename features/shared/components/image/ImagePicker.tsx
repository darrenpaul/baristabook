import React, { useState } from "react";
import { View, Image } from "react-native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { containerStyles } from "@/features/shared/styles/index";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";

type ComponentProps = {
  value: string | undefined;
  setFn: Function;
};

export default function Component(props: ComponentProps) {
  const [imageUriValue, setImageUri] = useState<string>(); // Image URI for preview

  async function onImageSelection() {
    Haptics.selectionAsync();

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      cameraType: ImagePicker.CameraType.back,
    };

    // REQUEST PERMISSIONS
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await ImagePicker.requestCameraPermissionsAsync();

    const result = await ImagePicker.launchCameraAsync(options);

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
        <Image width={200} height={200} source={{ uri: imageUriValue }} />
      )}

      <ButtonWrapper
        text="Image Upload"
        icon="upload"
        type={buttonSecondary}
        onPressFn={onImageSelection}
      />
    </View>
  );
}
