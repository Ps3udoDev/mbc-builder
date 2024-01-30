"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { MbcElementInstance } from "../MbcElements";

type DesignerContextType = {
  elements: MbcElementInstance[];
  setElements: Dispatch<SetStateAction<MbcElementInstance[]>>;
  addElement: (index: number, element: MbcElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: MbcElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<MbcElementInstance | null>>;

  updateElement: (id: string, element: MbcElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<MbcElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<MbcElementInstance | null>(null);

  const addElement = (index: number, element: MbcElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    console.log('thisis id',id, 'and this is the elements',elements)
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: MbcElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,

        selectedElement,
        setSelectedElement,

        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}