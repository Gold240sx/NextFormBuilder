"use client"
import React, { useEffect, useState } from "react"
import {
	ElementsType,
	FormElement,
	FormElementInstance,
	SubmitFunction,
} from "../FormElements"
import { MdTextFields } from "react-icons/md"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import useDesigner from "@/app/hooks/useDesigner"
import { cn } from "@/lib/utils"
const type: ElementsType = "TextField"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form"
import { sub } from "date-fns"

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

const FormComponent = ({
	elementInstance,
	submitValue,
	isInvalid,
	defaultValue,
}: {
	elementInstance: FormElementInstance
	submitValue?: SubmitFunction
	isInvalid?: boolean
	defaultValue?: string
}) => {
	const element = elementInstance as CustomInstance
	const [value, setValue] = useState(defaultValue || "")
	const [error, setError] = useState(false)

	useEffect(() => {
		setError(isInvalid === true)
	}, [isInvalid])

	const { label, required, placeHolder, helperText } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full text-white">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Label className={cn(error && "border-red-500")}>
				{error ? "This field is required" : ""}
			</Label>
			<Input
				placeholder={placeHolder}
				onChange={(e) => setValue(e.target.value)}
				onBlur={(e) => {
					if (!submitValue) return
					const valid = TextFieldFormElement.validate(
						element,
						e.target.value
					)
					setError(!valid)
					if (!valid) return
					submitValue(element.id, e.target.value)
				}}
				value={value}
			/>
			{helperText && (
				<p
					className={cn(
						"text-muted-foreground text-[0.8rem]",
						error && "text-red-500"
					)}>
					{helperText}
				</p>
			)}
		</div>
	)
}

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	required: z.boolean().default(false),
	helperText: z.string().max(200),
	placeHolder: z.string().max(50),
})

export const TextFieldFormElement: FormElement = {
	type,
	construct: (id: string) => {
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
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: (
		formElement: FormElementInstance,
		currentValue: string
	): boolean => {
		const element = formElement as CustomInstance
		if (element.extraAttributes.required && !currentValue) {
			return currentValue.length > 0
		}
		return true
	},
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
	elementInstance,
}: {
	elementInstance: FormElementInstance
}) {
	const element = elementInstance as CustomInstance
	const { updateElement } = useDesigner()
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			required: element.extraAttributes.required,
			placeHolder: element.extraAttributes.placeHolder,
			helperText: element.extraAttributes.helperText,
		},
	})
	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	const applyChanges = (values: propertiesFormSchemaType) => {
		const { label, required, placeHolder, helperText } = values

		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				required,
				placeHolder,
				helperText,
			},
		})
	}

	return (
		<Form {...form}>
			<form
				onBlur={() => applyChanges(form.getValues())}
				onSubmit={(e) => e.preventDefault()}
				className="space-y-3">
				<FormField
					control={form.control}
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="focus-visible:ring-sky-500 bg-white dark:bg-black/80"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.currentTarget.blur()
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The label for the text field ( displayed above
								the field)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="placeHolder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placeholder</FormLabel>
							<FormControl>
								<Input
									className="focus-visible:ring-sky-500 bg-white dark:bg-black/80"
									{...field}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.currentTarget.blur()
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The placeholder for the field ( displayed within
								the field)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="helperText"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Helper Text</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="focus-visible:ring-sky-500 bg-white dark:bg-black/80"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.currentTarget.blur()
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The Helper Text for the text field ( displayed
								below the field)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="required"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Required</FormLabel>
								<FormDescription>
									Set if this form field is required
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
