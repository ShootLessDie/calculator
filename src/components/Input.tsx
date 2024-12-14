import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import GridView, { GridViewProps } from "./GridView";
import { InputData, InputKeyboardData } from "../types";
import {
  disabledText,
  inputKeyboardData,
  lightBrown,
  text,
} from "../constants";

const renderButton = (
  { buttonColor, disabled, iconName, value }: InputKeyboardData,
  setData: GridViewProps<InputKeyboardData>["setData"],
  inputData: InputData,
): JSX.Element => {
  const onPressHandler = () => {
    if (value === "AC")
      setData({ operand1: "", operand2: "", isEnteringOperand2: false });
    else if (value) {
      if (!inputData.isEnteringOperand2) {
        setData((data) => ({
          ...data,
          operand1: String(data.operand1) + value,
          shouldCalculate: false,
        }));
      } else {
        setData((data) => ({
          ...data,
          operand2: String(data.operand2) + value,
          shouldCalculate: false,
        }));
      }
    } else {
      switch (iconName) {
        case "plus":
          setData((data) => ({
            ...data,
            operator: "+",
            isEnteringOperand2: true,
            shouldCalculate: false,
          }));
          break;
        case "minus":
          if (!inputData.isEnteringOperand2 && !inputData.operand1) {
            setData((data) => ({ ...data, operand1: "-" }));
          } else if (inputData.isEnteringOperand2 && !inputData.operand2) {
            setData((data) => ({ ...data, operand2: "-" }));
          } else {
            setData((data) => ({
              ...data,
              operator: "-",
              isEnteringOperand2: true,
              shouldCalculate: false,
            }));
          }
          break;
        case "close":
          setData((data) => ({
            ...data,
            operator: "x",
            isEnteringOperand2: true,
            shouldCalculate: false,
          }));
          break;
        case "division":
          setData((data) => ({
            ...data,
            operator: "/",
            isEnteringOperand2: true,
            shouldCalculate: false,
          }));
          break;
        case "equal":
          setData((data) => ({
            ...data,
            shouldCalculate: true,
            operand1:
              data.operand1 === "" || data.operand1 === "-"
                ? "0"
                : data.operand1,
            operand2:
              data.operand2 === "" || data.operand2 === "-"
                ? "0"
                : data.operand2,
          }));
          break;
        case "backspace":
          if (!inputData.isEnteringOperand2) {
            setData((data) => ({
              ...data,
              operand1: String(data.operand1).slice(0, -1),
              shouldCalculate: false,
            }));
          } else {
            setData((data) => ({
              ...data,
              operand2: String(data.operand2).slice(0, -1),
              shouldCalculate: false,
            }));
          }
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.item, buttonColor && { backgroundColor: buttonColor }]}
      disabled={disabled}
      onPress={onPressHandler}
    >
      {value ? (
        <Text style={[styles.text, disabled && { color: disabledText }]}>
          {value}
        </Text>
      ) : (
        <Icon
          source={iconName}
          size={styles.text.fontSize}
          color={disabled ? disabledText : text}
        ></Icon>
      )}
    </TouchableOpacity>
  );
};

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
    backgroundColor: lightBrown,
  },
  text: {
    fontSize: 40,
    color: text,
  },
});

export default Input;
