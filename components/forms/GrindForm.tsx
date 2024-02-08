import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import appStyles from "@/constants/styles";
import Dropdown from "@/components/dropdowns/Dropdown";
import Slider from "@/components/Slider";
import { grindSizes } from "@/constants/grind-size-data";
import { Grind } from "@/types/grind";
import AccordionHeader from "@/components/accordion/AccordionHeader";

const SECTIONS = [
  {
    title: "Grind",
    content: "grind",
  },
];

type ComponentProps = {
  grind: Grind;
  setGrindFn: Function;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);
  const [grindSize, setGrindSize] = useState<string>(props.grind.size);
  const [durationValue, setDurationValue] = useState<number>(
    props.grind.duration
  );
  const [weightValue, setWeightValue] = useState<number>(props.grind.weight);
  const [notesValue, setNotes] = useState<string>("");

  useEffect(() => {
    props.setGrindFn({
      ...props.grind,
      size: grindSize,
      duration: durationValue,
      weight: weightValue,
      notes: notesValue,
    });
  }, [grindSize, durationValue, weightValue, notesValue]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader
        title="Grind"
        active={isActive}
        disabled={props.disabled}
      />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <Dropdown
          value={grindSize}
          setFn={setGrindSize}
          items={grindSizes}
          icon="magnifying-glass"
          placeholder="Select Grind Size"
        />

        <Slider
          title="Duration"
          minValue={0}
          maxValue={60}
          measurement="s"
          value={durationValue}
          setFn={setDurationValue}
        />

        <Slider
          title="Weight"
          minValue={0}
          maxValue={200}
          measurement="g"
          value={weightValue}
          setFn={setWeightValue}
        />

        <TextInput
          style={appStyles.areaInput}
          value={notesValue}
          multiline
          numberOfLines={4}
          onChangeText={setNotes}
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
      disabled={props.disabled}
      onChange={(value) => setActiveSectionsValue(value)}
    />
  );
}
