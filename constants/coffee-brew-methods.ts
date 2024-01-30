import { BrewMethod } from "@/types/brew-method";

export const espresso = {
  label: "Espresso Machine",
  value: "Espresso Machine",
  preInfusion: 5,
  preInfusionMin: 0,
  preInfusionMax: 20,
  duration: 40,
  durationMin: 0,
  durationMax: 120,
  weight: 30,
  weightMin: 0,
  weightMax: 100,
  temperature: 96,
  temperatureMin: 0,
  temperatureMax: 200,
  pressure: 9,
  pressureMin: 0,
  pressureMax: 20,
} as BrewMethod;

export const frenchPress = {
  label: "French Press",
  value: "French Press",
  preInfusion: false,
  preInfusionMin: 0,
  preInfusionMax: 0,
  duration: 240,
  durationMin: 0,
  durationMax: 500,
  weight: 30,
  weightMin: 0,
  weightMax: 1000,
  temperature: 96,
  temperatureMin: 0,
  temperatureMax: 200,
  pressure: false,
  pressureMin: 0,
  pressureMax: 20,
} as BrewMethod;

export const coffeeBrewMethods: BrewMethod[] = [frenchPress, espresso];
// export const coffeeBrewMethods: BrewMethod[] = [
//   { label: "Espresso Machine", value: "Espresso Machine" },
//   { label: "Moka Pot", value: "Moka Pot" },
//   { label: "AeroPress", value: "AeroPress" },
//   frenchPress,
//   { label: "SoftBrew", value: "SoftBrew" },
//   { label: "Coffee Bags", value: "Coffee Bags" },
//   { label: "Siphon", value: "Siphon" },
//   { label: "Electric Percolator", value: "Electric Percolator" },
//   { label: "Chemex", value: "Chemex" },
//   { label: "Hario V60", value: "Hario V60" },
//   { label: "Kalita Wave", value: "Kalita Wave" },
//   { label: "Vietnamese Phin", value: "Vietnamese Phin" },
//   { label: "Turkish Coffee", value: "Turkish Coffee" },
// ];
