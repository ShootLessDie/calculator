import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import GridView, { GridViewProps } from "./Gridview";
import { InputData, InputKeyboardData } from "./types";
import { disabledText, inputKeyboardData, text } from "./constants";

const renderButton = (
  { buttonColor, disabled, iconName, value }: InputKeyboardData,
  setData: GridViewProps<InputKeyboardData>["setData"],
  inputData: InputData,
): JSX.Element => (
  <TouchableOpacity
    style={[styles.item, buttonColor && { backgroundColor: buttonColor }]}
    disabled={disabled}
    onPress={() => {
      if (value === "AC") setData({ var1: "", var2: "" });
      else if (value) {
        if (!inputData.operator) {
          setData((data) => ({
            ...data,
            var1: String(data.var1) + value,
          }));
        } else {
          setData((data) => ({
            ...data,
            var2: String(data.var2) + value,
            shouldCalculate: false,
          }));
        }
      } else {
        switch (iconName) {
          case "plus":
            setData((data) => ({ ...data, operator: "+" }));
            break;
          case "minus":
            setData((data) => ({ ...data, operator: "-" }));
            break;
          case "close":
            setData((data) => ({ ...data, operator: "x" }));
            break;
          case "division":
            setData((data) => ({ ...data, operator: "/" }));
            break;
          case "equal":
            setData((data) => ({ ...data, shouldCalculate: true }));
            break;
          case "backspace":
            if (!inputData.operator) {
              setData((data) => ({
                ...data,
                var1: String(data.var1).slice(0, -1),
              }));
            } else {
              setData((data) => ({
                ...data,
                var1: String(data.var2).slice(0, -1),
              }));
            }
        }
      }
    }}
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

const Input = ({
  setInputData,
  inputData,
}: {
  setInputData: React.Dispatch<React.SetStateAction<InputData>>;
  inputData: InputData;
}) => {
  const [width, setWidth] = useState<number>(0);
  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <GridView
        buttonData={inputKeyboardData}
        columnNumber={4}
        renderItem={renderButton}
        setData={setInputData}
        inputData={inputData}
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
