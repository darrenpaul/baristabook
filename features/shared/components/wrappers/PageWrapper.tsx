import { View, ScrollView } from "react-native";
import PageHeader from "@/components/headers/PageHeader";
import { containerStyles, paddingStyles } from "@/features/shared/styles/index";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function Component(props: Props) {
  return (
    <View style={containerStyles.page}>
      {props.title && <PageHeader text={props.title} />}

      <ScrollView>
        <View
          style={[containerStyles.pageContent, paddingStyles.horizontalGutter]}
        >
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
}
