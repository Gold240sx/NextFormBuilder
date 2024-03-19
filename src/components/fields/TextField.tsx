"use client"
import React from "react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { MdTextFields } from "react-icons/md"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
const type: ElementsType = "TextField"

const extraAttributes = {
	label: "Text field",
	helperText: "Helper text",
	required: false,
	placeHolder: "Value here...",
	variant: "basic",
}

type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({
	elementInstance,
}: {
	elementInstance: FormElementInstance
}) => {
	const element = elementInstance as CustomInstance
	const { label, required, placeHolder, helperText } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full text-white">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Input readOnly disabled placeholder={placeHolder} />
			{helperText && (
				<p className="text-muted-foreground text-[0.8rem]">
					{helperText}
				</p>
			)}
		</div>
	)
}

export const TextFieldFormElement: FormElement = {
	type,
	constructs: (id: string) => {
		return {
			id,
			type,
			extraAttributes: {
				label: "Text Field",
				helperText: "Enter your text here",
				required: false,
				placeholder: "Value here...",
				variant: "basic",
			},
		}
	},

	designerButtonElement: {
		// @ts-expect-error: Icon import expects wierd type
		icon: MdTextFields,
		label: "Text Field",
	},
	designerComponent: DesignerComponent,
	formComponent: () => {
		return <div className="text-white">Form</div>
	},
	propertiesComponent: () => {
		return <div className="text-white">Properties</div>
	},
}
