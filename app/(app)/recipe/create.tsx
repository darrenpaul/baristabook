import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Session } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { supabase } from "@/utils/supabase";
import PageHeader from "@/components/headers/PageHeader";
import EquipmentForm from "@/components/forms/EquipmentForm";
import GrindForm from "@/components/forms/GrindForm";
import InstructionsForm from "@/components/forms/InstructionsForm";
import appStyles from "@/constants/styles";
import { fetchCoffees } from "@/api/coffee";
import { Stack, useRouter } from "expo-router";
import { Coffee } from "@/types/coffee";
import { fetchGrinders } from "@/api/grinder";
import { GrinderResponseData } from "@/types/grinder";
import { fetchBrewers } from "@/api/brewers";
import { BrewerResponseData } from "@/types/brewer";
import {
  RecipeCreate,
  RecipeEquipment,
  RecipeGrind,
  RecipeCoffee,
  RecipeGrinder,
  RecipeBrewer,
  Recipe,
  RecipeInstructions,
  RecipeInformation,
} from "@/types/recipe";
import { createRecipe } from "@/api/recipe";
import { grindSizeMedium } from "@/constants/grind-size-data";
import { handleImageUpload } from "@/utils/imageStorage";
import { recipeImagesBucket } from "@/constants/storage-buckets";
import { Instructions } from "@/types/instructions";
import RecipeCreateForm from "@/components/forms/RecipeCreateForm";
import { Grind } from "@/types/grind";

const expandableSections = [
  {
    title: "Equipment",
    content: "equipment",
  },
  {
    title: "Grind",
    content: "grind",
  },
  {
    title: "Instructions",
    content: "instructions",
  },
  {
    title: "Recipe",
    content: "recipe",
  },
];

export default function Page() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [coffeesValue, setCoffees] = useState<Coffee[]>([]);
  const [grindersValue, setGrinders] = useState<GrinderResponseData[]>([]);
  const [brewersValue, setBrewers] = useState<BrewerResponseData[]>([]);
  const [equipmentValue, setEquipment] = useState<RecipeEquipment>();
  const [grindValue, setGrind] = useState<Grind>({
    size: grindSizeMedium.value,
    duration: 30,
    weight: 30,
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
    notes: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) handleRefresh();
  }, [session]);

  async function getCoffees() {
    if (!session?.user?.id) return;
    const { data, error } = await fetchCoffees(session.user.id);
    if (!error) {
      const coffees = data as Coffee[];
      setCoffees(coffees);
    }
  }

  async function getGrinders() {
    if (!session?.user?.id) return;
    const { data, error } = await fetchGrinders(session.user.id);
    if (!error) {
      const grinders = data as GrinderResponseData[];
      setGrinders(grinders);
    }
  }

  async function getBrewers() {
    if (!session?.user?.id) return;
    const { data, error } = await fetchBrewers(session.user.id);
    if (!error) {
      const brewers = data as BrewerResponseData[];
      setBrewers(brewers);
    }
  }

  function handleRefresh() {
    getCoffees();
    getGrinders();
    getBrewers();
  }

  async function onUploadImage(
    imageUri: string,
    userId: string
  ): Promise<string | undefined> {
    if (imageUri) {
      const { data: imageData, error: imageError } = await handleImageUpload({
        directory: recipeImagesBucket,
        imageUri: imageUri,
        userId: userId,
      });

      if (imageError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: imageError.message,
        });
        return;
      }

      return imageData?.path;
    }

    return "";
  }

  async function handleSave() {
    if (
      !session?.user.id ||
      !equipmentValue ||
      !grindValue ||
      !instructionsValue ||
      !recipeValue
    )
      return;

    // This will return if the image upload fails
    // If the user has not uploaded an image, this will return an empty string
    const recipeImagePath = await onUploadImage(
      recipeValue.image,
      session.user.id
    );
    if (recipeImagePath === undefined) return;

    const matchedCoffee = coffeesValue.find(
      (item) => item.id === equipmentValue.coffee_id
    );
    const matchedGrinder = grindersValue.find(
      (item) => item.id === equipmentValue.grinder_id
    );
    const matchedBrewer = brewersValue.find(
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
    return (
      <EquipmentForm
        coffees={coffeesValue}
        grinders={grindersValue}
        brewers={brewersValue}
        userId={session?.user.id || ""}
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

    return (
      <GrindForm
        grind={grindValue}
        setGrindFn={setGrind}
        disabled={isDisabled}
      />
    );
  }

  function renderInstructionsForm() {
    const isDisabled =
      !equipmentValue?.coffee_id ||
      !equipmentValue?.water_hardness ||
      !equipmentValue?.grinder_id ||
      !equipmentValue?.brewer_id;

    const brewer = brewersValue.find(
      (item) => item.id === equipmentValue?.brewer_id
    );

    return (
      <InstructionsForm
        instructions={instructionsValue}
        setFn={setInstructions}
        brewer={brewer}
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
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          paddingTop: insets.top,
        }}
      >
        <View style={appStyles.pageContainer}>
          <PageHeader text="Create Recipe" />

          <ScrollView>
            <View
              style={{
                display: "flex",
                gap: 24,
                paddingHorizontal: 20,
                paddingBottom: 48,
              }}
            >
              {renderEquipmentForm()}

              {renderGrindForm()}

              {renderInstructionsForm()}

              {renderRecipeForm()}

              <TouchableOpacity style={appStyles.button} onPress={handleSave}>
                <Text style={appStyles.buttonText}>Save</Text>
                <FontAwesome name="floppy-disk" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Toast />
    </SafeAreaProvider>
  );
}
