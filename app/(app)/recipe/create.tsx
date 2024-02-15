import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Toast from "react-native-toast-message";
import EquipmentForm from "@/components/forms/EquipmentForm";
import GrindForm from "@/components/forms/GrindForm";
import InstructionsForm from "@/components/forms/InstructionsForm";
import { useRouter } from "expo-router";
import {
  RecipeCreate,
  RecipeEquipment,
  RecipeGrind,
  RecipeCoffee,
  RecipeGrinder,
  RecipeBrewer,
  RecipeInstructions,
  RecipeInformation,
} from "@/types/recipe";
import { createRecipe } from "@/api/recipe";
import { grindSizeMedium } from "@/constants/grind-size-data";
import { handleImageUpload } from "@/utils/image-storage";
import {
  grindImagesBucket,
  recipeImagesBucket,
} from "@/constants/storage-buckets";
import { Instructions } from "@/types/instructions";
import RecipeCreateForm from "@/components/forms/RecipeCreateForm";
import { Grind } from "@/types/grind";
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";
import { fetchUser } from "@/api/user";
import { grams } from "@/constants/weights";
import { celsius } from "@/constants/temperatures";
import { buttonStyles, typographyStyles } from "@/features/shared/styles";
import { useAuthService } from "@/features/shared/services/auth-service";
import { useCoffeeService } from "@/features/shared/services/coffee-service";
import { useGrinderService } from "@/features/shared/services/grinder-service";
import { useBrewerService } from "@/features/shared/services/brewer-service";
import { useUserService } from "@/features/shared/services/user-service";

