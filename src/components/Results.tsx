import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  formatWithThousandSeparators,
  isOperandValid,
  operations,
} from "../utils";
import { InputData } from "../types";
import { backgroundDarkOrange, darkBrown } from "../constants";

const Results = ({ data }: { data: InputData }) => {
  const [result, setResult] = useState<number | string>();

  useEffect(() => {
    if (
      data.shouldCalculate &&
      data.operator &&
      isOperandValid(data.operand1) &&
      isOperandValid(data.operand2)
    ) {
      setResult(
        operations[data.operator](Number(data.operand1), Number(data.operand2)),
      );
    } else if (!data.shouldCalculate) {
      setResult("");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {formatWithThousandSeparators(data.operand1) +
          " " +
          (data.operator ?? "")}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
        {formatWithThousandSeparators(data.operand2)}
      </Text>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.text, styles.resultText]}
      >
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
  resultText: {
    color: darkBrown,
  },
});

export default Results;
