import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles from "@/features/shared/styles/styles";
import containerStyles from "@/features/shared/styles/containers";
import ModalHeader from "@/features/shared/components/headers/ModalHeader";
import { BrewerCreateData } from "@/types/brewer";
import { createBrewer } from "@/api/brewers";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { handleImageUpload } from "@/utils/image-storage";
import { validateTextInput } from "@/utils/input-validation";
import {
  RecipeInstructions,
  RecipeCoffee,
  RecipeCreate,
  Recipe,
} from "@/types/recipe";
import { updateRecipe } from "@/api/recipe";
import { Coffee } from "@/types/coffee";
import { Instructions } from "@/types/instructions";
import InstructionsForm from "@/components/forms/InstructionsForm";
import { User } from "@/types/user";

type ModalProps = {
  recipe: Recipe;
  visible: boolean;
  user: User;
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
  const [instructionsValue, setInstructions] = useState<Instructions>();

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
        pre_infusion_duration: props.recipe.instruction_pre_infusion_duration,
        extraction_duration: props.recipe.instruction_extraction_duration,
        weight: props.recipe.instruction_weight,
        temperature: props.recipe.instruction_temperature,
        pressure: props.recipe.instruction_temperature,
        notes: props.recipe.instruction_notes,
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
      newRecipe,
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
      <View style={(containerStyles.page, { marginTop: 24 })}>
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
            {instructionsValue && (
              <InstructionsForm
                instructions={instructionsValue}
                setFn={setInstructions}
                brewer={props.recipe.brewer_name}
                user={props.user}
                disabled={false}
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
