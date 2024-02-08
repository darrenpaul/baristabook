import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { format } from "date-fns";

import appStyles from "@/constants/styles";
import { Recipe } from "@/types/recipe";
import Rating from "@/components/Rating";
import { dateFormat } from "@/constants/date";
import { recipeViewRoute } from "@/constants/routes";

type HeaderProps = {
  recipe: Recipe;
};

export default function Component(props: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>{props.recipe.name}</Text>

        <Rating value={props.recipe.rating} />

        <Text style={styles.dateText}>
          {format(props.recipe.created_at, dateFormat)}
        </Text>
      </View>

      <TouchableOpacity
        style={appStyles.buttonSquare}
        onPress={() => router.push(recipeViewRoute.path(props.recipe.id))}
      >
        <FontAwesome name="angle-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  contentContainer: {
    flexDirection: "column",
    gap: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
});
