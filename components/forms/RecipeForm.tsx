import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Accordion from "react-native-collapsible/Accordion";
import * as Haptics from "expo-haptics";

import appStyles from "@/constants/styles";
import Dropdown from "@/components/dropdowns/Dropdown";
import Slider from "@/components/Slider";
import RatingForm from "@/components/forms/RatingForm";
import { coffeeFlavours } from "@/constants/flavour-data";
import { Recipe } from "@/types/recipe";
import { BrewerResponseData } from "@/types/brewer";
import { coffeeBrewMethods } from "@/constants/coffee-brew-methods";
import { BrewMethod } from "@/types/brew-method";

const SECTIONS = [
  {
    title: "Recipe",
    content: "recipe",
  },
];

type ComponentProps = {
  recipe: Recipe;
  setRecipeFn: Function;
  brewer: BrewerResponseData;
};

export default function Component(props: ComponentProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);

  const [brewMethodValue, setBrewMethod] = useState<BrewMethod>();

  const [preInfusionValue, setPreInfusionValue] = useState<number>(30);
  const [durationValue, setDurationValue] = useState<number>(30);
  const [weightValue, setWeightValue] = useState<number>(30);
  const [temperatureValue, setTemperatureValue] = useState<number>(30);
  const [pressureValue, setPressureValue] = useState<number>(30);
  const [flavourValue, setFlavourValue] = useState<string>("");
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    /*
    Triggers when the user changes the brewer.
    This will find the brew config which matches that brewer.
    */
    const brewMethod = coffeeBrewMethods.find(
      (item) => item.value === props.brewer.method
    );
    if (!brewMethod) return;
    setBrewMethod(brewMethod);
    if (typeof brewMethod.preInfusion === "number")
      setPreInfusionValue(brewMethod.preInfusion);
    if (typeof brewMethod.duration === "number")
      setDurationValue(brewMethod.duration);
    if (typeof brewMethod.weight === "number")
      setWeightValue(brewMethod.weight);
    if (typeof brewMethod.temperature === "number")
      setTemperatureValue(brewMethod.temperature);
    if (typeof brewMethod.pressure === "number")
      setPressureValue(brewMethod.pressure);
  }, [props.brewer]);

  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      pre_infusion_duration: preInfusionValue,
    });
  }, [preInfusionValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      duration: durationValue,
    });
  }, [durationValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      weight: weightValue,
    });
  }, [weightValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      temperature: temperatureValue,
    });
  }, [temperatureValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      pressure: pressureValue,
    });
  }, [pressureValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      flavour: flavourValue,
    });
  }, [flavourValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      rating: ratingValue,
    });
  }, [ratingValue]);
  useEffect(() => {
    props.setRecipeFn({
      ...props.recipe,
      notes: notes,
    });
  }, [notes]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Recipe</Text>

        <FontAwesome
          name={isActive ? "eye-slash" : "eye"}
          size={24}
          color="black"
        />
      </View>
    );
  }

  function renderPreInfusion() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="pre-infusion"
        title="Pre-Infusion"
        minValue={brewMethodValue.preInfusionMin}
        maxValue={brewMethodValue.preInfusionMax}
        measurement="s"
        value={preInfusionValue}
        setFn={setPreInfusionValue}
      />
    );
  }

  function renderDuration() {
    if (!brewMethodValue) return;
    return (
      <Slider
        key="duration"
        title="Duration"
        minValue={brewMethodValue.durationMin}
        maxValue={brewMethodValue.durationMax}
        measurement="s"
        value={durationValue}
        setFn={setDurationValue}
      />
    );
  }

  function renderWeight() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="weight"
        title="Weight"
        minValue={brewMethodValue.weightMin}
        maxValue={brewMethodValue.weightMax}
        measurement="g"
        value={weightValue}
        setFn={setWeightValue}
      />
    );
  }

  function renderTemperature() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="temperature"
        title="Temperature"
        minValue={brewMethodValue.temperatureMin}
        maxValue={brewMethodValue.temperatureMax}
        measurement="°C"
        value={temperatureValue}
        setFn={setTemperatureValue}
      />
    );
  }

  function renderPressure() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="pressure"
        title="Pressure"
        minValue={brewMethodValue.pressureMin}
        maxValue={brewMethodValue.pressureMax}
        measurement="bar"
        value={pressureValue}
        setFn={setPressureValue}
      />
    );
  }

  function renderContent() {
    const componentsToRender = [];

    if (brewMethodValue && brewMethodValue.preInfusion) {
      componentsToRender.push(renderPreInfusion);
    }

    if (brewMethodValue && brewMethodValue.duration) {
      componentsToRender.push(renderDuration);
    }

    if (brewMethodValue && brewMethodValue.weight) {
      componentsToRender.push(renderWeight);
    }

    if (brewMethodValue && brewMethodValue.temperature) {
      componentsToRender.push(renderTemperature);
    }

    if (brewMethodValue && brewMethodValue.pressure) {
      componentsToRender.push(renderPressure);
    }

    return (
      <View style={appStyles.accordionContent}>
        {componentsToRender.map((renderFn) => renderFn())}

        <Dropdown
          value={flavourValue}
          setFn={setFlavourValue}
          items={coffeeFlavours}
          icon="face-grin-tongue"
          placeholder="Select Flavour Profile"
        />

        <RatingForm value={ratingValue} setFn={setRatingValue} />

        <TouchableOpacity
          style={appStyles.buttonSecondary}
          onPress={() => Haptics.selectionAsync()}
        >
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
