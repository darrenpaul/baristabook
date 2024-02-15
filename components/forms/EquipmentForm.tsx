import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import DropdownActionButton from "@/components/dropdowns/DropdownActionButton";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Coffee } from "@/types/coffee";
import { waterHardnessLevels } from "@/constants/water-hardness-data";
import CreateCoffeeModal from "@/features/recipe/create/modals/CreateCoffeeModal";
import CreateGrinderModal from "@/features/recipe/create/modals/CreateGrinderModal";
import CreateBrewerModal from "@/features/recipe/create/modals/CreateBrewerModal";
import { Grinder } from "@/types/grinder";
import { Brewer } from "@/types/brewer";
import AccordionHeader from "@/components/accordion/AccordionHeader";
import { useModal } from "@/features/shared/services/modal-service";

const SECTIONS = [
  {
    title: "Equipment",
    content: "equipment",
  },
];

type ComponentProps = {
  userId: string;
  coffees: Coffee[];
  grinders: Grinder[];
  brewers: Brewer[];
  refreshFn: Function;
  equipment: any;
  setEquipmentFn: Function;
};

export default function Component(props: ComponentProps) {
  const { modalState: coffeeModalState, setModalState: setCoffeeModalState } =
    useModal();
  const { modalState: grinderModalState, setModalState: setGrinderModalState } =
    useModal();
  const { modalState: brewerModalState, setModalState: setBrewerModalState } =
    useModal();

  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);

  const [coffeeValue, setCoffeeValue] = useState<string>("");
  const [waterValue, setWaterValue] = useState<string>("");
  const [grinderValue, setGrinderValue] = useState<string>("");
  const [brewerValue, setBrewerValue] = useState<string>("");

  useEffect(() => {
    props.setEquipmentFn({
      ...props.equipment,
      coffee_id: coffeeValue,
      water_hardness: waterValue,
      grinder_id: grinderValue,
      brewer_id: brewerValue,
    });
  }, [coffeeValue, waterValue, grinderValue, brewerValue]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader title="Equipment" active={isActive} disabled={false} />
    );
  }

  function renderContent() {
    return (
      <View style={appStyles.accordionContent}>
        <DropdownActionButton
          value={coffeeValue}
          setFn={setCoffeeValue}
          items={props.coffees.map((coffee) => ({
            label: coffee.name,
            value: coffee.id,
          }))}
          icon="mug-hot"
          placeholder="Select Coffee"
          buttonFn={() => setCoffeeModalState(true)}
        />

        <Dropdown
          value={waterValue}
          setFn={setWaterValue}
          items={waterHardnessLevels}
          icon="droplet"
          placeholder="Select Water"
        />

        <DropdownActionButton
          value={grinderValue}
          setFn={setGrinderValue}
          items={props.grinders.map((grinder) => ({
            label: grinder.name,
            value: grinder.id,
          }))}
          icon="gears"
          placeholder="Select Grinder"
          buttonFn={() => setGrinderModalState(true)}
        />

        <DropdownActionButton
          value={brewerValue}
          setFn={setBrewerValue}
          items={props.brewers.map((brewer) => ({
            label: `${brewer.name} - ${brewer.method}`,
            value: brewer.id,
          }))}
          icon="flask"
          placeholder="Select Brewer"
          buttonFn={() => setBrewerModalState(true)}
        />

        <CreateCoffeeModal
          visible={coffeeModalState}
          hideFn={() => setCoffeeModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <CreateGrinderModal
          visible={grinderModalState}
          hideFn={() => setGrinderModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <CreateBrewerModal
          visible={brewerModalState}
          hideFn={() => setBrewerModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />
      </View>
    );
  }

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      underlayColor="transparent"
      onChange={(value) => setActiveSectionsValue(value)}
    />
  );
}
