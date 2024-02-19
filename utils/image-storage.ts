import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

const IMAGE_TYPE = "png";
const CONTENT_TYPE = "image/png";

type ImageUploadProps = {
  directory: string;
  imageUri: string | undefined;
  userId: string;
};

export async function handleImageUpload(props: ImageUploadProps) {
  if (!props.imageUri) return "";

  const filePath = `${props.userId!}/${new Date().getTime()}.${IMAGE_TYPE}`;

  const base64 = await FileSystem.readAsStringAsync(props.imageUri, {
    encoding: "base64",
  });

  const { data, error } = await supabase.storage
    .from(props.directory)
    .upload(filePath, decode(base64), { contentType: CONTENT_TYPE });

  if (error) {
    return;
  }
  return data.path;
}

type ImageDownloadProps = {
  directory: string;
  imagePath: string;
};

export async function handleImageDownload(props: ImageDownloadProps) {
  return supabase.storage.from(props.directory).download(props.imagePath);
}

type ImageDeleteProps = {
  directory: string;
  imagePath: string;
};
export async function handleImageDelete(props: ImageDeleteProps) {
  return supabase.storage.from(props.directory).remove([props.imagePath]);
}

type ImageReplaceProps = {
  directory: string;
  currentImage: string | undefined; // The current image path
  imageUri: string | undefined; // The new image uri
  userId: string;
};
export async function handleImageReplace(props: ImageReplaceProps) {
  if (props.currentImage && props.imageUri) {
    await handleImageDelete({
      directory: props.directory,
      imagePath: props.currentImage,
    });
  }

  if (props.imageUri) {
    return handleImageUpload({
      directory: props.directory,
      imageUri: props.imageUri,
      userId: props.userId,
    });
  }

  return props.currentImage;
}
