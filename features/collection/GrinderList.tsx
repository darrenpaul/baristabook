import PageLoader from "@/components/loaders/PageLoader";
import GrinderModal from "@/components/modals/GrinderModal";
import AccordionWrapper from "@/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import { grinderImagesBucket } from "@/constants/storage-buckets";
import { useGrinderService } from "@/services/grinder-service";
import { useModal } from "@/services/modal-service";
import appStyles from "@/styles/styles";
import { Grinder } from "@/types/grinder";
import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import { View } from "react-native";
import CardItem from "./CardItem";

type Props = {
  session: Session;
};

export default function Component(props: Props) {
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
