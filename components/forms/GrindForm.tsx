import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

import appStyles from "@/constants/styles";
import Dropdown from "@/components/dropdowns/Dropdown";
import Slider from "@/components/Slider";
import { grindSizes } from "@/constants/grind-size-data";
import { RecipeGrind } from "@/types/recipe";

const SECTIONS = [
  {
    title: "Grind",
    content: "grind",
  },
];

type ComponentProps = {
  grind: RecipeGrind;
  setGrindFn: Function;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);
  const [grindSize, setGrindSize] = useState<string>(props.grind.size);
  const [durationValue, setDurationValue] = useState<number>(
    props.grind.duration
  );
  const [weightValue, setWeightValue] = useState<number>(props.grind.weight);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    props.setGrindFn({
      ...props.grind,
      size: grindSize,
    });
  }, [grindSize]);
  useEffect(() => {
    props.setGrindFn({
      ...props.grind,
      duration: durationValue,
    });
  }, [durationValue]);
  useEffect(() => {
    props.setGrindFn({
      ...props.grind,
      weight: weightValue,
    });
  }, [weightValue]);
  useEffect(() => {
    props.setGrindFn({
      ...props.grind,
      notes: notes,
    });
  }, [notes]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Grind</Text>

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

        <TouchableOpacity style={appStyles.buttonSecondary} onPress={() => {}}>
          <Text style={appStyles.buttonSecondaryText}>Image</Text>
          <FontAwesome name="upload" size={20} color="black" />
        </TouchableOpacity>

        <TextInput
          style={appStyles.areaInput}
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
      onChange={(value) => setActiveSectionsValue(value)}
    />
  );
}
