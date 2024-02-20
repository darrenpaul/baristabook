import React, { useState } from "react";
import { View } from "react-native";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import appStyles from "@/features/shared/styles/styles";
import { Session } from "@supabase/supabase-js";
import { useGrinderService } from "@/features/shared/services/grinder-service";
import ListItem from "./ListItem";
import PageLoader from "@/components/loaders/PageLoader";
import GrinderModal from "@/features/shared/components/modals/GrinderModal";
import { useModal } from "@/features/shared/services/modal-service";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { Grinder } from "@/types/grinder";

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
      <ListItem
        key={grinder.id}
        title={grinder.name}
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
