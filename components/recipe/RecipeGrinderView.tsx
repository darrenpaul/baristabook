import React, { useState } from "react";
import { View, Text } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import Accordion from "react-native-collapsible/Accordion";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import { Notes } from "@/components/icons";

const SECTIONS = [
  {
    title: "RecipeGrinderView",
    content: "recipeGrinderView",
  },
];

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader title="Grinder" active={isActive} disabled={false} />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <Text style={appStyles.headerText}>{props.recipe.grinder_name}</Text>

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.grinder_notes}
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
