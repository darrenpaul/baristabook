import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles, { containerStyles } from "@/constants/styles";
import ModalHeader from "@/components/headers/ModalHeader";
import { BrewerCreateData } from "@/types/brewer";
import { createBrewer } from "@/api/brewers";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import RecipeCoffeeForm from "@/components/forms/RecipeCoffeeEditForm";
import RecipeInstructionsEditForm from "@/components/forms/RecipeInstructionsEditForm";
import {
  RecipeInstructions,
  RecipeCoffee,
  RecipeCreate,
  Recipe,
} from "@/types/recipe";
import { updateRecipe } from "@/api/recipe";
import { CoffeeResponseData } from "@/types/coffee";

type ModalProps = {
  recipe: Recipe;
  visible: boolean;
  hideFn: Function;
  onSaveFn: Function;
};

const TITLE = "Edit Recipe";

export default function Component(props: ModalProps) {
  const [recipeNameValue, setRecipeName] = useState<string>();
  const [nameErrorValue, setNameError] = useState<boolean>(false);
  const [coffeeBrewMethod, setCoffeeBrewMethod] = useState<string>();
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>();
  const [coffeeValue, setCoffee] = useState<RecipeCoffee>();
  const [instructionsValue, setInstructions] = useState<RecipeInstructions>();

  useEffect(() => {
    if (props.recipe) {
      setCoffee({
        coffee_name: props.recipe.coffee_name,
        coffee_intensity: props.recipe.coffee_intensity,
        coffee_roast: props.recipe.coffee_roast,
        coffee_flavours: props.recipe.coffee_flavours,
        coffee_store: props.recipe.coffee_store,
        coffee_store_url: props.recipe.coffee_store_url,
        coffee_purchase_date: props.recipe.coffee_purchase_date,
        coffee_purchase_currency: props.recipe.coffee_purchase_currency,
        coffee_purchase_price: props.recipe.coffee_purchase_price,
        coffee_image: props.recipe.coffee_image,
        coffee_notes: props.recipe.coffee_notes,
      });

      setInstructions({
        name: props.recipe.name,
        pre_infusion_duration: props.recipe.pre_infusion_duration,
        duration: props.recipe.duration,
        weight: props.recipe.weight,
        temperature: props.recipe.temperature,
        pressure: props.recipe.pressure,
        flavours: props.recipe.flavours,
        rating: props.recipe.rating,
        notes: props.recipe.notes,
        image: props.recipe.image,
      });
    }
  }, [props.recipe]);

  async function handleSave() {
    if (!coffeeValue || !props.recipe) {
      return;
    }

    const newRecipe: Recipe = {
      ...props.recipe,
      ...coffeeValue,
      ...instructionsValue,
    };

    const { data, error, status } = await updateRecipe(
      props.recipe.id,
      newRecipe
    );

    // const { error } = await createBrewer(data);
    // if (!error) {
    //   setRecipeName("");
    //   setCoffeeBrewMethod("");
    //   setImage("");
    //   setNotes("");
    //   props.onSaveFn();
    //   props.hideFn();
    // }
  }

  function renderContent() {
    return (
      <View style={(containerStyles.pageContainer, { marginTop: 24 })}>
        <ModalHeader text={TITLE} hideFn={() => props.hideFn()} />

        <ScrollView>
          <View
            style={{
              display: "flex",
              gap: 12,
              paddingHorizontal: 20,
              paddingBottom: 48,
            }}
          >
            {coffeeValue && (
              <RecipeCoffeeForm coffee={coffeeValue} setFn={setCoffee} />
            )}

            {instructionsValue && (
              <RecipeInstructionsEditForm
                instructions={instructionsValue}
                setFn={setInstructions}
              />
            )}

            <TouchableOpacity style={appStyles.button} onPress={handleSave}>
              <Text style={appStyles.buttonText}>Save</Text>
              <FontAwesome name="floppy-disk" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.hideFn()}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {renderContent()}
    </Modal>
  );
}
