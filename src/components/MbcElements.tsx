import React from "react";
import { TextFieldMbcElement } from "./fields/TextField";

export type ElementsType = 'TextField'

export type SubmitFunction = (key: string, value: string) => void;

export type MbcElement = {
  type: ElementsType
  construct: (id: string) => MbcElementInstance;
  designerBtnElement: {
    icon: React.ElementType
    label: string
  }
  designerComponent: React.FC<{
    elementInstance: MbcElementInstance;
  }>
  mbcComponent: React.FC<{
    elementInstance: MbcElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent:  React.FC<{
    elementInstance: MbcElementInstance;
  }>
}

export type MbcElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

type MbcElementsType = {
  [key in ElementsType]: MbcElement
}

export const MbcElements: MbcElementsType = {
  TextField: TextFieldMbcElement,
}
