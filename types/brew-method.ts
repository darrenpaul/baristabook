export type BrewMethod = {
  label: string;
  value: string;
  preInfusion: number | boolean;
  preInfusionMin: number;
  preInfusionMax: number;
  duration: number | false;
  durationMin: number;
  durationMax: number;
  weight: number | boolean;
  weightMin: number;
  weightMax: number;
  temperature: number | boolean;
  temperatureMin: number;
  temperatureMax: number;
  pressure: number | boolean;
  pressureMin: number;
  pressureMax: number;
};
