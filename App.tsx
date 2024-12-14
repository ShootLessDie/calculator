import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Input from "./src/Input";
import Results from "./src/Results";
import { useState } from "react";
import { InputData } from "./src/types";

export default function App() {
  const [inputData, setInputData] = useState<InputData>({ var1: "", var2: "" });
  return (
    <PaperProvider>
      <StatusBar style="inverted" translucent={false} />
      <View style={styles.container}>
        <Results data={inputData} />
        <Input setInputData={setInputData} inputData={inputData} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fdf6f4",
    width: "100%",
  },
});
