import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Input from "./src/components/Input";
import Results from "./src/components/Results";
import { useState } from "react";
import { InputData } from "./src/types";
import { backgroundWhite } from "./src/constants";

export default function App() {
  const [inputData, setInputData] = useState<InputData>({
    operand1: "",
    operand2: "",
    isEnteringOperand2: false,
    shouldCalculate: false,
  });
  return (
    <PaperProvider>
      <StatusBar translucent={true} />
      <View style={styles.container}>
        <Results data={inputData} />
        <Input setInputData={setInputData} inputData={inputData} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundWhite,
  },
});
