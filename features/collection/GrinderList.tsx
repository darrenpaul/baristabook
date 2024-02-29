import React, { useState } from "react";
import { View } from "react-native";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Session } from "@supabase/supabase-js";
import { useGrinderService } from "@/services/grinder-service";
import CardItem from "./CardItem";
import PageLoader from "@/components/loaders/PageLoader";
import GrinderModal from "@/features/shared/components/modals/GrinderModal";
import { useModal } from "@/services/modal-service";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { Grinder } from "@/types/grinder";
import { grinderImagesBucket } from "@/constants/storage-buckets";
import { buttonSecondary } from "@/constants/button-types";

type ComponentProps = {
  session: Session;
};

export default function Component(props: ComponentProps) {
  const { modalState, setModalState } = useModal();
  const { grinders, refreshFn } = useGrinderService(props.session);
  const [activeGrinderValue, setActiveGrinder] = useState<Grinder>();

  function onGrinderSelect(grinder: Grinder) {
    setActiveGrinder(grinder);
    setModalState(true);
  }

  function renderContent() {
    if (!props.session) return <PageLoader />;

    return grinders.map((grinder) => (
      <CardItem
        key={grinder.id}
        title={grinder.name}
        imageBucket={grinderImagesBucket}
        imageUrl={grinder.image}
        data={grinder}
        setFn={onGrinderSelect}
      />
    ));
  }

  return (
    <>
      <AccordionWrapper title="Grinders" disabled={false}>
        <View style={appStyles.accordionContent}>
          <ButtonWrapper
            text="Create"
            icon="plus"
            type={buttonSecondary}
            onPressFn={async () => {
              setActiveGrinder(undefined);
              setModalState(true);
            }}
          />

          {renderContent()}
        </View>
      </AccordionWrapper>

      <GrinderModal
        visible={modalState}
        hideFn={() => {
          setModalState(false);
          setActiveGrinder(undefined);
        }}
        userId={props.session.user.id}
        onSaveFn={refreshFn}
        editData={activeGrinderValue}
      />
    </>
  );
}
