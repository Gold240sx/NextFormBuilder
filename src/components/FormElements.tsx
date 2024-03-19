import exp from "constants"
import React, { FC, ReactElement } from "react"
import { TextFieldFormElement } from "./fields/TextField"

export type ElementsType = "TextField"
export type FormElement = {
	type: ElementsType

	constructs: (id: string) => FormElementInstance

	designerButtonElement: {
		icon: ReactElement | SetConstructor
		label: string
	}
	designerComponent: FC<{ elementInstance: FormElementInstance }>
	formComponent: FC
	propertiesComponent: FC
}

type FormElementsType = {
	[key in ElementsType]: FormElement
}

export type FormElementInstance = {
	id: string
	type: ElementsType
	extraAttributes?: Record<string, any>
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
}
