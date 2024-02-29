import React from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { containerStyles, inputStyles } from "@/styles";

type Props = {
  value: Date;
  setFn: Function;
};

export default function Component(props: Props) {
  return (
    <View style={[inputStyles.textInput, containerStyles.row]}>
      <Text>Purchase Date</Text>

      <DateTimePicker
        value={props.value}
        onChange={(_, date) => {
          if (date) props.setFn(date);
        }}
      />
    </View>
  );
}
