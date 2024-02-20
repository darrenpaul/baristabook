import React, { useState } from "react";
import { View } from "react-native";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Session } from "@supabase/supabase-js";
import { useCoffeeService } from "@/features/shared/services/coffee-service";
import ListItem from "./ListItem";
import PageLoader from "@/components/loaders/PageLoader";
import CoffeeModal from "@/features/shared/components/modals/CoffeeModal";
import { useModal } from "@/features/shared/services/modal-service";
import { Coffee } from "@/types/coffee";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { coffeeImagesBucket } from "@/constants/storage-buckets";

type ComponentProps = {
  session: Session;
};

export default function Component(props: ComponentProps) {
  const { modalState, setModalState } = useModal();
  const { coffees, refreshFn } = useCoffeeService(props.session);
  const [activeCoffeeValue, setActiveCoffee] = useState<Coffee>();

  function onCoffeeSelect(coffee: Coffee) {
    setActiveCoffee(coffee);
    setModalState(true);
  }

  function renderContent() {
    if (!props.session) return <PageLoader />;

    return coffees.map((coffee) => (
      <ListItem
        key={coffee.id}
        title={coffee.name}
        imageBucket={coffeeImagesBucket}
        imageUrl={coffee.image}
        data={coffee}
        setFn={onCoffeeSelect}
      />
    ));
  }

  return (
    <>
      <AccordionWrapper title="Coffees" disabled={false}>
        <View style={appStyles.accordionContent}>
          <ButtonWrapper
            text="Create"
            icon="plus"
            onPressFn={async () => {
              setActiveCoffee(undefined);
              setModalState(true);
            }}
          />

          {renderContent()}
        </View>
      </AccordionWrapper>

      <CoffeeModal
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
