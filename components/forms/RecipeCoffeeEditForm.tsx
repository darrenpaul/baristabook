import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Dropdown from "@/components/dropdowns/Dropdown";
import appStyles from "@/constants/styles";
import { RecipeCoffee } from "@/types/recipe";
import DateTimePicker from "@react-native-community/datetimepicker";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import Slider from "@/components/Slider";
import { currencyList } from "@/utils/currency";
import { validateTextInput } from "@/utils/input-validation";
import ImagePicker from "@/components/image/ImagePicker";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import Image from "@/components/Image";
import { coffeeImagesBucket } from "@/constants/storage-buckets";

const SECTIONS = [
  {
    title: "Equipment",
    content: "equipment",
  },
];

type ComponentProps = {
  coffee: RecipeCoffee;
  setFn: Function;
  // userId: string;
  // coffees: CoffeeResponseData[];
  // grinders: GrinderResponseData[];
  // brewers: BrewerResponseData[];
  // refreshFn: Function;
  // equipment: any;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [imageValue, setImage] = useState<string>();

  const currencySymbols = currencyList();

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Coffee</Text>

        <FontAwesome
          name={isActive ? "eye-slash" : "eye"}
          size={24}
          color="black"
        />
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <TextInput
          style={[
            appStyles.textInput,
            nameErrorValue && appStyles.textInputError,
          ]}
          value={props.coffee.coffee_name}
          onChangeText={(value) => {
            props.setFn({ ...props.coffee, coffee_name: value });
            validateTextInput({ value: value, setFn: setNameError });
          }}
          placeholder="Name"
        />

        <Dropdown
          value={props.coffee.coffee_roast}
          setFn={(value: string) => {
            props.setFn({ ...props.coffee, coffee_roast: value });
          }}
          items={coffeeRoasts}
          icon="magnifying-glass"
          placeholder="Select Roast Type"
        />

        <Slider
          title="Intensity"
          minValue={0}
          maxValue={10}
          measurement=""
          value={props.coffee.coffee_intensity}
          setFn={(value: number) => {
            props.setFn({ ...props.coffee, coffee_intensity: value });
          }}
          disableCustomInput={true}
        />

        <MultiSelectDropdown
          value={props.coffee.coffee_flavours}
          setFn={(value: string[]) => {
            props.setFn({ ...props.coffee, coffee_flavours: value });
          }}
          items={coffeeFlavours}
          icon="face-grin-tongue"
          placeholder="Select Flavour Profile"
        />

        <TextInput
          style={appStyles.textInput}
          value={props.coffee.coffee_store}
          onChangeText={(value) => {
            props.setFn({ ...props.coffee, coffee_store: value });
          }}
          placeholder="Store Name"
        />

        <TextInput
          style={appStyles.textInput}
          value={props.coffee.coffee_store_url}
          onChangeText={(value) => {
            props.setFn({ ...props.coffee, coffee_store_url: value });
          }}
          placeholder="Store Link"
        />

        <View style={styles.rowContainer}>
          <Text>Purchase Date</Text>
          <DateTimePicker
            value={new Date(props.coffee.coffee_purchase_date)}
            onChange={(_, date) => {
              if (date)
                props.setFn({ ...props.coffee, coffee_purchase_date: date });
            }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Dropdown
            value={props.coffee.coffee_purchase_currency}
            setFn={(value: string) => {
              props.setFn({ ...props.coffee, coffee_purchase_currency: value });
            }}
            items={currencySymbols}
            icon="coins"
            placeholder="$"
            dropdownStyle={styles.dropdown}
          />

          <TextInput
            style={[appStyles.textInput, styles.textInput]}
            value={props.coffee.coffee_purchase_price.toFixed(2)}
            onChangeText={(value) => {
              props.setFn({
                ...props.coffee,
                coffee_purchase_price: Number(value),
              });
            }}
            inputMode="decimal"
            keyboardType="decimal-pad"
            placeholder="Price"
          />
        </View>

        <Image
          imageBucket={coffeeImagesBucket}
          imageUrl={props.coffee.coffee_image}
        />

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={appStyles.areaInput}
          multiline
          numberOfLines={4}
          value={props.coffee.coffee_notes}
          onChangeText={(value) => {
            props.setFn({ ...props.coffee, coffee_notes: value });
          }}
          placeholder="Notes"
        />
      </View>
    );
  }

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      underlayColor="transparent"
      onChange={(value) => setActiveSectionsValue(value)}
    />
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
