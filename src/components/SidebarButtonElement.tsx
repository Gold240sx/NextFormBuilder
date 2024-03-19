import React from "react"
import { FormElement } from "./FormElements"
import { Button } from "./ui/button"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

const SidebarButtonElement = ({
	formElement,
}: {
	formElement: FormElement
}) => {
	const { label, icon: Icon } = formElement.designerButtonElement
	const draggable = useDraggable({
		id: `designer-button-${formElement.type}`,
		data: {
			type: formElement.type,
			isDraggableButtonElement: true,
		},
	})

	return (
		<Button
			className={cn(
				"flex group flex-col gap-2 h-[120px] w-[120px] cursor-grab bg-primary-foreground",
				draggable.isDragging && "ring-2 ring-primary"
			)}
			ref={draggable.setNodeRef}
			variant={"outline"}
			{...draggable.attributes}
			{...draggable.listeners}>
			{/* @ts-expect-error: Icon import expects wierd type */}
			<Icon className="h-8 w-8 text-primary cursor-grab group-hover:text-primary" />
			<p className="text-xs group-hover:text-primary">{label}</p>
		</Button>
	)
}

export const SidebarButtonDragOverlay = ({
	formElement,
}: {
	formElement: FormElement
}) => {
	const { label, icon: Icon } = formElement.designerButtonElement
	const draggable = useDraggable({
		id: `designer-button-${formElement.type}`,
		data: {
			type: formElement.type,
			isDraggableButtonElement: true,
		},
	})

	return (
		<Button
			className="flex group flex-col gap-2 h-[120px] w-[120px] cursor-grab bg-primary-foreground"
			variant={"outline"}>
			{/* @ts-expect-error: Icon import expects wierd type */}
			<Icon className="h-8 w-8 text-primary cursor-grab group-hover:text-primary" />
			<p className="text-xs group-hover:text-primary">{label}</p>
		</Button>
	)
}

export default SidebarButtonElement
