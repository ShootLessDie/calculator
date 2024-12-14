import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { formatWithThousandSeparators, operations } from "../utils";
import { InputData } from "../types";
import { backgroundDarkOrange } from "../constants";

const Results = ({ data }: { data: InputData }) => {
  const [result, setResult] = useState<number | string>();

  useEffect(() => {
    if (data.shouldCalculate && data.operator) {
      setResult(
        operations[data.operator](Number(data.var1), Number(data.var2)),
      );
    } else if (data.shouldCalculate) {
      setResult(Number(data.var1));
    } else if (!data.shouldCalculate) {
      setResult("");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {formatWithThousandSeparators(data.var1) + " " + (data.operator ?? "")}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {formatWithThousandSeparators(data.var2)}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {typeof result === "string" || result === undefined
          ? result
          : formatWithThousandSeparators(String(result))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundDarkOrange,
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
