import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import weights from "@/constants/weights";
import temperatures from "@/constants/temperatures";
import { User } from "@/types/user";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import { inputStyles } from "@/features/shared/styles";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { validateTextInput } from "@/utils/input-validation";
import { updateUser } from "@/api/user";
import { Scale, Temperature } from "@/components/icons/index";

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
