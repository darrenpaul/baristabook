import { TemperatureSetting } from "@/types/temperature-setting";
import { celsius, fahrenheit } from "@/constants/temperatures";

export const celsiusSettings = {
  label: celsius.label,
  value: celsius.value,
  display: celsius.display,
  temperature: 30,
  temperatureMin: 0,
  temperatureMax: 60,
  step: 1,
};

export const fahrenheitSettings = {
  label: fahrenheit.label,
  value: fahrenheit.value,
  display: fahrenheit.display,
  temperature: 1.05,
  temperatureMin: 0,
  temperatureMax: 2.1,
  step: 0.05,
};

export const temperatureSettings: TemperatureSetting[] = [
  celsiusSettings,
  fahrenheitSettings,
];
