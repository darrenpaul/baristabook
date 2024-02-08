import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

const IMAGE_TYPE = "png";
const CONTENT_TYPE = "image/png";

type ImageUploadProps = {
  directory: string;
  imageUri: string;
  userId: string;
};

export async function handleImageUpload(props: ImageUploadProps) {
  const filePath = `${props.userId!}/${new Date().getTime()}.${IMAGE_TYPE}`;

  const base64 = await FileSystem.readAsStringAsync(props.imageUri, {
    encoding: "base64",
  });

  return supabase.storage
    .from(props.directory)
    .upload(filePath, decode(base64), { contentType: CONTENT_TYPE });
}

type ImageDownloadProps = {
  directory: string;
  imagePath: string;
};

export async function handleImageDownload(props: ImageDownloadProps) {
  return supabase.storage.from(props.directory).download(props.imagePath);
}
