import Decimal from "decimal.js";
import { clamp } from "lodash";

type Options = {
  decimalPlaces?: number;
  step?: number;
  min?: number;
  max?: number;
};

export const clampNum = (number: string, options?: Omit<Options, "step">) => {
  const myNumber = new Decimal(number);
  const decimalPlaces = options?.decimalPlaces || myNumber.decimalPlaces();

  return clamp(
    myNumber.toNumber(),
    options?.min || Number.MIN_VALUE,
    options?.max || Number.MAX_VALUE
  ).toFixed(decimalPlaces);
};

export const increment = (number: string, options?: Options): string => {
  const myNumber = new Decimal(number);
  const decimalPlaces = options?.decimalPlaces || myNumber.decimalPlaces();
  const step = options?.step || 1;

  return clamp(
    myNumber.plus(step).toNumber(),
    options?.min || Number.MIN_VALUE,
    options?.max || Number.MAX_VALUE
  ).toFixed(decimalPlaces);
};

export const decrement = (number: string, options?: Options): string => {
  const myNumber = new Decimal(number);
  const decimalPlaces = options?.decimalPlaces || myNumber.decimalPlaces();
  const step = options?.step || 1;

  return clamp(
    myNumber.minus(step).toNumber(),
    options?.min || Number.MIN_VALUE,
    options?.max || Number.MAX_VALUE
  ).toFixed(decimalPlaces);
};
