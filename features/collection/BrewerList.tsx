import React, { useState } from "react";
import { View } from "react-native";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Session } from "@supabase/supabase-js";
import { useBrewerService } from "@/features/shared/services/brewer-service";
import ListItem from "./ListItem";
import PageLoader from "@/components/loaders/PageLoader";
import BrewerModal from "@/features/shared/components/modals/BrewerModal";
import { useModal } from "@/features/shared/services/modal-service";
import { Coffee } from "@/types/coffee";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { brewerImagesBucket } from "@/constants/storage-buckets";

type ComponentProps = {
  session: Session;
};

export default function Component(props: ComponentProps) {
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
      <ListItem
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
