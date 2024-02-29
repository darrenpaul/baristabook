import { useMemo, useState } from "react";
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
import { handleImageDuplicate, handleImageUpload } from "@/utils/image-storage";
import {
  brewerImagesBucket,
  coffeeImagesBucket,
  grindImagesBucket,
  recipeImagesBucket,
} from "@/constants/storage-buckets";
import RecipeCreateForm from "@/components/forms/RecipeCreateForm";
import PageWrapper from "@/features/shared/components/wrappers/PageWrapper";
import { fetchUser } from "@/api/user";
import {
  useAuthService,
  useCoffeeService,
  useGrinderService,
  useBrewerService,
  useUserService,
  useGrindStateService,
  useInstructionStateService,
  useRecipeInformationStateService,
} from "@/features/shared/services";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import PageLoader from "@/components/loaders/PageLoader";

export default function Page() {
  const router = useRouter();
  const { session } = useAuthService();
  const { user } = useUserService(session);
  const { coffees, refreshFn: refreshCoffees } = useCoffeeService(session);
  const { grinders, refreshFn: refreshGrinders } = useGrinderService(session);
  const { brewers, refreshFn: refreshBrewers } = useBrewerService(session);
  const { grindValue, setGrind } = useGrindStateService();
  const { instructionsValue, setInstructions } = useInstructionStateService();
  const { recipeValue, setRecipe } = useRecipeInformationStateService();
  const [equipmentValue, setEquipment] = useState<RecipeEquipment>();
  const [loadingValue, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return (
      !equipmentValue?.coffee_id ||
      !equipmentValue?.water_hardness ||
      !equipmentValue?.grinder_id ||
      !equipmentValue?.brewer_id
    );
  }, [equipmentValue]);

  function handleRefresh() {
    fetchUser().then(({ data }) => {
      refreshCoffees();
      refreshGrinders();
      refreshBrewers();
      setRecipe({
        ...recipeValue,
        weight_measurement: data.weight,
        temperature_measurement: data.temperature,
      });
    });
  }

  function matchEquipment() {
    const matchedCoffee = coffees.find(
      (item) => item.id === equipmentValue?.coffee_id,
    );
    const matchedGrinder = grinders.find(
      (item) => item.id === equipmentValue?.grinder_id,
    );
    const matchedBrewer = brewers.find(
      (item) => item.id === equipmentValue?.brewer_id,
    );

    const waterHardness = equipmentValue?.water_hardness || "";

    return { matchedCoffee, matchedGrinder, matchedBrewer, waterHardness };
  }

  async function onSave() {
    if (
      !session?.user.id ||
      !user ||
      !grindValue ||
      !instructionsValue ||
      !recipeValue
    ) {
      return;
    }

    setLoading(true);

    const { matchedCoffee, matchedGrinder, matchedBrewer, waterHardness } =
      matchEquipment();

    if (!matchedCoffee || !matchedGrinder || !matchedBrewer) {
      setLoading(false);
      return;
    }

    // This will return if the image upload fails
    // If the user has not uploaded an image, this will return an empty string
    const recipeImagePath = await handleImageUpload({
      directory: recipeImagesBucket,
      imageUri: recipeValue.image,
      userId: session.user.id,
    });

    const grindImagePath = await handleImageUpload({
      directory: grindImagesBucket,
      imageUri: grindValue.image,
      userId: session.user.id,
    });

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
      coffee_rating: matchedCoffee.rating,
      coffee_image: await handleImageDuplicate({
        directory: coffeeImagesBucket,
        subdirectory: "recipe",
        userId: session.user.id,
        imagePath: matchedCoffee.image,
      }),
      coffee_notes: matchedCoffee.notes,
    };

    const recipeGrinder: RecipeGrinder = {
      grinder_name: matchedGrinder.name,
      grinder_notes: matchedGrinder.notes,
    };

    const recipeBrewer: RecipeBrewer = {
      brewer_name: matchedBrewer.name,
      brewer_method: matchedBrewer.method,
      brewer_image: await handleImageDuplicate({
        directory: brewerImagesBucket,
        subdirectory: "recipe",
        userId: session.user.id,
        imagePath: matchedBrewer.image,
      }),
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
      water_hardness: waterHardness,
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

    setLoading(false);
  }

  function renderInstructionsForm() {
    if (!user) return null;

    const brewer = brewers.find(
      (item) => item.id === equipmentValue?.brewer_id,
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

  function renderPageContent() {
    if (!session || !user) {
      return <PageLoader />;
    }

    return (
      <>
        <EquipmentForm
          coffees={coffees}
          grinders={grinders}
          brewers={brewers}
          userId={session?.user.id}
          refreshFn={handleRefresh}
          equipment={equipmentValue}
          setEquipmentFn={setEquipment}
        />

        <GrindForm
          grind={grindValue}
          setGrindFn={setGrind}
          weightMeasurement={user.weight}
          disabled={isDisabled}
        />

        {renderInstructionsForm()}

        <RecipeCreateForm
          recipe={recipeValue}
          setFn={setRecipe}
          disabled={isDisabled}
        />

        <ButtonWrapper
          text="Save"
          icon="floppy-disk"
          onPressFn={onSave}
          loading={loadingValue}
        />
      </>
    );
  }

  return <PageWrapper title="Create Recipe">{renderPageContent()}</PageWrapper>;
}
