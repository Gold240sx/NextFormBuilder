import React from "react"
import { FormElementInstance } from "../FormElements"
import { TextFieldElementsCode } from "./CodeLibElements/TextFieldElementsCode"

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
