import { useState } from "react";

export function useModal() {
  const [modalStateValue, setModalState] = useState<boolean>(false);

  return { modalState: modalStateValue, setModalState };
}
