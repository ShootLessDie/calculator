export type Operation = (a: number, b: number) => number | string;

export type InputKeyboardData = {
  value?: string;
  iconName?:
    | "code-parentheses"
    | "percent-outline"
    | "division"
    | "close"
    | "minus"
    | "plus"
    | "backspace"
    | "equal";
  buttonColor?: string;
  id: number;
  disabled?: boolean;
};

export type Operator = "+" | "-" | "x" | "/";

export type InputData = {
  operator?: Operator;
  var1: string;
  var2: string;
  shouldCalculate?: boolean;
};