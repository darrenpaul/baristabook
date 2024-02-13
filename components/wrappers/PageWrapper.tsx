import { View, ScrollView } from "react-native";

import PageHeader from "@/components/headers/PageHeader";
import appStyles, { containerStyles } from "@/constants/styles";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Component(props: Props) {
  return (
    <View style={containerStyles.pageContainer}>
      <PageHeader text={props.title} />

      <ScrollView>
        <View style={appStyles.pageContentContainer}>{props.children}</View>
      </ScrollView>
    </View>
  );
}
