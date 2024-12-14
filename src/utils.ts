import { Operation, Operator } from "./types";

export const operations: Record<Operator, Operation> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : "Error: Division by zero"),
};
