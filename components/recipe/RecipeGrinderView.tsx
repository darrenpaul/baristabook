import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import appStyles from "@/constants/styles";
import Accordion from "react-native-collapsible/Accordion";
import { handleImageDownload } from "@/utils/imageStorage";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import Image from "@/components/Image";

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
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Grinder</Text>

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
        {/* <Image
          imageBucket={coffeeImagesBucket}
          imageUrl={props.recipe.brewer_image}
        /> */}

        <Text style={appStyles.headerText}>{props.recipe.grinder_name}</Text>

        <RecipeListItem
          icon="book"
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
