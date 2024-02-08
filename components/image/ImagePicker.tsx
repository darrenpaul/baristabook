import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";

import appStyles from "@/constants/styles";

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
    <View style={styles.container}>
      {imageUriValue && (
        <Image width={200} height={200} source={{ uri: imageUriValue }} />
      )}

      <TouchableOpacity
        style={appStyles.buttonSecondary}
        onPress={onImageSelection}
      >
        <Text style={appStyles.buttonSecondaryText}>Image</Text>
        <FontAwesome name="upload" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
});
