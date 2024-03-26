import exp from "constants"
import React, { FC, ReactElement } from "react"
import { TextFieldFormElement } from "./fields/TextField"

export type ElementsType = "TextField"
export type FormElement = {
	type: ElementsType

	construct: (id: string) => FormElementInstance

	designerButtonElement: {
		icon: ReactElement | SetConstructor
		label: string
		extraAttributes: Record<string, any>
	}
	designerComponent: FC<{ elementInstance: FormElementInstance }>
	formComponent: FC<{ elementInstance: FormElementInstance }>
	propertiesComponent: FC<{ elementInstance: FormElementInstance }>
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
