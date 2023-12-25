import { useTheme } from "@/contexts/ThemeContext";
import { ViewStyleProp } from "@/types/style";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown as DropdownElement } from "react-native-element-dropdown";
import HelperText from "../Input/HelperText";
import useStyles from "./styles";

interface DropdownState {
  label: string;
  value: string;
}

interface DropdownProps {
  data: DropdownState[];
  label: string;
  helperText?: React.ReactNode;
  error?: boolean;
  value: string;
  onChangeValue?: (value: string) => void;
  styles?: ViewStyleProp;
}

const Dropdown: FC<DropdownProps> = ({
  data,
  label,
  helperText,
  error,
  value,
  styles: viewStyles,
  onChangeValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useTheme();
  const styles = useStyles(error);

  return (
    <View style={viewStyles}>
      <Text style={styles.label}>{label}</Text>

      <DropdownElement
        style={[styles.dropdown]}
        placeholderStyle={[styles.placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, { color: theme.colors.text }]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          if (!onChangeValue) return;
          onChangeValue(item.value);
        }}
      />
      {helperText && (
        <View style={{ marginTop: 5 }}>
          <HelperText
            type={helperText && error ? "error" : "info"}
            visible={error}
            text={helperText}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;
