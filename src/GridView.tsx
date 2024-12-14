import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { InputData } from "./types";

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
    <View
      style={[style, { width: "100%", flexDirection: "row", flexWrap: "wrap" }]}
    >
      {data.map((item) => (
        <View
          style={{ width: itemWidth, height: itemWidth }}
          key={String(item.id)}
        >
          <View
            style={{
              margin: 4,
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {renderItem(item, setData, inputData)}
          </View>
        </View>
      ))}
    </View>
  );
};

export default GridView;
