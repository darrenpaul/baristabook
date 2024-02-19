import React, { useState } from "react";
import { View } from "react-native";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Session } from "@supabase/supabase-js";
import { useCoffeeService } from "@/features/shared/services/coffee-service";
import CoffeeListItem from "./CoffeeListItem";
import PageLoader from "@/components/loaders/PageLoader";
import CreateCoffeeModal from "@/features/recipe/create/modals/CreateCoffeeModal";
import { useModal } from "@/features/shared/services/modal-service";
import { CoffeeData } from "@/types/coffee";

type ComponentProps = {
  session: Session;
};

export default function Component(props: ComponentProps) {
  const { modalState, setModalState } = useModal();
  const { coffees, refreshFn } = useCoffeeService(props.session);
  const [activeCoffeeValue, setActiveCoffee] = useState<CoffeeData>();

  function onCoffeeSelect(coffee: CoffeeData) {
    setActiveCoffee(coffee);
    setModalState(true);
  }

  function renderCoffees() {
    if (!props.session) return <PageLoader />;

    return coffees.map((coffee) => (
      <CoffeeListItem key={coffee.id} coffee={coffee} setFn={onCoffeeSelect} />
    ));
  }

  return (
    <>
      <AccordionWrapper title="Coffees" disabled={false}>
        <View style={appStyles.accordionContent}>{renderCoffees()}</View>
      </AccordionWrapper>

      <CreateCoffeeModal
        visible={modalState}
        hideFn={() => {
          setModalState(false);
          setActiveCoffee(undefined);
        }}
        userId={props.session.user.id}
        onSaveFn={refreshFn}
        editData={activeCoffeeValue}
      />
    </>
  );
}
