import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Input from "./calculator/Input";
import ResultDisplay from "./calculator/ResultDisplay";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="inverted" translucent={false} />
      <View style={styles.container}>
        <ResultDisplay />
        <Input />
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
