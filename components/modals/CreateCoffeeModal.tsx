import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { supabase } from "@/utils/supabase";
import appStyles from "@/constants/styles";
import { coffeeRoasts } from "@/constants/coffee-roasts";
import Dropdown from "@/components/dropdowns/Dropdown";
import Slider from "@/components/Slider";
import { coffeeTable } from "@/constants/database";
import { CoffeeData } from "@/types/coffee";
import ModalHeader from "@/components/headers/ModalHeader";

type ModalProps = {
  visible: boolean;
  hideFn: Function;
  userId: string;
  onSaveFn: Function;
};

export default function Component(props: ModalProps) {
  const [nameValue, setNameValue] = useState<string>("");
  const [purchaseFromValue, setPurchaseFromValue] = useState<string>("");
  const [purchaseDateValue, setPurchaseDateValue] = useState<Date>(new Date());
  const [purchasePriceValue, setPurchasePriceValue] = useState<string>("");
  const [roastValue, setRoastValue] = useState<string>("");
  const [intensityValue, setIntensityValue] = useState<number>(5);
  const [notesValue, setNotesValue] = useState<string>("");

  async function handleSave() {
    const data: CoffeeData = {
      name: nameValue,
      roast: roastValue,
      purchase_from: purchaseFromValue,
      purchase_date: purchaseDateValue,
      purchase_price: purchasePriceValue,
      intensity: intensityValue,
      notes: notesValue,
      user_id: props.userId,
    };
    const { error } = await supabase.from(coffeeTable).insert(data);
    if (!error) {
      setNameValue("");
      setRoastValue("");
      setPurchaseFromValue("");
      setPurchaseDateValue(new Date());
      setPurchasePriceValue("");
      setIntensityValue(5);
      setNotesValue("");

      props.onSaveFn();
      props.hideFn();
    }
  }

  function renderContent() {
    return (
      <View style={(appStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text="Add Coffee" hideFn={() => props.hideFn()} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View
              style={{
                display: "flex",
                gap: 12,
                paddingHorizontal: 20,
                paddingBottom: 48,
              }}
            >
              <TextInput
                style={appStyles.textInput}
                value={nameValue}
                onChangeText={setNameValue}
                placeholder="Name"
              />

              <Dropdown
                value={roastValue}
                setFn={setRoastValue}
                items={coffeeRoasts}
                icon="magnifying-glass"
                placeholder="Select Roast Type"
              />

              <TextInput
                style={appStyles.textInput}
                value={purchaseFromValue}
                onChangeText={setPurchaseFromValue}
                placeholder="Purchase From"
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Purchase Date</Text>
                <DateTimePicker
                  value={purchaseDateValue}
                  onChange={(_, date) => {
                    if (date) setPurchaseDateValue(date);
                  }}
                />
              </View>

              <TextInput
                style={appStyles.textInput}
                value={purchasePriceValue}
                onChangeText={setPurchasePriceValue}
                inputMode="decimal"
                keyboardType="decimal-pad"
                placeholder="Purchase Price"
              />

              <Slider
                title="Intensity"
                minValue={0}
                maxValue={10}
                measurement=""
                value={intensityValue}
                setFn={setIntensityValue}
              />

              <TouchableOpacity
                style={appStyles.buttonSecondary}
                onPress={() => {}}
              >
                <Text style={appStyles.buttonSecondaryText}>Image</Text>
                <FontAwesome name="upload" size={20} color="black" />
              </TouchableOpacity>

              <TextInput
                style={appStyles.areaInput}
                multiline
                numberOfLines={4}
                value={notesValue}
                onChangeText={setNotesValue}
                placeholder="Notes"
              />

              <TouchableOpacity style={appStyles.button} onPress={handleSave}>
                <Text style={appStyles.buttonText}>Save</Text>
                <FontAwesome name="floppy-disk" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
