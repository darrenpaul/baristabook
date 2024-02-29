import { View, Text } from "react-native";
import BottomNavigation from "@/features/shared/components/navigation/BottomNavigation";
import RecipeCard from "@/features/index/components/RecipeCard";
import PageLoader from "@/components/loaders/PageLoader";
import Heading from "@/features/shared/components/typography/Heading";
import { useRecipeService } from "@/services/recipe-service";
import { useAuthService } from "@/services/auth-service";
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";

export default function App() {
  const { session } = useAuthService();
  const { publicRecipes, userRecipes } = useRecipeService(session);

  function renderPublicRecipes() {
    if (!publicRecipes) return <PageLoader />;

    if (publicRecipes.length === 0) {
      return <Text>No recipes found</Text>;
    }

    return publicRecipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
  }

  function renderUserRecipes() {
    if (!userRecipes) return <PageLoader />;

    if (userRecipes.length === 0) {
      return <Text>No recipes found</Text>;
    }

    return userRecipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
  }

  return (
    <View style={{ flex: 1 }}>
      <PageWrapper>
        <Heading title="Your Recipes" active={true} disabled={false} />
        {renderUserRecipes()}

        <Heading title="Recipes" active={true} disabled={false} />
        {renderPublicRecipes()}
      </PageWrapper>

      <BottomNavigation />
    </View>
  );
}
