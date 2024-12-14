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
      if (value === "AC")
        setData({ var1: "", var2: "", isEnteringVar2: false });
      else if (value) {
        if (!inputData.isEnteringVar2) {
          setData((data) => ({
            ...data,
            var1: String(data.var1) + value,
            shouldCalculate: false,
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
            setData((data) => ({
              ...data,
              operator: "+",
              isEnteringVar2: true,
              shouldCalculate: false,
            }));
            break;
          case "minus":
            if (!inputData.isEnteringVar2 && !inputData.var1) {
              setData((data) => ({ ...data, var1: "-" }));
            } else if (inputData.isEnteringVar2 && !inputData.var2) {
              setData((data) => ({ ...data, var2: "-" }));
            } else {
              setData((data) => ({
                ...data,
                operator: "-",
                isEnteringVar2: true,
                shouldCalculate: false,
              }));
            }
            break;
          case "close":
            setData((data) => ({
              ...data,
              operator: "x",
              isEnteringVar2: true,
              shouldCalculate: false,
            }));
            break;
          case "division":
            setData((data) => ({
              ...data,
              operator: "/",
              isEnteringVar2: true,
              shouldCalculate: false,
            }));
            break;
          case "equal":
            setData((data) => ({
              ...data,
              shouldCalculate: true,
              var1: data.var1 === "" || data.var1 === "-" ? "0" : data.var1,
              var2: data.var2 === "" || data.var2 === "-" ? "0" : data.var2,
            }));
            break;
          case "backspace":
            if (!inputData.isEnteringVar2) {
              setData((data) => ({
                ...data,
                var1: String(data.var1).slice(0, -1),
                shouldCalculate: false,
              }));
            } else {
              setData((data) => ({
                ...data,
                var2: String(data.var2).slice(0, -1),
                shouldCalculate: false,
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
