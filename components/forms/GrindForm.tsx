import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import appStyles from "@/features/shared/styles/styles";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import Slider from "@/components/Slider";
import { grindSizes } from "@/constants/grind-size-data";
import { Grind } from "@/types/grind";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import grindSettings, { gramSettings } from "@/constants/grind-settings";
import { GrindSetting } from "@/types/grind-setting";
import { findObject } from "@/utils/array-helpers";
import { inputStyles } from "@/features/shared/styles/index";
import ImagePicker from "@/features/shared/components/image/ImagePicker";

const SECTIONS = [
  {
    title: "Grind",
    content: "grind",
  },
];

type ComponentProps = {
  grind: Grind;
  setGrindFn: Function;
  weightMeasurement: string;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);
  const [settingsValue, setSettings] = useState<GrindSetting>(gramSettings);

  const [grindSize, setGrindSize] = useState<string>(props.grind.size);
  const [durationValue, setDurationValue] = useState<number>(
    props.grind.duration
  );
  const [weightValue, setWeightValue] = useState<number>(props.grind.weight);
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>("");

  useEffect(() => {
    // Watch prop changes and update state
    const matchedSettings = findObject(
      grindSettings,
      "value",
      props.weightMeasurement
    );

    if (matchedSettings) {
      setSettings({
        label: matchedSettings.label,
        value: matchedSettings.value,
        display: matchedSettings.display,
        weight: matchedSettings.weight,
        weightMin: matchedSettings.weightMin,
        weightMax: matchedSettings.weightMax,
        step: matchedSettings.step,
      });

      setWeightValue(matchedSettings.weight);
    }
  }, [props.weightMeasurement]);

  useEffect(() => {
    // Update parent state
    props.setGrindFn({
      ...props.grind,
      size: grindSize,
      duration: durationValue,
      weight: weightValue,
      image: imageValue,
      notes: notesValue,
    });
  }, [grindSize, durationValue, weightValue, imageValue, notesValue]);

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
          minValue={settingsValue.weightMin}
          maxValue={settingsValue.weightMax}
          measurement={settingsValue.display}
          value={weightValue}
          setFn={(value: number) => setWeightValue(Number(value.toFixed(2)))}
          step={settingsValue.step}
        />

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
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
