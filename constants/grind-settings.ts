import { GrindSetting } from "@/types/grind-setting";
import { grams, ounces } from "@/constants/weights";

export const gramSettings = {
  label: grams.label,
  value: grams.value,
  display: grams.display,
  weight: 30,
  weightMin: 0,
  weightMax: 60,
  step: 1,
};

export const ounceSettings = {
  label: ounces.label,
  value: ounces.value,
  display: ounces.display,
  weight: 1.05,
  weightMin: 0,
  weightMax: 2.1,
  step: 0.05,
};

export default [gramSettings, ounceSettings] as GrindSetting[];
