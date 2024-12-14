import { InputKeyboardData } from "./types";

export const lime = "#dce6b1";
export const lightOrange = "#fedcbe";
export const brown = "#e3dfe3";
export const text = "#50443a";
export const disabledText = "#a09aa0";

export const inputKeyboardData: InputKeyboardData[] = [
  { id: 1, value: "AC", buttonColor: lime },
  {
    id: 2,
    iconName: "code-parentheses",
    buttonColor: brown,
    disabled: true,
  },
  {
    id: 3,
    iconName: "percent-outline",
    buttonColor: brown,
    disabled: true,
  },
  { id: 4, iconName: "division", buttonColor: lightOrange },
  { id: 5, value: "7" },
  { id: 6, value: "8" },
  { id: 7, value: "9" },
  { id: 8, iconName: "close", buttonColor: lightOrange },
  { id: 9, value: "4" },
  { id: 10, value: "5" },
  { id: 11, value: "6" },
  { id: 12, iconName: "minus", buttonColor: lightOrange },
  { id: 13, value: "1" },
  { id: 14, value: "2" },
  { id: 15, value: "3" },
  { id: 16, iconName: "plus", buttonColor: lightOrange },
  { id: 17, value: "0" },
  { id: 18, value: ".", buttonColor: brown, disabled: true },
  { id: 19, iconName: "backspace" },
  { id: 20, iconName: "equal", buttonColor: lightOrange },
];
