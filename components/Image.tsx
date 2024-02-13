import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from "react-native";
import { handleImageDownload } from "@/utils/image-storage";

type Props = {
  imageBucket: string;
  imageUrl: string | undefined;
};

const windowWidth = Dimensions.get("window").width;

export default function Component(props: Props) {
  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const [imageValue, setImage] = useState<string>();
  const [loadingValue, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnimation]);

  useEffect(() => {
    if (props.imageUrl) {
      downloadImage();
    } else {
      setLoading(false);
    }
  }, [props.imageUrl]);

  async function downloadImage() {
    if (!props.imageUrl) return;

    handleImageDownload({
      directory: props.imageBucket,
      imagePath: props.imageUrl,
    }).then(({ data }) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(data!);
      fileReader.onload = () => {
        setImage(fileReader.result as string);
        setLoading(false);
      };
    });
  }

  function renderLoader() {
    return <ActivityIndicator size="large" />;
  }

  function renderImage() {
    if (!imageValue && loadingValue) return renderLoader();

    return (
      <Animated.View
        style={{
          opacity: fadeInAnimation,
        }}
      >
        <Image
          resizeMode="contain"
          height={windowWidth}
          source={{ uri: imageValue }}
        />
      </Animated.View>
    );
  }

  if (!imageValue && !loadingValue) {
    return <></>;
  }

  return <View style={styles.container}>{renderImage()}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
});
