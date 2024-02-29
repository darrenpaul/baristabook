import PageLoader from "@/components/loaders/PageLoader";
import BrewerModal from "@/components/modals/BrewerModal";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import { brewerImagesBucket } from "@/constants/storage-buckets";
import { useBrewerService } from "@/services/brewer-service";
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
  const { brewers, refreshFn } = useBrewerService(props.session);
  const [activeCoffeeValue, setActiveCoffee] = useState<Coffee>();

  function onCoffeeSelect(coffee: Coffee) {
    setActiveCoffee(coffee);
    setModalState(true);
  }

  function renderContent() {
    if (!props.session) return <PageLoader />;

    return brewers.map((brewer) => (
      <CardItem
        key={brewer.id}
        title={brewer.name}
        imageBucket={brewerImagesBucket}
        imageUrl={brewer.image}
        data={brewer}
        setFn={onCoffeeSelect}
      />
    ));
  }

  return (
    <>
      <AccordionWrapper title="Brewers" disabled={false}>
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

      <BrewerModal
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
