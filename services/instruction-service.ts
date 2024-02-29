import { useState } from "react";
import { Instructions } from "@/types/instructions";

export function useInstructionStateService() {
  const [instructionsValue, setInstructions] = useState<Instructions>({
    pre_infusion_duration: 30,
    extraction_duration: 30,
    weight: 30,
    temperature: 30,
    pressure: 30,
    notes: "",
  });

  return { instructionsValue, setInstructions };
}
