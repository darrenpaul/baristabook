import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { containerStyles, paddingStyles } from "@/styles";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import typography from "@/styles/typography";

type ComponentProps = {
  value: string | undefined;
  setFn: Function;
};

const MAX_IMAGE_SIZE = 5200000; // 5MB

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
  const [errorValue, setError] = useState<string>();

  async function onImageSelect(isCamera: boolean = false) {
    setError("");

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

      if (img.fileSize && img.fileSize > MAX_IMAGE_SIZE) {
        setError("Image size must be less than 2MB");
        return;
      }
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

      <Text style={typography.error}>{errorValue}</Text>
    </View>
  );
}
