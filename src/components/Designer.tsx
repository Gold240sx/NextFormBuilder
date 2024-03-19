"use client"
import React, { useState } from "react"
import DesignerSidebar from "@/components/DesignerSidebar"
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { FormElementInstance, ElementsType, FormElements } from "./FormElements"
import useDesigner from "@/app/hooks/useDesigner"
import IdGenerator from "@/lib/idGenerator"

const Designer = () => {
	const { elements, addElement } = useDesigner()

	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		},
	})

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event
			if (!active || !over) return

			const isDesignerButtonElement =
				active.data.current?.isDesignerButtonElement
			if (isDesignerButtonElement) return
			const type = active.data?.current?.type
			const newElement = FormElements[type as ElementsType].constructs(
				IdGenerator()
			)
			addElement(0, newElement as FormElementInstance)
			return
		},
	})

	return (
		<div className="flex w-full h-full">
			<div className="p-4 w-full">
				<div
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
						droppable.isOver && "ring-2 ring-primary/20"
					)}>
					{!droppable.isOver && elements.length === 0 && (
						<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
							Drop Here
						</p>
					)}
					{droppable.isOver && (
						<p className="text-xs text-muted-foreground">
							Release to add element
						</p>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col gap-2 text-background w-full p-4">
							{elements.map((element) => (
								<DesignerElementWrapper
									key={element.id}
									element={element}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	)
}

export default Designer

const DesignerElementWrapper = ({
	element,
}: {
	element: FormElementInstance
}) => {
	const DesignerElement = FormElements[element.type].designerComponent
	return <DesignerElement elementInstance={element} />
}
