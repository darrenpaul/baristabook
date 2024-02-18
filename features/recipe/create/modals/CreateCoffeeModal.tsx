import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "@/utils/supabase";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import DropdownWrapper from "@/components/dropdowns/DropdownWrapper";
import Slider from "@/components/Slider";
import { coffeeTable } from "@/constants/database";
import { CoffeeData } from "@/types/coffee";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import { handleImageUpload } from "@/utils/image-storage";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import ModalWrapper from "@/features/shared/components/wrappers/ModalWrapper";
import {
  containerStyles,
  inputStyles,
  typographyStyles,
  buttonStyles,
  paddingStyles,
  marginStyles,
} from "@/features/shared/styles/index";
import {
  CurrencyPriceSelector,
  CurrencyPrice,
  initialCurrencyPriceSettings,
} from "@/features/shared/components/selectors/currency-price-select/index";
import { CoffeeRoast, Taste } from "@/components/icons";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
};

export default function Component(props: ModalProps) {
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

  async function handleSave() {
    if (!nameValue || !roastValue || !intensityValue) {
      validateTextInput({ value: nameValue, setFn: setNameError });
      return;
    }

    const imagePath = await handleImageUpload({
      directory: coffeeImagesBucket,
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

    const { error } = await supabase.from(coffeeTable).insert(coffeeData);

    if (!error) {
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
  }

  function renderContent() {
    return (
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

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
          multiline
          numberOfLines={4}
          value={notesValue}
          onChangeText={setNotes}
          placeholder="Notes"
        />

        <TouchableOpacity style={buttonStyles.button} onPress={handleSave}>
          <Text style={typographyStyles.buttonText}>Save</Text>
          <FontAwesome name="floppy-disk" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ModalWrapper
      title="Add Coffee"
      visible={props.visible}
      hideFn={props.hideFn}
    >
      {renderContent()}
    </ModalWrapper>
  );
}
