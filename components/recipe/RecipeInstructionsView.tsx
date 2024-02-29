import React, { useEffect, useState } from "react";
import { View } from "react-native";
import appStyles from "@/styles/styles";
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
import {
  Notes,
  Scale,
  Timer,
  Temperature,
  PressureGauge,
} from "@/components/icons";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";

type Props = {
  recipe: Recipe;
  preferences: Preferences;
};

export default function Component(props: Props) {
  useEffect(() => {
    if (props.recipe) {
      const matchedWeightMeasurement = findObject(
        weights,
        "value",
        props.recipe.weight_measurement,
      );
      const matchedTemperatureMeasurement = findObject(
        temperatures,
        "value",
        props.recipe.temperature_measurement,
      );

      if (!matchedWeightMeasurement || !matchedTemperatureMeasurement) return;
    }
  }, [props.recipe]);

  return (
    <AccordionWrapper title="Instructions" disabled={false}>
      <View style={appStyles.accordionContent}>
        <RecipeListItem
          icon={<Temperature />}
          title="Temperature"
          body={temperatureConversionWithSymbol(
            props.recipe.temperature_measurement,
            props.preferences.temperature,
            props.recipe.instruction_temperature,
          )}
        />

        {props.recipe.instruction_pressure && (
          <RecipeListItem
            icon={<PressureGauge />}
            title="Pressure"
            body={`${props.recipe.instruction_pressure} Bar`}
          />
        )}

        {props.recipe.instruction_pre_infusion_duration && (
          <RecipeListItem
            icon={<Timer />}
            title="Pre-Infusion"
            body={`${props.recipe.instruction_pre_infusion_duration} Seconds`}
          />
        )}

        <RecipeListItem
          icon={<Timer />}
          title="Extraction"
          body={`${props.recipe.instruction_extraction_duration} Seconds`}
        />

        <RecipeListItem
          icon={<Scale />}
          title="Weight"
          uppercaseBody={false}
          body={weightConversionWithSymbol(
            props.recipe.weight_measurement,
            props.preferences.weight,
            props.recipe.instruction_weight,
          )}
        />

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.instruction_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />
      </View>
    </AccordionWrapper>
  );
}
