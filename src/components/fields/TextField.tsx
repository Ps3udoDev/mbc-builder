'use client'

import { MdTextFields } from 'react-icons/md'
import { ElementsType, MbcElement, MbcElementInstance } from '../MbcElements'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldMbcElement: MbcElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field'
  },
  designerComponent: DesignerComponent,
  mbcComponent: () => <div>Mbc Component</div>,
  propertiesComponent: () => <div>Properties Component</div>
}

type CustomInstance = MbcElementInstance & {
  extraAttributes: typeof extraAttributes;
}


function DesignerComponent({ elementInstance }: { elementInstance: MbcElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly placeholder={placeHolder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  )
}