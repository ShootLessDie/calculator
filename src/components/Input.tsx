import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import GridView, { GridViewProps } from "./GridView";
import { InputData, ButtonSetupData } from "../types";
import { disabledText, buttonSetupData, lightBrown, text } from "../constants";
import { isOperandValid } from "../utils";

const renderButton = (
  { buttonColor, disabled, iconName, value }: ButtonSetupData,
  setData: GridViewProps<ButtonSetupData>["setData"],
  inputData: InputData,
): JSX.Element => {
  const shouldSetOperand1Negative =
    !inputData.isEnteringOperand2 && !inputData.operand1;
  const shouldSetOperand2Negative =
    inputData.isEnteringOperand2 && !inputData.operand2;

  const handleValuePress = (inputValue: string) => {
    if (inputValue === "AC")
      setData({
        operand1: "",
        operand2: "",
        isEnteringOperand2: false,
        shouldCalculate: false,
      });
    else if (inputData.isEnteringOperand2) {
      setData((data) => ({
        ...data,
        operand2: String(data.operand2) + inputValue,
        shouldCalculate: false,
      }));
    } else {
      setData((data) => ({
        ...data,
        operand1: String(data.operand1) + inputValue,
        shouldCalculate: false,
      }));
    }
  };

  const handleOperatorPress = () => {
    switch (iconName) {
      case "plus":
        setData((data) => ({
          ...data,
          operator: isOperandValid(data.operand1) ? "+" : undefined,
          isEnteringOperand2: isOperandValid(data.operand1) ? true : false,
          shouldCalculate: false,
        }));
        break;
      case "minus":
        if (shouldSetOperand1Negative) {
          setData((data) => ({ ...data, operand1: "-" }));
        } else if (shouldSetOperand2Negative) {
          setData((data) => ({ ...data, operand2: "-" }));
        } else {
          setData((data) => ({
            ...data,
            operator: isOperandValid(data.operand1) ? "-" : undefined,
            isEnteringOperand2: isOperandValid(data.operand1) ? true : false,
            shouldCalculate: false,
          }));
        }
        break;
      case "close": // Name of the icon used for multiplication
        setData((data) => ({
          ...data,
          operator: isOperandValid(data.operand1) ? "x" : undefined,
          isEnteringOperand2: isOperandValid(data.operand1) ? true : false,
          shouldCalculate: false,
        }));
        break;
      case "division":
        setData((data) => ({
          ...data,
          operator: isOperandValid(data.operand1) ? "/" : undefined,
          isEnteringOperand2: isOperandValid(data.operand1) ? true : false,
          shouldCalculate: false,
        }));
        break;
      case "equal":
        setData((data) => ({
          ...data,
          shouldCalculate: true,
        }));
        break;
      case "backspace":
        if (inputData.isEnteringOperand2) {
          setData((data) => ({
            ...data,
            operand2: String(data.operand2).slice(0, -1),
            shouldCalculate: false,
          }));
        } else {
          setData((data) => ({
            ...data,
            operand1: String(data.operand1).slice(0, -1),
            shouldCalculate: false,
          }));
        }
    }
  };

  const onPressHandler = () => {
    if (value) handleValuePress(value);
    else handleOperatorPress();
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
        buttonData={buttonSetupData}
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
