import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "@/utils/supabase";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import Dropdown from "@/components/dropdowns/Dropdown";
import Slider from "@/components/Slider";
import { coffeeTable } from "@/constants/database";
import { CoffeeData } from "@/types/coffee";
import ModalHeader from "@/components/headers/ModalHeader";
import { currencyList } from "@/utils/currency";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/components/image/ImagePicker";
import { handleImageUpload } from "@/utils/image-storage";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import appStyles, { containerStyles } from "@/constants/styles";

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
  const [priceValue, setPrice] = useState<string>();
  const [currencyValue, setCurrency] = useState<string>();
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>();

  const currencySymbols = currencyList();

  async function onUploadImage(
    imageUri: string | undefined,
    userId: string
  ): Promise<string | undefined> {
    if (imageUri) {
      const { data: imageData, error: imageError } = await handleImageUpload({
        directory: coffeeImagesBucket,
        imageUri: imageUri,
        userId: userId,
      });
      if (imageError) {
        return;
      }
      return imageData?.path;
    }
    return "";
  }

  async function handleSave() {
    if (!nameValue || !roastValue || !intensityValue) {
      validateTextInput({ value: nameValue, setFn: setNameError });
      return;
    }

    const imagePath = await onUploadImage(imageValue, props.userId);

    if (imagePath === undefined) return;

    const coffeeData: CoffeeData = {
      name: nameValue,
      roast: roastValue,
      intensity: intensityValue,
      flavours: flavoursValue,
      store_name: storeNameValue,
      store_url: storeUrlValue,
      purchase_date: purchaseDateValue,
      purchase_price: Number(priceValue?.replace(/,/g, ".")),
      purchase_currency: currencyValue,
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
      setPrice("");
      setCurrency("");
      setNotes("");

      props.onSaveFn();
      props.hideFn();
    }
  }

  function renderContent() {
    return (
      <View style={(containerStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text="Add Coffee" hideFn={() => props.hideFn()} />

        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                appStyles.textInput,
                nameErrorValue && appStyles.textInputError,
              ]}
              value={nameValue}
              onChangeText={(value) => {
                setName(value);
                validateTextInput({ value: value, setFn: setNameError });
              }}
              placeholder="Name"
            />

            <Dropdown
              value={roastValue}
              setFn={setRoast}
              items={coffeeRoasts}
              icon="magnifying-glass"
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
              icon="face-grin-tongue"
              placeholder="Select Flavour Profile"
            />

            <TextInput
              style={appStyles.textInput}
              value={storeNameValue}
              onChangeText={setStoreName}
              placeholder="Store Name"
            />

            <TextInput
              style={appStyles.textInput}
              value={storeUrlValue}
              onChangeText={setStoreUrl}
              placeholder="Store Link"
            />

            <View style={styles.rowContainer}>
              <Text>Purchase Date</Text>
              <DateTimePicker
                value={purchaseDateValue}
                onChange={(_, date) => {
                  if (date) setPurchaseDate(date);
                }}
              />
            </View>

            <View style={styles.rowContainer}>
              <Dropdown
                value={currencyValue}
                setFn={setCurrency}
                items={currencySymbols}
                icon="coins"
                placeholder="$"
                dropdownStyle={styles.dropdown}
              />

              <TextInput
                style={[appStyles.textInput, styles.textInput]}
                value={priceValue}
                onChangeText={setPrice}
                inputMode="decimal"
                keyboardType="decimal-pad"
                placeholder="Price"
              />
            </View>

            <ImagePicker value={imageValue} setFn={setImage} />

            <TextInput
              style={appStyles.areaInput}
              multiline
              numberOfLines={4}
              value={notesValue}
              onChangeText={setNotes}
              placeholder="Notes"
            />

            <TouchableOpacity style={appStyles.button} onPress={handleSave}>
              <Text style={appStyles.buttonText}>Save</Text>
              <FontAwesome name="floppy-disk" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.hideFn()}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {renderContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    flexGrow: 0,
    minWidth: 100,
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
  },
  textInput: {
    flex: 1,
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    textAlign: "right",
  },
});
