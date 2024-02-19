import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { cardStyles } from "@/features/index/styles/recipe-card";
import { Recipe } from "@/types/recipe";
import Rating from "@/components/Rating";
import { dateFormat } from "@/constants/date";
import { recipeViewRoute } from "@/constants/routes";
import ImageWrapper from "@/features/shared/components/wrappers/ImageWrapper";
import { recipeImagesBucket } from "@/constants/storage-buckets";

type HeaderProps = {
  recipe: Recipe;
};

export default function Component(props: HeaderProps) {
  const router = useRouter();

  return (
    <View style={cardStyles.card}>
      <ImageWrapper
        imageBucket={recipeImagesBucket}
        imageUrl={props.recipe.image}
      />

      <View style={cardStyles.body}>
        <View style={cardStyles.content}>
          <Text style={cardStyles.heading}>{props.recipe.name}</Text>

          <Rating value={props.recipe.rating} />

          <Text style={cardStyles.date}>
            {format(props.recipe.created_at, dateFormat)}
          </Text>
        </View>
      </View>

      <View style={cardStyles.actions}>
        <TouchableOpacity
          style={cardStyles.button}
          onPress={() => router.push(recipeViewRoute.path(props.recipe.id))}
        >
          <Text style={cardStyles.buttonText}>View</Text>
          <FontAwesome name="angle-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
