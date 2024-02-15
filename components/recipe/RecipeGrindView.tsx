import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import appStyles from "@/features/shared/styles/styles";
import Accordion from "react-native-collapsible/Accordion";
import { grindImagesBucket } from "@/constants/storage-buckets";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { format } from "date-fns";
import { dateFormat } from "@/constants/date";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { formatCurrency } from "@/utils/currency";
import Toast from "react-native-toast-message";
import Image from "@/components/Image";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import { buttonStyles } from "@/features/shared/styles";
import { weightConversionWithSymbol } from "@/utils/conversion-calculator";
import { Preferences } from "@/types/user";

const SECTIONS = [
  {
    title: "RecipeCoffeeView",
    content: "recipeCoffeeView",
  },
];

type RecipeCoffeeViewProps = {
  recipe: Recipe;
  preferences: Preferences;
};

export default function Component(props: RecipeCoffeeViewProps) {
  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);

  async function onLinkPress() {
    const supported = await Linking.canOpenURL(props.recipe.coffee_store_url);

    if (supported) {
      await Linking.openURL(props.recipe.coffee_store_url);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "This link is not supported",
      });
    }
  }

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return <AccordionHeader title="Grind" active={isActive} disabled={false} />;
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <Image
          imageBucket={grindImagesBucket}
          imageUrl={props.recipe.grind_image}
        />

        <RecipeListItem
          icon="link"
          title="Size"
          body={props.recipe.grind_size}
        />

        <RecipeListItem
          icon="calendar"
          title="Grind Time"
          uppercaseBody={false}
          body={`${props.recipe.grind_duration}s`}
        />

        <RecipeListItem
          icon="book"
          title="Weight"
          uppercaseBody={false}
          body={weightConversionWithSymbol(
            props.recipe.weight_measurement,
            props.preferences.weight,
            props.recipe.grind_weight
          )}
        />

        <RecipeListItem
          icon="book"
          title="Notes"
          body={props.recipe.grind_notes}
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

const styles = StyleSheet.create({
  rowSpacedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
