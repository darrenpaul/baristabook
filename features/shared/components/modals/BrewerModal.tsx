import React, { useState, ReactNode, useMemo, useEffect } from "react";
import { View, TextInput } from "react-native";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import {
  aeroPress,
  coffeeBrewMethods,
  frenchPress,
} from "@/constants/coffee-brew-methods";
import { Brewer, BrewerCreateData } from "@/types/brewer";
import { createBrewer, deleteBrewer, updateBrewer } from "@/api/brewers";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { handleImageDelete, handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
import {
  containerStyles,
  inputStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import { AeroPress, CoffeeMachine, FrenchPress } from "@/components/icons";
import { ModalProps } from "./props";
import { useConfirmService } from "@/features/shared/services/confirm-service";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { buttonDanger } from "@/constants/button-types";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";

type Props = {
  editData?: Brewer;
} & ModalProps;

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<string>();
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>();

  const { onConfirm } = useConfirmService({
    title: "Warning",
    message: "Are you sure you want to delete this coffee?",
    onConfirmFn: onDelete,
    setLoadingFn: setLoading,
  });

  useEffect(() => {
    if (props.editData) {
      setName(props.editData.name);
      setCoffeeBrewMethod(props.editData.method);
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
    setCoffeeBrewMethod("");
    setImage("");
    setNotes("");
  }

  function renderIcon(): ReactNode {
    if (coffeeBrewMethod === frenchPress.label) {
      return <FrenchPress />;
    }
    if (coffeeBrewMethod === aeroPress.label) {
      return <AeroPress />;
    }
    return <CoffeeMachine />;
  }

  async function onDelete() {
    if (!props.editData) return;
    if (props.editData.image) {
      await handleImageDelete({
        directory: brewerImagesBucket,
        imagePath: props.editData?.image,
      });
    }
    const { error } = await deleteBrewer(props.editData.id);
    setLoading(false);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
  }

  async function onSave() {
    if (!nameValue || !coffeeBrewMethod) {
      validateTextInput({ value: nameValue, setFn: setNameError });
      return;
    }
    setLoading(true);

    const imagePath = await handleImageUpload({
      directory: brewerImagesBucket,
      imageUri: imageValue,
      userId: props.userId,
    });

    const data: BrewerCreateData = {
      name: nameValue,
      method: coffeeBrewMethod,
      image: imagePath,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } =
      isEditing && props.editData
        ? await updateBrewer(props.editData.id, data)
        : await createBrewer(data);

    setLoading(false);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
  }

  return (
    <ModalWrapper
      title={isEditing ? "Edit Brewer" : "Add Brewer"}
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
          onChangeText={setName}
          placeholder="Name"
        />

        <Dropdown
          value={coffeeBrewMethod}
          setFn={setCoffeeBrewMethod}
          items={coffeeBrewMethods}
          icon={renderIcon()}
          placeholder="Select Coffee Recipe Method"
        />

        {props.editData?.image && !imageValue && (
          <ImageWrapper
            imageBucket={brewerImagesBucket}
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
    </ModalWrapper>
  );
}
