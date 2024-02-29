import { updateUser } from "@/api/user";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import { Scale, Temperature } from "@/components/icons/index";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import temperatures from "@/constants/temperatures";
import weights from "@/constants/weights";
import { inputStyles } from "@/styles";
import appStyles from "@/styles/styles";
import { User } from "@/types/user";
import { validateTextInput } from "@/utils/input-validation";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

type Props = {
  user: User;
  disabled?: boolean;
};

export default function Component(props: Props) {
  const [loadingValue, setLoading] = useState<boolean>(false);
  const [nameValue, setName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [weightValue, setWeightValue] = useState<string>(props.user.weight);
  const [temperatureValue, setTemperatureValue] = useState<string>(
    props.user.temperature,
  );

  useEffect(() => {
    setName(props.user.name);
    setWeightValue(props.user.weight);
    setTemperatureValue(props.user.temperature);
  }, [props.user]);

  async function onUpdatePreferences() {
    if (!props.user) return;

    validateTextInput({ value: nameValue, setFn: setNameError });

    if (!nameValue || nameErrorValue) return;

    setLoading(true);

    const newData: User = {
      ...props.user,
      name: nameValue,
      weight: weightValue,
      temperature: temperatureValue,
    };

    await updateUser(props.user.id, newData);

    setLoading(false);
  }

  return (
    <AccordionWrapper title="Preferences" disabled={false}>
      <View style={appStyles.accordionContent}>
        <TextInput
          autoComplete="name"
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

        <Dropdown
          value={weightValue}
          setFn={setWeightValue}
          items={weights}
          icon={<Scale />}
          placeholder="Select Weight Measurement"
        />

        <Dropdown
          value={temperatureValue}
          setFn={setTemperatureValue}
          items={temperatures}
          icon={<Temperature />}
          placeholder="Select Temperature Measurement"
        />

        <ButtonWrapper
          loading={loadingValue}
          text="Update"
          icon="floppy-disk"
          onPressFn={onUpdatePreferences}
        />
      </View>
    </AccordionWrapper>
  );
}
