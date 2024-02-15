import React, { useEffect, useState } from "react";
import { View } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import Accordion from "react-native-collapsible/Accordion";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { findObject } from "@/utils/array-helpers";
import weights from "@/constants/weights";
import temperatures from "@/constants/temperatures";
import { Preferences } from "@/types/user";
import {
  temperatureConversionWithSymbol,
  weightConversionWithSymbol,
} from "@/utils/conversion-calculator";
import AccordionHeader from "@/components/accordion/AccordionHeader";

const SECTIONS = [
  {
    title: "RecipeInstructionsView",
    content: "recipeInstructionsView",
  },
];

type Props = {
  recipe: Recipe;
  preferences: Preferences;
};

export default function Component(props: Props) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);

  useEffect(() => {
    if (props.recipe) {
      const matchedWeightMeasurement = findObject(
        weights,
        "value",
        props.recipe.weight_measurement
      );
      const matchedTemperatureMeasurement = findObject(
        temperatures,
        "value",
        props.recipe.temperature_measurement
      );

      if (!matchedWeightMeasurement || !matchedTemperatureMeasurement) return;
    }
  }, [props.recipe]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader
        title="Instructions"
        active={isActive}
        disabled={false}
      />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <RecipeListItem
          icon="book"
          title="Temperature"
          body={temperatureConversionWithSymbol(
            props.recipe.temperature_measurement,
            props.preferences.temperature,
            props.recipe.instruction_temperature
          )}
        />

        <RecipeListItem
          icon="book"
          title="Pressure"
          body={`${props.recipe.instruction_pressure} Bar`}
        />

        <RecipeListItem
          icon="book"
          title="Pre-Infusion"
          body={`${props.recipe.instruction_pre_infusion_duration} Seconds`}
        />

        <RecipeListItem
          icon="book"
          title="Extraction"
          body={`${props.recipe.instruction_extraction_duration} Seconds`}
        />

        <RecipeListItem
          icon="book"
          title="Weight"
          uppercaseBody={false}
          body={weightConversionWithSymbol(
            props.recipe.weight_measurement,
            props.preferences.weight,
            props.recipe.instruction_weight
          )}
        />

        <RecipeListItem
          icon="book"
          title="Notes"
          body={props.recipe.instruction_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
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
