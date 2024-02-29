import { View, TextInput } from "react-native";
import DropdownWrapper from "@/components/dropdowns/DropdownWrapper";
import { currencyList } from "@/utils/currency";
import { containerStyles, inputStyles } from "@/styles";
import currencyPriceSelectorStyles from "./styles";
import { CurrencyPrice } from "./types";
import { Currency } from "@/components/icons";

type Props = {
  data: CurrencyPrice;
  setFn: Function;
};

export default function Component(props: Props) {
  const currencySymbols = currencyList();

  function onSet(key: string, value: string) {
    props.setFn({ ...props.data, [key]: value });
  }

  return (
    <View style={[containerStyles.row, { gap: 0 }]}>
      <DropdownWrapper
        value={props.data.currency}
        setFn={(value: string) => onSet("currency", value)}
        items={currencySymbols}
        icon={<Currency />}
        placeholder=""
        dropdownStyle={currencyPriceSelectorStyles.dropdown}
      />

      <TextInput
        style={[inputStyles.textInput, currencyPriceSelectorStyles.textInput]}
        value={props.data.price}
        onChangeText={(value: string) => onSet("price", value)}
        inputMode="decimal"
        keyboardType="decimal-pad"
        placeholder="Price"
      />
    </View>
  );
}
