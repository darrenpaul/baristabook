import React, { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import AccordionHeader from "@/components/accordion/AccordionHeader";

type Props = {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  expanded?: boolean;
};

export default function Component({
  title,
  children,
  disabled = false,
  expanded = false,
}: Props) {
  const SECTIONS = [
    {
      title: title,
      content: title,
    },
  ];

  const [activeSections, setActiveSectionsValue] = useState<number[]>([]);

  useEffect(() => {
    if (expanded) {
      setActiveSectionsValue([0]);
    }
  }, [expanded]);

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
