import React from "react";
import { View, Text } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { Recipe } from "@/types/recipe";
import { recipeImagesBucket } from "@/constants/storage-buckets";
import Rating from "@/components/Rating";
import Image from "@/components/Image";
import { format } from "date-fns";
import { dateFormat } from "@/constants/date";
import RecipeListItem from "@/components/recipe/RecipeListItem";
import { Taste } from "@/components/icons";

type Props = {
  recipe: Recipe;
};

export default function Component(props: Props) {
  return (
    <View style={appStyles.accordionContent}>
      <Image imageBucket={recipeImagesBucket} imageUrl={props.recipe.image} />

      <View style={appStyles.rowSpacedContainer}>
        <Text style={appStyles.headerText}>{props.recipe.name}</Text>

        <Text style={appStyles.textSecondary}>
          {format(props.recipe.updated_at, dateFormat)}
        </Text>
      </View>

      <Rating value={props.recipe.rating} />

      <RecipeListItem
        icon={<Taste />}
        title="Flavours"
        body={props.recipe.flavours.join(", ")}
        uppercaseBody={false}
        bodyUnderTitle={true}
      />
    </View>
  );
}
