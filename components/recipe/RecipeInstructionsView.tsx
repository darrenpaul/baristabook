import React, { useState } from "react";
import { View, Text } from "react-native";
import appStyles from "@/constants/styles";
import Accordion from "react-native-collapsible/Accordion";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";

const SECTIONS = [
  {
    title: "RecipeInstructionsView",
    content: "recipeInstructionsView",
  },
];

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Instructions</Text>

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
        <RecipeListItem
          icon="book"
          title="Temperature"
          body={`${props.recipe.instruction_temperature}°C`}
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
          body={`${props.recipe.instruction_weight}g`}
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
