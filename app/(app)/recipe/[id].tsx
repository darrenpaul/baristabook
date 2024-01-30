import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import PageHeader from "@/components/headers/PageHeader";
import appStyles from "@/constants/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { fetchRecipe } from "@/api/recipe";
import { fetchCoffee } from "@/api/coffee";
import { CoffeeResponseData } from "@/types/coffee";

export default function Page() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [recipeValue, setRecipe] = useState({});
  const [coffee, setCoffee] = useState<CoffeeResponseData>();

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
  useEffect(() => {
    getCoffee();
  }, [recipeValue]);

  async function getRecipe() {
    if (!session?.user?.id) return;
    const { data, error, status } = await fetchRecipe(id, session?.user?.id);
    if (!error) {
      const newRecipe = data;
      setRecipe(newRecipe);
    }
  }

  async function getCoffee() {
    if (session?.user?.id && id) {
      const { data, error, status } = await fetchCoffee(
        recipeValue.coffee_id,
        session?.user?.id
      );
      if (!error) {
        const newCoffee = data as CoffeeResponseData;
        setCoffee(newCoffee);
      }
    }
  }

  function handleRefresh() {
    getRecipe();
  }

  function renderBrew() {
    return <View>{renderCoffee()}</View>;
  }

  function renderCoffee() {
    return (
      <View>
        <Text>
          {coffee?.name} was purchased from {coffee?.purchase_from} on
          {coffee?.purchase_date}. Its a {coffee?.roast} roast with an intensity
          of {coffee?.intensity}.
        </Text>
      </View>
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
          <PageHeader text="Recipe" />

          <ScrollView>
            <View
              style={{
                display: "flex",
                gap: 24,
                paddingHorizontal: 20,
                paddingBottom: 48,
              }}
            >
              {recipeValue ? renderBrew() : <Text>No Data</Text>}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