export default function Page() {
  const router = useRouter();
  const { session } = useAuthService();
  const { user } = useUserService(session);
  const { coffees } = useCoffeeService(session);
  const { grinders } = useGrinderService(session);
  const { brewers } = useBrewerService(session);

  const [equipmentValue, setEquipment] = useState<RecipeEquipment>();
  const [grindValue, setGrind] = useState<Grind>({
    size: grindSizeMedium.value,
    duration: 30,
    weight: 30,
    image: "",
    notes: "",
  });

  const [instructionsValue, setInstructions] = useState<Instructions>({
    pre_infusion_duration: 30,
    extraction_duration: 30,
    weight: 30,
    temperature: 30,
    pressure: 30,
    notes: "",
  });

  const [recipeValue, setRecipe] = useState<RecipeInformation>({
    name: "",
    flavours: [],
    rating: 5,
    image: "",
    weight_measurement: grams.value,
    temperature_measurement: celsius.value,
    is_public: false,
    notes: "",
  });

  function handleRefresh() {
    fetchUser().then(({ data }) => {
      setRecipe({
        ...recipeValue,
        weight_measurement: data.weight,
        temperature_measurement: data.temperature,
      });
    });
  }

  async function handleSave() {
    if (
      !session?.user.id ||
      !user ||
      !equipmentValue ||
      !grindValue ||
      !instructionsValue ||
      !recipeValue
    )
      return;

    // This will return if the image upload fails
    // If the user has not uploaded an image, this will return an empty string
    const recipeImagePath = await handleImageUpload({
      directory: recipeImagesBucket,
      imageUri: recipeValue.image,
      userId: session.user.id,
    });

    if (recipeImagePath === undefined) return;

    const grindImagePath = await handleImageUpload({
      directory: grindImagesBucket,
      imageUri: grindValue.image,
      userId: session.user.id,
    });

    if (grindImagePath === undefined) return;

    const matchedCoffee = coffees.find(
      (item) => item.id === equipmentValue.coffee_id
    );
    const matchedGrinder = grinders.find(
      (item) => item.id === equipmentValue.grinder_id
    );
    const matchedBrewer = brewers.find(
      (item) => item.id === equipmentValue.brewer_id
    );

    if (!matchedCoffee || !matchedGrinder || !matchedBrewer) return;

    const recipeCoffee: RecipeCoffee = {
      coffee_name: matchedCoffee.name,
      coffee_roast: matchedCoffee.roast,
      coffee_store: matchedCoffee.store_name,
      coffee_store_url: matchedCoffee.store_url,
      coffee_purchase_date: matchedCoffee.purchase_date,
      coffee_purchase_currency: matchedCoffee.purchase_currency,
      coffee_purchase_price: matchedCoffee.purchase_price,
      coffee_intensity: matchedCoffee.intensity,
      coffee_flavours: matchedCoffee.flavours,
      coffee_image: matchedCoffee.image,
      coffee_notes: matchedCoffee.notes,
    };

    const recipeGrinder: RecipeGrinder = {
      grinder_name: matchedGrinder.name,
      grinder_notes: matchedGrinder.notes,
    };

    const recipeBrewer: RecipeBrewer = {
      brewer_name: matchedBrewer.name,
      brewer_method: matchedBrewer.method,
      brewer_image: matchedBrewer.image,
      brewer_notes: matchedBrewer.notes,
    };

    const recipeGrind: RecipeGrind = {
      grind_size: grindValue.size,
      grind_duration: grindValue.duration,
      grind_weight: grindValue.weight,
      grind_image: grindImagePath,
      grind_notes: grindValue.notes,
    };

    const recipeInstructions: RecipeInstructions = {
      instruction_pre_infusion_duration:
        instructionsValue.pre_infusion_duration,
      instruction_extraction_duration: instructionsValue.extraction_duration,
      instruction_weight: instructionsValue.weight,
      instruction_temperature: instructionsValue.temperature,
      instruction_pressure: instructionsValue.pressure,
      instruction_notes: instructionsValue.notes,
    };

    const recipe: RecipeInformation = {
      name: recipeValue.name,
      flavours: recipeValue.flavours,
      rating: recipeValue.rating,
      is_public: recipeValue.is_public,
      weight_measurement: user.weight,
      temperature_measurement: user.temperature,
      image: recipeImagePath,
      notes: recipeValue.notes,
    };

    const data: RecipeCreate = {
      ...recipeCoffee,
      ...recipeGrinder,
      ...recipeBrewer,
      ...recipeGrind,
      ...recipeInstructions,
      ...recipe,
      water_hardness: equipmentValue.water_hardness,
      user_id: session?.user.id,
    };

    const { error } = await createRecipe(data);
    if (!error) {
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Recipe has been saved",
      });
      router.back();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Something went wrong",
      });
    }
  }

  function renderEquipmentForm() {
    if (!session) return <></>;

    return (
      <EquipmentForm
        coffees={coffees}
        grinders={grinders}
        brewers={brewers}
        userId={session?.user.id}
        refreshFn={handleRefresh}
        equipment={equipmentValue}
        setEquipmentFn={setEquipment}
      />
    );
  }

  function renderGrindForm() {
    const isDisabled =
      !equipmentValue?.coffee_id ||
      !equipmentValue?.water_hardness ||
      !equipmentValue?.grinder_id ||
      !equipmentValue?.brewer_id;

    if (!user) return <></>;

    return (
      <GrindForm
        grind={grindValue}
        setGrindFn={setGrind}
        weightMeasurement={user.weight}
        disabled={isDisabled}
      />
    );
  }

  function renderInstructionsForm() {
    if (!user) return <></>;
    const isDisabled =
      !equipmentValue?.coffee_id ||
      !equipmentValue?.water_hardness ||
      !equipmentValue?.grinder_id ||
      !equipmentValue?.brewer_id;

    const brewer = brewers.find(
      (item) => item.id === equipmentValue?.brewer_id
    );

    return (
      <InstructionsForm
        instructions={instructionsValue}
        setFn={setInstructions}
        brewer={brewer}
        user={user}
        disabled={isDisabled}
      />
    );
  }

  function renderRecipeForm() {
    const isDisabled =
      !equipmentValue?.coffee_id ||
      !equipmentValue?.water_hardness ||
      !equipmentValue?.grinder_id ||
      !equipmentValue?.brewer_id;

    return (
      <RecipeCreateForm
        recipe={recipeValue}
        setFn={setRecipe}
        disabled={isDisabled}
      />
    );
  }

  return (
    <PageWrapper title="Create Recipe">
      {renderEquipmentForm()}

      {renderGrindForm()}

      {renderInstructionsForm()}

      {renderRecipeForm()}

      <TouchableOpacity style={buttonStyles.button} onPress={handleSave}>
        <Text style={typographyStyles.buttonText}>Save</Text>
        <FontAwesome name="floppy-disk" size={20} color="white" />
      </TouchableOpacity>
    </PageWrapper>
  );
}
