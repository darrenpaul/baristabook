import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import appStyles from "@/styles/styles";
import ImagePicker from "@/components/image/ImagePicker";
import RatingForm from "@/components/forms/RatingForm";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import { RecipeInformation } from "@/types/recipe";
import SwitchWrapper from "@/components/wrappers/SwitchWrapper";
import { inputStyles } from "@/styles";
import { Taste } from "@/components/icons";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";

type Props = {
  recipe: RecipeInformation;
  setFn: Function;
  disabled?: boolean;
};

export default function Component(props: Props) {
  const [nameValue, setName] = useState<string>();
  const [flavoursValue, setFlavours] = useState<string[]>([]);
  const [ratingValue, setRating] = useState<number>(5);
  const [imageValue, setImage] = useState<string>();
  const [notesValue, setNotes] = useState<string>("");
  const [publicValue, setPublic] = useState<boolean>(false);

  useEffect(() => {
    props.setFn({
      ...props.recipe,
      name: nameValue,
      flavours: flavoursValue,
      rating: ratingValue,
      image: imageValue,
      is_public: publicValue,
      notes: notesValue,
    });
  }, [
    nameValue,
    flavoursValue,
    ratingValue,
    imageValue,
    publicValue,
    notesValue,
  ]);

  return (
    <AccordionWrapper title="Recipe" disabled={props.disabled}>
      <View style={appStyles.accordionContent}>
        <TextInput
          style={inputStyles.textInput}
          value={nameValue}
          onChangeText={setName}
          placeholder="Name"
        />

        <MultiSelectDropdown
          value={flavoursValue}
          setFn={setFlavours}
          items={coffeeFlavours}
          icon={<Taste />}
          placeholder="Select Flavour Profile"
        />

        <RatingForm value={ratingValue} setFn={setRating} />

        <ImagePicker value={imageValue} setFn={setImage} />

        <TextInput
          style={inputStyles.areaInput}
          value={notesValue}
          multiline
          numberOfLines={4}
          onChangeText={setNotes}
          placeholder="Notes"
        />

        <SwitchWrapper
          offText="Private"
          onText="Public"
          value={publicValue}
          setFn={setPublic}
        />
      </View>
    </AccordionWrapper>
  );
}
