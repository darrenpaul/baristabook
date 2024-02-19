import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import DropdownWrapper from "@/components/dropdowns/DropdownWrapper";
import Slider from "@/components/Slider";
import { Coffee, CoffeeData } from "@/types/coffee";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import { handleImageDelete, handleImageReplace } from "@/utils/image-storage";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
import {
  containerStyles,
  inputStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import {
  CurrencyPriceSelector,
  CurrencyPrice,
  initialCurrencyPriceSettings,
} from "@/features/shared/components/selectors/currency-price-select/index";
import { CoffeeRoast, Taste } from "@/components/icons";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { createCoffee, deleteCoffee, updateCoffee } from "@/api/coffee";
import { buttonDanger } from "@/constants/button-types";

type Props = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
  editData?: Coffee;
};

export default function Component(props: Props) {
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [roastValue, setRoast] = useState<string>();
  const [intensityValue, setIntensity] = useState<number>(5);
  const [flavoursValue, setFlavours] = useState<string[]>([]);
  const [storeNameValue, setStoreName] = useState<string>();
  const [storeUrlValue, setStoreUrl] = useState<string>();
  const [purchaseDateValue, setPurchaseDate] = useState<Date>(new Date());
  const [currencyPriceValue, setCurrencyPrice] = useState<CurrencyPrice>(
    initialCurrencyPriceSettings
  );
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>();

  useEffect(() => {
    if (props.editData) {
      const date = props.editData.purchase_date
        ? new Date(props.editData.purchase_date)
        : new Date();

      const price = `${props.editData.purchase_price}`;
      const currency = props.editData.purchase_currency
        ? props.editData.purchase_currency
        : "EUR";

      setName(props.editData.name);
      setRoast(props.editData.roast);
      setIntensity(props.editData.intensity);
      setFlavours(props.editData.flavours);
      setStoreName(props.editData.store_name);
      setStoreUrl(props.editData.store_url);
      setPurchaseDate(date);
      setCurrencyPrice({
        price: price,
        currency: currency,
      });
      setNotes(props.editData.notes);
    }
  }, [props.editData]);

  const isEditing = useMemo(() => {
    if (props.editData) return true;
    return false;
  }, [props.editData]);

  function clearStates() {
    setName("");
    setRoast("");
    setIntensity(5);
    setFlavours([]);
    setStoreName("");
    setStoreUrl("");
    setPurchaseDate(new Date());
    setCurrencyPrice(initialCurrencyPriceSettings);
    setNotes("");

    props.onSaveFn();
    props.hideFn();
  }

  async function onDelete() {
    if (!props.editData) return;

    if (props.editData.image) {
      await handleImageDelete({
        directory: coffeeImagesBucket,
        imagePath: props.editData?.image,
      });
    }

    const { error } = await deleteCoffee(props.editData.id);
    if (!error) clearStates();
  }

  async function onDeleteConfirm() {
    Alert.alert("Warning", "Are you sure you want to delete this coffee?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: onDelete },
    ]);
  }

  async function onSave() {
    if (!nameValue || !roastValue) return;

    const imagePath = await handleImageReplace({
      directory: coffeeImagesBucket,
      currentImage: props.editData?.image,
      imageUri: imageValue,
      userId: props.userId,
    });

    if (imagePath === undefined) return;

    const coffeeData: CoffeeData = {
      name: nameValue,
      roast: roastValue,
      intensity: intensityValue,
      flavours: flavoursValue,
      store_name: storeNameValue,
      store_url: storeUrlValue,
      purchase_date: purchaseDateValue,
      purchase_price: Number(currencyPriceValue.price?.replace(/,/g, ".")),
      purchase_currency: currencyPriceValue.currency,
      image: imagePath,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } =
      isEditing && props.editData
        ? await updateCoffee(props.editData.id, coffeeData)
        : await createCoffee(coffeeData);

    if (!error) clearStates();
  }

  return (
    <ModalWrapper
      title={isEditing ? "Edit Coffee" : "Add Coffee"}
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
          value={roastValue}
          setFn={setRoast}
          items={coffeeRoasts}
          icon={<CoffeeRoast />}
          placeholder="Select Roast Type"
        />

        <Slider
          title="Intensity"
          minValue={0}
          maxValue={10}
          measurement=""
          value={intensityValue}
          setFn={setIntensity}
          disableCustomInput={true}
        />

        <MultiSelectDropdown
          value={flavoursValue}
          setFn={setFlavours}
          items={coffeeFlavours}
          icon={<Taste />}
          placeholder="Select Flavour Profile"
        />

        <TextInput
          style={inputStyles.textInput}
          value={storeNameValue}
          onChangeText={setStoreName}
          placeholder="Store Name"
        />

        <TextInput
          style={inputStyles.textInput}
          value={storeUrlValue}
          onChangeText={setStoreUrl}
          placeholder="Store Link"
        />

        <View style={containerStyles.row}>
          <Text>Purchase Date</Text>

          <DateTimePicker
            value={purchaseDateValue}
            onChange={(_, date) => {
              if (date) setPurchaseDate(date);
            }}
          />
        </View>

        <CurrencyPriceSelector
          data={currencyPriceValue}
          setFn={setCurrencyPrice}
        />

        {props.editData?.image && !imageValue && (
          <ImageWrapper
            imageBucket={coffeeImagesBucket}
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
            onPressFn={onDeleteConfirm}
          />
        )}

        <ButtonWrapper text="Save" icon="floppy-disk" onPressFn={onSave} />
      </View>
    </ModalWrapper>
  );
}
