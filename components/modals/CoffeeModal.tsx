import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import DropdownWrapper from "@/components/dropdowns/DropdownWrapper";
import Slider from "@/components/Slider";
import { Coffee, CoffeeData } from "@/types/coffee";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/components/image/ImagePicker";
import { handleImageDelete, handleImageReplace } from "@/utils/image-storage";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import ModalWrapper from "@/components/wrappers/ModalWrapper";
import {
  containerStyles,
  inputStyles,
  paddingStyles,
  marginStyles,
} from "@/styles";
import {
  CurrencyPriceSelector,
  CurrencyPrice,
  initialCurrencyPriceSettings,
} from "@/components/selectors/currency-price-select/index";
import { CoffeeRoast, Taste } from "@/components/icons";
import ImageWrapper from "@/components/wrappers/ImageWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { createCoffee, deleteCoffee, updateCoffee } from "@/api/coffee";
import { buttonDanger } from "@/constants/button-types";
import { ModalProps } from "./props";
import { useConfirmService } from "@/services/confirm-service";
import RatingForm from "@/components/forms/RatingForm";
import DateSelector from "@/components/selectors/date-select/DateSelector";

type Props = {
  editData?: Coffee;
} & ModalProps;

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [roastValue, setRoast] = useState<string>();
  const [roastDateValue, setRoastDate] = useState<Date>(new Date());
  const [intensityValue, setIntensity] = useState<number>(5);
  const [flavoursValue, setFlavours] = useState<string[]>([]);
  const [storeNameValue, setStoreName] = useState<string>();
  const [storeUrlValue, setStoreUrl] = useState<string>();
  const [purchaseDateValue, setPurchaseDate] = useState<Date>(new Date());
  const [currencyPriceValue, setCurrencyPrice] = useState<CurrencyPrice>(
    initialCurrencyPriceSettings,
  );
  const [ratingValue, setRating] = useState<number>(5);
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
      const roastDate = props.editData.roast_date
        ? new Date(props.editData.roast_date)
        : new Date();
      const purchaseDate = props.editData.purchase_date
        ? new Date(props.editData.purchase_date)
        : new Date();

      const price = `${props.editData.purchase_price}`;
      const currency = props.editData.purchase_currency
        ? props.editData.purchase_currency
        : "EUR";

      setName(props.editData.name);
      setRoast(props.editData.roast);
      setRoastDate(roastDate);
      setIntensity(props.editData.intensity);
      setFlavours(props.editData.flavours);
      setStoreName(props.editData.store_name);
      setStoreUrl(props.editData.store_url);
      setPurchaseDate(purchaseDate);
      setCurrencyPrice({
        price: price,
        currency: currency,
      });
      setRating(props.editData.rating);
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
    setRoast("");
    setRoastDate(new Date());
    setIntensity(5);
    setFlavours([]);
    setStoreName("");
    setStoreUrl("");
    setPurchaseDate(new Date());
    setCurrencyPrice(initialCurrencyPriceSettings);
    setRating(5);
    setImage(undefined);
    setNotes("");
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
    setLoading(false);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
  }

  async function onSave() {
    if (!nameValue || !roastValue) return;
    setLoading(true);

    const imagePath = await handleImageReplace({
      directory: coffeeImagesBucket,
      currentImage: props.editData?.image,
      imageUri: imageValue,
      userId: props.userId,
    });

    if (imagePath === undefined) return;

    console.log(imagePath)

    const coffeeData: CoffeeData = {
      name: nameValue,
      roast: roastValue,
      roast_date: roastDateValue,
      intensity: intensityValue,
      flavours: flavoursValue,
      store_name: storeNameValue,
      store_url: storeUrlValue,
      purchase_date: purchaseDateValue,
      purchase_price: Number(currencyPriceValue.price?.replace(/,/g, ".")),
      purchase_currency: currencyPriceValue.currency,
      rating: ratingValue,
      image: imagePath,
      notes: notesValue,
      user_id: props.userId,
    };

    const { error } =
      isEditing && props.editData
        ? await updateCoffee(props.editData.id, coffeeData)
        : await createCoffee(coffeeData);

    setLoading(false);
    if (!error) {
      clearStates();
      props.onSaveFn();
      props.hideFn();
    }
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

        <DateSelector labelText="Roast Date" value={roastDateValue} setFn={setRoastDate} />

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

        <DateSelector labelText="Purchase Date" value={purchaseDateValue} setFn={setPurchaseDate} />

        <CurrencyPriceSelector
          data={currencyPriceValue}
          setFn={setCurrencyPrice}
        />

        <RatingForm value={ratingValue} setFn={setRating} />

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
