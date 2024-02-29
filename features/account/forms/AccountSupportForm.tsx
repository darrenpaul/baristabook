import React from "react";
import { View } from "react-native";
import appStyles from "@/features/shared/styles/styles";
import { User } from "@/types/user";
import AccordionWrapper from "@/features/shared/components/wrappers/AccordionWrapper";
import ButtonWrapper from "@/features/shared/components/wrappers/ButtonWrapper";
import { buttonSecondary } from "@/constants/button-types";
import { useModal } from "@/features/shared/services/modal-service";
import SuggestionModal from "@/features/account/modals/SuggestionModal";

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
