import exp from "constants"
import React, { FC, ReactElement } from "react"
import { TextFieldFormElement } from "./fields/TextField"

export type ElementsType = "TextField"
export type SubmitFunction = (key: string, value: string) => void
export type FormElement = {
	type: ElementsType

	construct: (id: string) => FormElementInstance

	designerButtonElement: {
		icon: ReactElement | SetConstructor
		label: string
		extraAttributes: Record<string, any>
	}
	designerComponent: FC<{ elementInstance: FormElementInstance }>
	formComponent: FC<{
		elementInstance: FormElementInstance
		submitValue?: SubmitFunction
		isInvalid?: boolean
		defaultValue?: string
	}>
	propertiesComponent: FC<{ elementInstance: FormElementInstance }>

	validate: (
		formElement: FormElementInstance,
		currentValue: string
	) => boolean
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
