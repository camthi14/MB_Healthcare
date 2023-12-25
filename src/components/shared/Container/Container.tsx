import { ViewStyleProp } from "@/types/style";
import { memo } from "react";
import { SafeAreaView } from "react-native";
import useStyle from "./style";
import { ColorSchemas } from "@/constants/colors";

type ContainerProps = {
  children: JSX.Element | React.ReactNode;
  style?: ViewStyleProp;
};

const Container = ({ children, style }: ContainerProps) => {
  const styles = useStyle();

  return (
    <SafeAreaView
      style={[
        styles.flex,
        styles.wrapperView,
        style,
        { backgroundColor: ColorSchemas.greyLighterV3 },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default memo(Container, () => false);
