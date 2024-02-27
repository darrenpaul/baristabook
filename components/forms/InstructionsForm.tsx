import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import appStyles from "@/features/shared/styles/styles";
import Slider from "@/components/Slider";
import { Brewer } from "@/types/brewer";
import { coffeeBrewMethods } from "@/constants/coffee-brew-methods";
import { BrewMethod } from "@/types/brew-method";
import { Instructions } from "@/types/instructions";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import { GrindSetting } from "@/types/grind-setting";
import grindSettings, { gramSettings } from "@/constants/grind-settings";
import { findObject } from "@/utils/array-helpers";
import { User } from "@/types/user";
import {
  temperatureConversion,
  weightConversion,
} from "@/utils/conversion-calculator";
import {
  celsiusSettings,
  temperatureSettings,
} from "@/constants/temperature-settings";
import { TemperatureSetting } from "@/types/temperature-setting";
import { celsius } from "@/constants/temperatures";
import { inputStyles } from "@/features/shared/styles/index";
import weights from "@/constants/weights";

const SECTIONS = [
  {
    title: "Instructions",
    content: "instructions",
  },
];

type ComponentProps = {
  instructions: Instructions;
  setFn: Function;
  brewer?: Brewer;
  user: User;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  const [activeSectionsValue, setActiveSections] = useState<number[]>([]);
  const [weightSettingsValue, setWeightSettings] =
    useState<GrindSetting>(gramSettings);
  const [temperatureSettingsValue, setTemperatureSettings] =
    useState<TemperatureSetting>(celsiusSettings);

  const [brewMethodValue, setBrewMethod] = useState<BrewMethod>();
  const [preInfusionValue, setPreInfusion] = useState<number>(30);
  const [extractionDurationValue, setExtractionDuration] = useState<number>(30);
  const [weightValue, setWeight] = useState<number>(30);
  const [temperatureValue, setTemperature] = useState<number>(96);
  const [pressureValue, setPressure] = useState<number>(30);
  const [notesValue, setNotes] = useState<string>("");

  useEffect(() => {
    /*
    Triggers when the user changes the brewer.
    This will find the brew config which matches that brewer.
    */
    if (!props.brewer) return;

    const brewerMethod = props.brewer.method;
    const brewMethod = coffeeBrewMethods.find(
      (item) => item.value === brewerMethod,
    );
    if (!brewMethod) return;

    setBrewMethod(brewMethod);

    if (typeof brewMethod.preInfusion === "number") {
      setPreInfusion(brewMethod.preInfusion);
    }
    if (typeof brewMethod.duration === "number") {
      setExtractionDuration(brewMethod.duration);
    }
    if (typeof brewMethod.weight === "number") {
      setWeight(brewMethod.weight);
    }
    if (typeof brewMethod.temperature === "number") {
      setTemperature(brewMethod.temperature);
    }
    if (typeof brewMethod.pressure === "number") {
      setPressure(brewMethod.pressure);
    }

    const matchedWeightSetting = findObject(
      weights,
      "value",
      props.user.weight,
    );

    const matchedTemperatureSetting = findObject(
      temperatureSettings,
      "value",
      props.user.temperature,
    );

    if (matchedWeightSetting) {
      setWeightSettings({
        label: matchedWeightSetting.label,
        value: matchedWeightSetting.value,
        display: matchedWeightSetting.display,
        weight: matchedWeightSetting.weight,
        weightMin: matchedWeightSetting.weightMin,
        weightMax: matchedWeightSetting.weightMax,
        step: matchedWeightSetting.step,
      });
      setWeight(
        weightConversion(
          celsius.value,
          matchedWeightSetting.value,
          weightValue,
        ),
      );
    }

    if (matchedTemperatureSetting) {
      setTemperatureSettings({
        label: matchedTemperatureSetting.label,
        value: matchedTemperatureSetting.value,
        display: matchedTemperatureSetting.display,
        temperature: matchedTemperatureSetting.weight,
        temperatureMin: matchedTemperatureSetting.weightMin,
        temperatureMax: matchedTemperatureSetting.weightMax,
        step: matchedTemperatureSetting.step,
      });

      setTemperature(
        temperatureConversion(
          celsius.value,
          matchedTemperatureSetting.value,
          temperatureValue,
        ),
      );
    }
  }, [props.brewer, props.user]);

  useEffect(() => {
    props.setFn({
      ...props.instructions,
      pre_infusion_duration: preInfusionValue,
      extraction_duration: extractionDurationValue,
      weight: weightValue,
      temperature: temperatureValue,
      pressure: pressureValue,
      notes: notesValue,
    });
  }, [
    preInfusionValue,
    extractionDurationValue,
    weightValue,
    temperatureValue,
    pressureValue,
    notesValue,
  ]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader
        title="Instructions"
        active={isActive}
        disabled={props.disabled}
      />
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
        setFn={setPreInfusion}
      />
    );
  }

  function renderDuration() {
    if (!brewMethodValue) return;
    return (
      <Slider
        key="extractionDuration"
        title="Extraction Duration"
        minValue={brewMethodValue.durationMin}
        maxValue={brewMethodValue.durationMax}
        measurement="s"
        value={extractionDurationValue}
        setFn={setExtractionDuration}
      />
    );
  }

  function renderWeight() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="weight"
        title="Weight"
        minValue={weightConversion(
          gramSettings.value,
          weightSettingsValue.value,
          brewMethodValue.weightMin,
        )}
        maxValue={weightConversion(
          gramSettings.value,
          weightSettingsValue.value,
          brewMethodValue.weightMax,
        )}
        measurement={weightSettingsValue.display}
        value={weightValue}
        setFn={setWeight}
      />
    );
  }

  function renderTemperature() {
    if (!brewMethodValue) return;

    return (
      <Slider
        key="temperature"
        title="Temperature"
        minValue={temperatureConversion(
          celsiusSettings.value,
          temperatureSettingsValue.value,
          brewMethodValue.temperatureMin,
        )}
        maxValue={temperatureConversion(
          celsiusSettings.value,
          temperatureSettingsValue.value,
          brewMethodValue.temperatureMax,
        )}
        measurement={temperatureSettingsValue.display}
        value={temperatureValue}
        setFn={setTemperature}
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
        setFn={setPressure}
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

        <TextInput
          style={inputStyles.areaInput}
          multiline
          value={notesValue}
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
      activeSections={activeSectionsValue}
      renderHeader={renderHeader}
      renderContent={renderContent}
      underlayColor="transparent"
      disabled={props.disabled}
      onChange={(value) => setActiveSections(value)}
    />
  );
}
