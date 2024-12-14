import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { operations } from "./utils";
import { InputData } from "./types";

const Results = ({ data }: { data: InputData }) => {
  const [result, setResult] = useState<number | string>();

  useEffect(() => {
    if (data.shouldCalculate && data.operator && data.var1 && data.var2) {
      setResult(
        operations[data.operator](Number(data.var1), Number(data.var2)),
      );
    } else if (!data.shouldCalculate && result) {
      setResult("");
    }
  }, [data]);

  return (
    <View style={{ ...styles.container }}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {data.var1 + " " + (data.operator ?? "")}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {data.var2}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {result}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eedfd4",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20,
  },
  row: {
    flexDirection: "row",
  },
  item: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 65,
  },
});

export default Results;
