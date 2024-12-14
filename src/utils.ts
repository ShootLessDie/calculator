import { Operation } from "./types";

export const operations: Record<string, Operation> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : "Error: Division by zero"),
};
