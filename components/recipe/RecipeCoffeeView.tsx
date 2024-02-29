import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { format } from "date-fns";
import { dateFormat } from "@/constants/date";
import { Recipe } from "@/types/recipe";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { formatCurrency } from "@/utils/currency";
import Toast from "react-native-toast-message";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import { buttonStyles, containerStyles } from "@/features/shared/styles";
import {
  Calendar,
  CoffeeRoast,
  CoffeeShop,
  Coins,
  Intensity,
  Notes,
  Taste,
} from "@/components/icons";
import Rating from "@/components/Rating";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
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

  return (
    <AccordionWrapper title="Coffee" disabled={false}>
      <View style={appStyles.accordionContent}>
        <ImageWrapper
          imageBucket={coffeeImagesBucket}
          imageUrl={props.recipe.coffee_image}
        />

        <View style={containerStyles.row}>
          <Text style={appStyles.headerText}>{props.recipe.coffee_name}</Text>

          <TouchableOpacity
            style={buttonStyles.buttonSquareSmall}
            onPress={onLinkPress}
          >
            <FontAwesome name="link" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <RecipeListItem
          icon={<CoffeeShop />}
          title="Store"
          body={props.recipe.coffee_store}
        />

        <RecipeListItem
          icon={<Calendar />}
          title="Purchase Date"
          body={format(props.recipe.coffee_purchase_date, dateFormat)}
        />

        <RecipeListItem
          icon={<Coins />}
          title="Price"
          body={formatCurrency(
            props.recipe.coffee_purchase_currency,
            props.recipe.coffee_purchase_price,
          )}
        />

        <RecipeListItem
          icon={<CoffeeRoast />}
          title="Roast"
          body={props.recipe.coffee_roast}
        />

        <RecipeListItem
          icon={<Intensity />}
          title="Intensity"
          body={`${props.recipe.coffee_intensity}/10`}
        />

        <RecipeListItem
          icon={<Taste />}
          title="Flavours"
          body={props.recipe.coffee_flavours.join(", ")}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />

        <Rating value={props.recipe.coffee_rating} />

        <RecipeListItem
          icon={<Notes />}
          title="Notes"
          body={props.recipe.coffee_notes}
          uppercaseBody={false}
          bodyUnderTitle={true}
        />
      </View>
    </AccordionWrapper>
  );
}
