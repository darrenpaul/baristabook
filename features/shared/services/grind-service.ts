import { useState } from "react";
import { Grind } from "@/types/grind";
import { grindSizeMedium } from "@/constants/grind-size-data";

export function useGrindStateService() {
  const [grindValue, setGrind] = useState<Grind>({
    size: grindSizeMedium.value,
    duration: 30,
    weight: 30,
    image: "",
    notes: "",
  });

  return { grindValue, setGrind };
}
