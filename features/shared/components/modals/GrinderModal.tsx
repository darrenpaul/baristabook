import { useEffect, useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import {
  containerStyles,
  inputStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import { Grinder, GrinderCreateData } from "@/types/grinder";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
import { createGrinder, deleteGrinder, updateGrinder } from "@/api/grinder";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { buttonDanger } from "@/constants/button-types";
import { ModalProps } from "./props";
import { useConfirmService } from "@/features/shared/services/confirm-service";
import {
  grindImagesBucket,
  grinderImagesBucket,
} from "@/constants/storage-buckets";
import { handleImageDelete, handleImageReplace } from "@/utils/image-storage";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";

type Props = {
  editData?: Grinder;
} & ModalProps;

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);
  const [nameValue, setName] = useState<string>("");
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>("");

  const { onConfirm } = useConfirmService({
    title: "Warning",
    message: "Are you sure you want to delete this coffee?",
    onConfirmFn: onDelete,
    setLoadingFn: setLoading,
  });

  useEffect(() => {
    if (props.editData) {
      setName(props.editData.name);
      setNotes(props.editData.notes);
    } else {
      clearStates();
    }
  }, [props.editData]);

  const isEditing = useMemo(() => {
    if (props.editData) return true;
    return false;
  }, [props.editData]);

  function clearStates() {
    setName("");
    setImage(undefined);
    setNotes("");
  }

  async function onDelete() {
    if (!props.editData) return;

    if (props.editData.image) {
      await handleImageDelete({
        directory: grinderImagesBucket,
        imagePath: props.editData?.image,
      });
    }

    const { error } = await deleteGrinder(props.editData.id);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
  }

  async function onSave() {
    if (!nameValue) return;

    setLoading(true);

    const imagePath = await handleImageReplace({
      directory: grinderImagesBucket,
      currentImage: props.editData?.image,
      imageUri: imageValue,
      userId: props.userId,
    });

    const data: GrinderCreateData = {
      name: nameValue,
      image: imagePath,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } =
      isEditing && props.editData
        ? await updateGrinder(props.editData.id, data)
        : await createGrinder(data);

    setLoading(false);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
  }

  return (
    <ModalWrapper
      title={isEditing ? "Edit Grinder" : "Add Grinder"}
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
          style={inputStyles.textInput}
          value={nameValue}
          onChangeText={setName}
          placeholder="Name"
        />

        {props.editData?.image && !imageValue && (
          <ImageWrapper
            imageBucket={grinderImagesBucket}
            imageUrl={props.editData.image}
          />
        )}

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
          multiline
          numberOfLines={4}
          value={notesValue}
          onChangeText={setNotes}
          placeholder="Notes"
        />

        <View style={containerStyles.row}>
          {isEditing && (
            <ButtonWrapper
              text="Delete"
              icon="trash-can"
              type={buttonDanger}
              onPressFn={onConfirm}
              loading={loadingValue}
            />
          )}

          <ButtonWrapper
            text="Save"
            icon="floppy-disk"
            onPressFn={onSave}
            loading={loadingValue}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
