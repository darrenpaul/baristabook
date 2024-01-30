import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase";
import PageHeader from "@/components/headers/PageHeader";
import EquipmentForm from "@/components/forms/EquipmentForm";
import GrindForm from "@/components/forms/GrindForm";
import RecipeForm from "@/components/forms/RecipeForm";
import appStyles from "@/constants/styles";
import { fetchCoffees } from "@/api/coffee";
import { Stack, useRouter } from "expo-router";
import { CoffeeResponseData } from "@/types/coffee";
import { fetchGrinders } from "@/api/grinder";
import { GrinderResponseData } from "@/types/grinder";
import { fetchBrewers } from "@/api/brewers";
import { BrewerResponseData } from "@/types/brewer";
import {
  RecipeCreateData,
  RecipeEquipment,
  RecipeGrind,
  Recipe,
} from "@/types/recipe";
import { createRecipe } from "@/api/recipe";
import { grindSizeMedium } from "@/constants/grind-size-data";

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
    title: "Recipe",
    content: "recipe",
  },
];

export default function Page() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [coffees, setCoffees] = useState<CoffeeResponseData[]>([]);
  const [grinders, setGrinders] = useState<GrinderResponseData[]>([]);
  const [brewers, setBrewers] = useState<BrewerResponseData[]>([]);
  const [equipment, setEquipment] = useState<RecipeEquipment>();
  const [grind, setGrind] = useState<RecipeGrind>({
    size: grindSizeMedium.value,
    duration: 30,
    weight: 30,
    notes: "",
  });
  const [recipeValue, setRecipe] = useState<Recipe>({
    pre_infusion_duration: 30,
    duration: 30,
    weight: 30,
    temperature: 30,
    pressure: 30,
    flavour: "",
    rating: 5,
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
    const { data, error, status } = await fetchCoffees(session.user.id);
    if (!error) {
      const coffees = data as CoffeeResponseData[];
      setCoffees(coffees);
    }
  }

  async function getGrinders() {
    if (!session?.user?.id) return;
    const { data, error, status } = await fetchGrinders(session.user.id);
    if (!error) {
      const grinders = data as GrinderResponseData[];
      setGrinders(grinders);
    }
  }

  async function getBrewers() {
    if (!session?.user?.id) return;
    const { data, error, status } = await fetchBrewers(session.user.id);
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

  async function handleSave() {
    if (!equipment || !grind || !recipeValue) return;

    const coffeeName = coffees.find((c) => c.id === equipment.coffee_id)?.name;
    const method = brewers.find((b) => b.id === equipment.brewer_id)?.method;

    const name = `${coffeeName} - ${method}`;

    const data: RecipeCreateData = {
      name: name,
      coffee_id: equipment.coffee_id,
      water_hardness: equipment.water_hardness,
      grinder_id: equipment.grinder_id,
      brewer_id: equipment.brewer_id,
      grind_size: grind.size,
      grind_duration: grind.duration,
      grind_weight: grind.weight,
      grind_notes: grind.notes,
      brew_pre_infusion_duration: recipeValue.pre_infusion_duration,
      brew_duration: recipeValue.duration,
      brew_weight: recipeValue.weight,
      brew_temperature: recipeValue.temperature,
      brew_pressure: recipeValue.pressure,
      brew_flavour: recipeValue.flavour,
      brew_rating: recipeValue.rating,
      brew_notes: recipeValue.notes,
      user_id: session?.user.id || "",
    };

    const { error } = await createRecipe(data);
    if (!error) {
      router.back();
    }
  }

  const brewer = brewers.find((item) => item.id === equipment?.brewer_id);

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
          <PageHeader text="Recipe Log" />

          <ScrollView>
            <View
              style={{
                display: "flex",
                gap: 24,
                paddingHorizontal: 20,
                paddingBottom: 48,
              }}
            >
              <EquipmentForm
                coffees={coffees}
                grinders={grinders}
                brewers={brewers}
                userId={session?.user.id || ""}
                refreshFn={handleRefresh}
                equipment={equipment}
                setEquipmentFn={setEquipment}
              />

              <GrindForm grind={grind} setGrindFn={setGrind} />

              {brewer && (
                <RecipeForm
                  recipe={recipeValue}
                  setRecipeFn={setRecipe}
                  brewer={brewer}
                />
              )}

              <TouchableOpacity style={appStyles.button} onPress={handleSave}>
                <Text style={appStyles.buttonText}>Save</Text>
                <FontAwesome name="floppy-disk" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
