import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { InputData } from "../types";

export interface GridViewProps<T> {
  buttonData: T[];
  renderItem(
    item: T,
    setData: React.Dispatch<React.SetStateAction<InputData>>,
    inputData: InputData,
  ): JSX.Element;
  columnNumber: number;
  width: number;
  style: StyleProp<ViewStyle>;
  setData: React.Dispatch<React.SetStateAction<InputData>>;
  inputData: InputData;
}

const GridView = <T extends { id: number }>({
  buttonData: data,
  columnNumber,
  renderItem,
  width,
  style,
  setData,
  inputData,
}: GridViewProps<T>) => {
  const itemWidth = width / columnNumber;

  return (
    <View style={[style, styles.container]}>
      {data.map((item) => (
        <View
          style={{ width: itemWidth, height: itemWidth }}
          key={String(item.id)}
        >
          <View style={styles.spacedItemContainer}>
            {renderItem(item, setData, inputData)}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "row", flexWrap: "wrap" },
  spacedItemContainer: {
    margin: 4,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default GridView;
