import AccordionWrapper from "@/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import SuggestionModal from "@/features/account/modals/SuggestionModal";
import { useModal } from "@/services/modal-service";
import appStyles from "@/styles/styles";
import { User } from "@/types/user";
import React from "react";
import { View } from "react-native";

type Props = {
  user: User;
  disabled?: boolean;
};

export default function Component(props: Props) {
  const {
    modalState: suggestionModalState,
    setModalState: setSuggestionModalState,
  } = useModal();

  return (
    <AccordionWrapper title="Support" disabled={false}>
      <View style={appStyles.accordionContent}>
        <ButtonWrapper
          text="Suggest Feature"
          icon="comment"
          type={buttonSecondary}
          onPressFn={() => setSuggestionModalState(true)}
        />
      </View>

      <SuggestionModal
        visible={suggestionModalState}
        hideFn={() => setSuggestionModalState(false)}
        userId={props.user.id}
      />
    </AccordionWrapper>
  );
}
