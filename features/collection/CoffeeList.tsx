import PageLoader from "@/components/loaders/PageLoader";
import CoffeeModal from "@/components/modals/CoffeeModal";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import { coffeeImagesBucket } from "@/constants/storage-buckets";
import { useCoffeeService } from "@/services/coffee-service";
import { useModal } from "@/services/modal-service";
import appStyles from "@/styles/styles";
import { Coffee } from "@/types/coffee";
import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import { View } from "react-native";
import CardItem from "./CardItem";

type Props = {
  session: Session;
};

export default function Component(props: Props) {
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
      <CardItem
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
            type={buttonSecondary}
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
