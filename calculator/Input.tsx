import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Icon } from "react-native-paper";

const lime = "#dce6b1";
const lightOrange = "#fedcbe";
const brown = "#e3dfe3";
const text = "#50443a";
const disabledText = "#a09aa0";

interface Props<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  columnNumber: number;
  width: number;
  style: StyleProp<ViewStyle>;
}

const GridView = <T extends { id: number }>({
  data,
  columnNumber,
  renderItem,
  width,
  style,
}: Props<T>) => {
  const itemWidth = width / columnNumber;

  return (
    <View
      style={[style, { width: "100%", flexDirection: "row", flexWrap: "wrap" }]}
    >
      {data.map((item) => (
        <View
          style={{ width: itemWidth, height: itemWidth }}
          key={String(item.id)}
        >
          <View
            style={{
              margin: 4,
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {renderItem(item)}
          </View>
        </View>
      ))}
    </View>
  );
};

type InputKeyboardData = {
  value?: string;
  iconName?: string;
  buttonColor?: string;
  id: number;
  disabled?: boolean;
};

const inputKeyboardData: InputKeyboardData[] = [
  { id: 1, value: "AC", buttonColor: lime },
  {
    id: 2,
    iconName: "code-parentheses",
    buttonColor: brown,
    disabled: true,
  },
  {
    id: 3,
    iconName: "percent-outline",
    buttonColor: brown,
    disabled: true,
  },
  { id: 4, iconName: "division", buttonColor: lightOrange },
  { id: 5, value: "7" },
  { id: 6, value: "8" },
  { id: 7, value: "9" },
  { id: 8, iconName: "close", buttonColor: lightOrange },
  { id: 9, value: "4" },
  { id: 10, value: "5" },
  { id: 11, value: "6" },
  { id: 12, iconName: "minus", buttonColor: lightOrange },
  { id: 13, value: "1" },
  { id: 14, value: "2" },
  { id: 15, value: "3" },
  { id: 16, iconName: "plus", buttonColor: lightOrange },
  { id: 17, value: "0" },
  { id: 18, value: ".", buttonColor: brown, disabled: true },
  { id: 19, iconName: "backspace" },
  { id: 20, iconName: "equal", buttonColor: lightOrange },
];

const renderButton = ({
  iconName,
  value,
  buttonColor,
  disabled,
}: InputKeyboardData): JSX.Element => (
  <TouchableOpacity
    style={[styles.item, buttonColor && { backgroundColor: buttonColor }]}
    disabled={disabled}
  >
    {value ? (
      <Text style={[styles.text, disabled && { color: disabledText }]}>
        {value}
      </Text>
    ) : (
      <Icon
        source={iconName}
        size={40}
        color={disabled ? disabledText : text}
      ></Icon>
    )}
  </TouchableOpacity>
);

const Input = () => {
  const [width, setWidth] = useState<number>(0);
  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <GridView
        data={inputKeyboardData}
        columnNumber={4}
        renderItem={renderButton}
        width={width}
        style={width === 0 && { opacity: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: "row",
  },
  item: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    backgroundColor: "#f7eee8",
  },
  text: {
    fontSize: 40,
    color: text,
  },
});

export default Input;
