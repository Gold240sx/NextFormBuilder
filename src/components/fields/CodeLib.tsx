import React from "react"
import { FormElementInstance } from "../FormElements"
import { TextFieldElementsCode } from "./CodeLibElements/TextFieldElementsCode"

export type ElementItem = Record<string, string>
export type ElementLibrary = {
	[ElementName: string]: ElementItem[]
}

export const elementLibrary: ElementLibrary = {
	TextField: [
		{ label: "Basic", value: "basic" },
		{ label: "Outlined", value: "outlined" },
	],
	Dropdown: [
		{ label: "Basic", value: "basic" },
		{ label: "absolute", value: "absolute" },
	],
}

type CodeLibProps = {
	element: FormElementInstance
	dynamicCode: boolean
}

export const CodeLib = ({ element, dynamicCode }: CodeLibProps) => {
	const elementType = element.type
	switch (elementType) {
		case "TextField":
			return {
				code: TextFieldElementsCode({ element, dynamicCode })?.code,
				imports: TextFieldElementsCode({ element, dynamicCode })
					?.imports,
			}
		default:
			return
	}
}
