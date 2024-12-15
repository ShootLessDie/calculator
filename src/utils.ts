import { Operation, Operator } from "./types";

export const operations: Record<Operator, Operation> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : "Error: Division by zero"),
};

export const isOperandValid = (operand: string) => {
  if (operand === "" || operand === "-") return false;
  return true;
};

export const formatWithThousandSeparators = (input: string): string => {
  if (!isOperandValid(input)) return input;
  return String(Number(input).toLocaleString());
};
