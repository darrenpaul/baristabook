import React, { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import DropdownActionButton from "@/components/dropdowns/DropdownActionButton";
import Dropdown from "@/components/dropdowns/DropdownWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Coffee } from "@/types/coffee";
import { waterHardnessLevels } from "@/constants/water-hardness-data";
import CoffeeModal from "@/features/shared/components/modals/CoffeeModal";
import GrinderModal from "@/features/shared/components/modals/GrinderModal";
import BrewerModal from "@/features/shared/components/modals/BrewerModal";
import { Grinder } from "@/types/grinder";
import { Brewer } from "@/types/brewer";
import { useModal } from "@/features/shared/services/modal-service";
import {
  CoffeeBag,
  CoffeeGrinder,
  CoffeeMachine,
  FrenchPress,
  WaterDrop,
} from "@/components/icons/index";
import { frenchPress } from "@/constants/coffee-brew-methods";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";

type Props = {
  userId: string;
  coffees: Coffee[];
  grinders: Grinder[];
  brewers: Brewer[];
  refreshFn: Function;
  equipment: any;
  setEquipmentFn: Function;
};

export default function Component(props: Props) {
  const { modalState: coffeeModalState, setModalState: setCoffeeModalState } =
    useModal();
  const { modalState: grinderModalState, setModalState: setGrinderModalState } =
    useModal();
  const { modalState: brewerModalState, setModalState: setBrewerModalState } =
    useModal();

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

  function renderBrewerIcon(): ReactNode {
    const matchBrewer = props.brewers.find(
      (brewer) => brewer.id === brewerValue,
    );
    if (matchBrewer?.method === frenchPress.label) {
      return <FrenchPress />;
    }
    return <CoffeeMachine />;
  }

  return (
    <AccordionWrapper title="Equipment" disabled={false} expanded={true}>
      <View style={appStyles.accordionContent}>
        <DropdownActionButton
          value={coffeeValue}
          setFn={setCoffeeValue}
          items={props.coffees.map((coffee) => ({
            label: coffee.name,
            value: coffee.id,
          }))}
          icon={<CoffeeBag />}
          placeholder="Select Coffee"
          buttonFn={() => setCoffeeModalState(true)}
        />

        <Dropdown
          value={waterValue}
          setFn={setWaterValue}
          items={waterHardnessLevels}
          icon={<WaterDrop />}
          placeholder="Select Water"
        />

        <DropdownActionButton
          value={grinderValue}
          setFn={setGrinderValue}
          items={props.grinders.map((grinder) => ({
            label: grinder.name,
            value: grinder.id,
          }))}
          icon={<CoffeeGrinder />}
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
          icon={renderBrewerIcon()}
          placeholder="Select Brewer"
          buttonFn={() => setBrewerModalState(true)}
        />

        <CoffeeModal
          visible={coffeeModalState}
          hideFn={() => setCoffeeModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <GrinderModal
          visible={grinderModalState}
          hideFn={() => setGrinderModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />

        <BrewerModal
          visible={brewerModalState}
          hideFn={() => setBrewerModalState(false)}
          userId={props.userId}
          onSaveFn={props.refreshFn}
        />
      </View>
    </AccordionWrapper>
  );
}
