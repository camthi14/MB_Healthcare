import { ColorSchemas } from "@/constants/colors";
import { scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: scale(20),
      paddingBottom: 100,
    },
    bgWhite: {
      backgroundColor: ColorSchemas.greyLighterV3,
    },
    with100: {
      width: "100%",
    },
    title: {
      fontSize: scale(30),
      fontWeight: "bold",
      marginRight: scale(10),
      color: ColorSchemas.blue,
    },
    image: {
      width: scale(42),
      height: scale(39),
    },
    wrapTitle: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: { width: scale(30), height: scale(30) },
    textBottom: {
      marginTop: scale(15),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  });
};

export default useStyles;
