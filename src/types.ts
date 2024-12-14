export type Operation = (a: number, b: number) => number | string;

export type ButtonSetupData = {
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
  operand1: string;
  operand2: string;
  shouldCalculate: boolean;
  isEnteringOperand2: boolean;
};
