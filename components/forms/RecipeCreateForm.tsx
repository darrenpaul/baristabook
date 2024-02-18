import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import appStyles from "@/features/shared/styles/styles";
import ImagePicker from "@/features/shared/components/image/ImagePicker";
import RatingForm from "@/components/forms/RatingForm";
import { coffeeFlavours } from "@/constants/flavour-data";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown";
import { RecipeInformation } from "@/types/recipe";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import SwitchWrapper from "@/features/shared/components/wrappers/SwitchWrapper";
import { inputStyles } from "@/features/shared/styles/index";
import { Taste } from "@/components/icons";

const SECTIONS = [
  {
    title: "Instructions",
    content: "instructions",
  },
];

type ComponentProps = {
  recipe: RecipeInformation;
  setFn: Function;
  disabled?: boolean;
};

export default function Component(props: ComponentProps) {
  const [activeSectionsValue, setActiveSections] = useState<number[]>([]);
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

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader
        title="Recipe"
        active={isActive}
        disabled={props.disabled}
      />
    );
  }

  function renderContent() {
    return (
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
    );
  }

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSectionsValue}
      renderHeader={renderHeader}
      renderContent={renderContent}
      underlayColor="transparent"
      disabled={props.disabled}
      onChange={(value) => setActiveSections(value)}
    />
  );
}
