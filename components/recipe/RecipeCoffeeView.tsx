import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import appStyles from "@/constants/styles";
import Accordion from "react-native-collapsible/Accordion";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { format } from "date-fns";
import { dateFormat } from "@/constants/date";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { formatCurrency } from "@/utils/currency";
import Toast from "react-native-toast-message";
import Image from "@/components/Image";

const SECTIONS = [
  {
    title: "RecipeCoffeeView",
    content: "recipeCoffeeView",
  },
];

type RecipeCoffeeViewProps = {
  recipe: Recipe;
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
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Coffee</Text>

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
        <Image
          imageBucket={coffeeImagesBucket}
          imageUrl={props.recipe.coffee_image}
        />

        <View style={styles.rowSpacedContainer}>
          <Text style={appStyles.headerText}>{props.recipe.coffee_name}</Text>

          <TouchableOpacity
            style={appStyles.buttonSquareSmall}
            onPress={onLinkPress}
          >
            <FontAwesome name="link" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <RecipeListItem
          icon="link"
          title="Store"
          body={props.recipe.coffee_store}
        />

        <RecipeListItem
          icon="calendar"
          title="Purchase Date"
          body={format(props.recipe.coffee_purchase_date, dateFormat)}
        />

        <RecipeListItem
          icon="coins"
          title="Price"
          body={formatCurrency(
            props.recipe.coffee_purchase_currency,
            props.recipe.coffee_purchase_price
          )}
        />

        <RecipeListItem
          icon="fire"
          title="Roast"
          body={props.recipe.coffee_roast}
        />

        <RecipeListItem
          icon="fire"
          title="Intensity"
          body={`${props.recipe.coffee_intensity}/10`}
        />

        <RecipeListItem
          icon="face-grin-tongue"
          title="Flavours"
          body={props.recipe.coffee_flavours.join(", ")}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />

        <RecipeListItem
          icon="book"
          title="Notes"
          body={props.recipe.coffee_notes}
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
