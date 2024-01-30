import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

import DropdownActionButton from "@/components/dropdowns/DropdownActionButton";
import Dropdown from "@/components/dropdowns/Dropdown";
import appStyles from "@/constants/styles";
import { CoffeeResponseData } from "@/types/coffee";
import { waterHardnessLevels } from "@/constants/water-hardness-data";
import CreateCoffeeModal from "@/components/modals/CreateCoffeeModal";
import CreateGrinderModal from "@/components/modals/CreateGrinderModal";
import CreateBrewerModal from "@/components/modals/CreateBrewerModal";
import { GrinderResponseData } from "@/types/grinder";
import { BrewerResponseData } from "@/types/brewer";

const SECTIONS = [
  {
    title: "Equipment",
    content: "equipment",
  },
];

type ComponentProps = {
  userId: string;
  coffees: CoffeeResponseData[];
  grinders: GrinderResponseData[];
  brewers: BrewerResponseData[];
  refreshFn: Function;
  equipment: any;
  setEquipmentFn: Function;
};

export default function Component(props: ComponentProps) {
  const [coffeeModalValue, setCoffeeModalValue] = useState<boolean>(false);
  const [grinderModalValue, setGrinderModalValue] = useState<boolean>(false);
  const [brewerModalValue, setBrewerModalValue] = useState<boolean>(false);

  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);
  const [coffeeValue, setCoffeeValue] = useState<string>("");
  const [waterValue, setWaterValue] = useState<string>("");
  const [grinderValue, setGrinderValue] = useState<string>("");
  const [brewerValue, setBrewerValue] = useState<string>("");

  useEffect(() => {
    props.setEquipmentFn({
      ...props.equipment,
      coffee_id: coffeeValue,
    });
  }, [coffeeValue]);
  useEffect(() => {
    props.setEquipmentFn({
      ...props.equipment,
      water_hardness: waterValue,
    });
  }, [waterValue]);
  useEffect(() => {
    props.setEquipmentFn({
      ...props.equipment,
      grinder_id: grinderValue,
    });
  }, [grinderValue]);
  useEffect(() => {
    props.setEquipmentFn({
      ...props.equipment,
      brewer_id: brewerValue,
    });
  }, [brewerValue]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <View style={appStyles.accordionHeader}>
        <Text style={appStyles.headerText}>Equipment</Text>

        <FontAwesome
          name={isActive ? "eye-slash" : "eye"}
          size={24}
          color="black"
        />
      </View>
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
          buttonFn={() => setCoffeeModalValue(true)}
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
          buttonFn={() => setGrinderModalValue(true)}
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
          buttonFn={() => setBrewerModalValue(true)}
        />

        <CreateCoffeeModal
          visible={coffeeModalValue}
          hideFn={() => setCoffeeModalValue(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <CreateGrinderModal
          visible={grinderModalValue}
          hideFn={() => setGrinderModalValue(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <CreateBrewerModal
          visible={brewerModalValue}
          hideFn={() => setBrewerModalValue(false)}
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
