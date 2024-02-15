import React, { useState } from "react";
import { View, Text } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import Accordion from "react-native-collapsible/Accordion";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import Image from "@/components/Image";
import AccordionHeader from "@/components/accordion/AccordionHeader";

const SECTIONS = [
  {
    title: "RecipeBrewerView",
    content: "recipeBrewerView",
  },
];

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader title="Brewer" active={isActive} disabled={false} />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <Image
          imageBucket={brewerImagesBucket}
          imageUrl={props.recipe.brewer_image}
        />

        <Text style={appStyles.headerText}>{props.recipe.brewer_name}</Text>

        <RecipeListItem
          icon="book"
          title="Method"
          body={props.recipe.brewer_method}
        />

        <RecipeListItem
          icon="book"
          title="Notes"
          body={props.recipe.brewer_notes}
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
