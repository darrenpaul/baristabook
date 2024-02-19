import React, { ReactNode, useState } from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import AccordionHeader from "@/components/accordion/AccordionHeader";

type ComponentProps = {
  title: string;
  children: ReactNode;
  disabled: boolean;
};

export default function Component({
  title,
  children,
  disabled = false,
}: ComponentProps) {
  const SECTIONS = [
    {
      title: title,
      content: title,
    },
  ];

  const [activeSections, setActiveSectionsValue] = useState<number[]>([0]);

  function renderHeader(_content: Object, _index: number, isActive: boolean) {
    return (
      <AccordionHeader title={title} active={isActive} disabled={disabled} />
    );
  }

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={() => <View>{children}</View>}
      underlayColor="transparent"
      onChange={(value) => setActiveSectionsValue(value)}
    />
  );
}
