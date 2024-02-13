import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import appStyles from "@/constants/styles";
import Dropdown from "@/components/dropdowns/Dropdown";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import weights from "@/constants/weights";
import temperatures from "@/constants/temperatures";
import { Preferences } from "@/types/user";

const SECTIONS = [
  {
    title: "Preferences",
    content: "preferences",
  },
];

type ComponentProps = {
  preferences: Preferences;
  setFn: Function;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);
  const [weightValue, setWeightValue] = useState<string>(
    props.preferences.weight
  );
  const [temperatureValue, setTemperatureValue] = useState<string>(
    props.preferences.temperature
  );

  useEffect(() => {
    setWeightValue(props.preferences.weight);
    setTemperatureValue(props.preferences.temperature);
  }, [props.preferences]);

  useEffect(() => {
    props.setFn({
      ...props.preferences,
      weight: weightValue,
      temperature: temperatureValue,
    });
  }, [weightValue, temperatureValue]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader
        title="Preferences"
        active={isActive}
        disabled={props.disabled}
      />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <Dropdown
          value={weightValue}
          setFn={setWeightValue}
          items={weights}
          icon="magnifying-glass"
          placeholder="Select Weight Measurement"
        />

        <Dropdown
          value={temperatureValue}
          setFn={setTemperatureValue}
          items={temperatures}
          icon="magnifying-glass"
          placeholder="Select Temperature Measurement"
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
      disabled={props.disabled}
      onChange={(value) => setActiveSectionsValue(value)}
    />
  );
}
