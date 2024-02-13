import temperatures, { celsius, fahrenheit } from "@/constants/temperatures";
import weights, { grams, ounces } from "@/constants/weights";
import { findObject } from "@/utils/array-helpers";

export function ozToGrams(oz: number): number {
  return oz * 28.3495;
}

export function gramsToOz(grams: number): number {
  return grams / 28.3495;
}

export function weightConversion(
  from: string,
  to: string,
  value: number
): number {
  if (from === grams.value && to === ounces.value) {
    const convertedValue = gramsToOz(value).toFixed(2);
    return Number(convertedValue);
  } else if (from === ounces.value && to === grams.value) {
    const convertedValue = ozToGrams(value).toFixed(2);
    return Number(convertedValue);
  }

  return value;
}

export function weightConversionWithSymbol(
  from: string,
  to: string,
  value: number
): string {
  const symbol = findObject(weights, "value", to);
  const convertedValue = weightConversion(from, to, value);
  return `${convertedValue}${symbol?.display}`;
}

export function celsiusToFahrenheit(celsius: number): number {
  return celsius * (9 / 5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}

export function temperatureConversion(
  from: string,
  to: string,
  value: number
): number {
  if (from === celsius.value && to === fahrenheit.value) {
    const convertedValue = celsiusToFahrenheit(value).toFixed(2);
    return Number(convertedValue);
  } else if (from === fahrenheit.value && to === celsius.value) {
    const convertedValue = fahrenheitToCelsius(value).toFixed(2);
    return Number(convertedValue);
  }

  return Number(value);
}

export function temperatureConversionWithSymbol(
  from: string,
  to: string,
  value: number
): string {
  const symbol = findObject(temperatures, "value", to);
  const convertedValue = temperatureConversion(from, to, value);
  return `${convertedValue}${symbol?.display}`;
}
