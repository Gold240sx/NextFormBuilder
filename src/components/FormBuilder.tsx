"use client"
import { Form } from "@prisma/client"
import PreviewDialogButton from "@/components/buttons/PreviewDialogButton"
import PublishFormButton from "@/components/buttons/PublishFormButton"
import SaveFormButton from "@/components/buttons/SaveFormButton"
import DragOverlayWrapper from "@/components/DragOverlayWrapper"
import Designer from "@/components/Designer"
import React, { useLayoutEffect, useState } from "react"
import {
	DndContext,
	MouseSensor,
	useSensor,
	useSensors,
	TouchSensor,
} from "@dnd-kit/core"
import ViewCodeButton from "./buttons/ViewCodeButton"
import { BiCodeAlt } from "react-icons/bi"
import CodePortal from "./codePortal"
import { useToast } from "@/components/ui/use-toast"
import useDesigner from "@/app/hooks/useDesigner"
import CodePreviewer from "./CodePreviewer"
import { TextFieldElementsCode } from "./fields/CodeLibElements/TextFieldElementsCode"
import { CodeLib } from "./fields/CodeLib"
import { FormElementInstance } from "./FormElements"
import { set } from "date-fns"
import { useForm } from "react-hook-form"

const FormBuilder = ({ form }: { form: Form }) => {
	const [showPortal, setShowPortal] = useState(false)
	const { elements } = useDesigner()
	const [formattedCode, setFormattedCode] = useState<string>("")
	const [dynamicCode, setDynamicCode] = useState(false)
	const [dynamicImports, setDynamicImports] = useState<string[]>([])

	const { toast } = useToast()

	useLayoutEffect(() => {
		setFormattedCode(
			elements
				?.map((element: FormElementInstance) => {
					return CodeLib({ element, dynamicCode })?.code
				})
				.join("\n")
		)

		setDynamicImports(
			// unique values only
			Array.from(
				new Set(
					elements
						?.flatMap((element: FormElementInstance) => {
							return CodeLib({ element, dynamicCode })?.imports
						})
						.filter(Boolean) as string[]
				)
			)
		)
	}, [elements, formattedCode, dynamicCode])

	const handleModal = () => {
		setShowPortal(!showPortal)
	}

	const copyCode = () => {
		navigator.clipboard.writeText(formattedCode)
		toast({
			title: "Code Copied Successfully!",
			description: `Copied code: ${formattedCode}`,
		})
	}

	const copyImports = () => {
		// no repeated values
		const noDupes = dynamicImports.filter(
			(value, index, self) => self.indexOf(value) === index
		)
		const dynImpString =
			"const { " + noDupes.join(", \n") + " } = item.props"
		navigator.clipboard.writeText(dynImpString)
		toast({
			title: "Code Copied Successfully!",
			description: `Copied code: ${dynImpString}`,
		})
	}

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10, // 10px tolerance to define a drag (less than 10 is a click),
		},
	})

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300, // 250ms hold to define a drag
			tolerance: 5, // 10px tolerance to define a drag (less than 10 is a click)
		},
	})

	const sensors = useSensors(mouseSensor, touchSensor)

	return (
		<DndContext id="builder-dnd" sensors={sensors}>
			<main className="flex flex-col w-full">
				<header className="flex justify-between border-b-2 p-4 gap-3 items-center">
					<h2 className="truncate font-medium">
						<span className="text-muted-foreground mr-2">
							Form:
						</span>
						{form.name}
					</h2>
					<div className="flex items-center gap-2">
						<ViewCodeButton
							handleModal={handleModal}
							formattedCode={formattedCode}
						/>
						<PreviewDialogButton />
						{!form.published && (
							<>
								<SaveFormButton />
								<PublishFormButton />
							</>
						)}
					</div>
				</header>
				<div className="flex flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/QR-bg.svg)] dark:bg-[url(/QR-bg-dark.svg)]">
					<Designer />
				</div>
			</main>
			<DragOverlayWrapper />
			<CodePortal selector="codePortal" show={showPortal}>
				<CodePreviewer
					dynamicCode={dynamicCode}
					dynamicImports={dynamicImports}
					setDynamicCode={setDynamicCode}
					formattedCode={formattedCode}
					handleModal={handleModal}
					showPortal={showPortal}
					copyImports={copyImports}
					copyCode={copyCode}
				/>
			</CodePortal>
		</DndContext>
	)
}

export default FormBuilder
