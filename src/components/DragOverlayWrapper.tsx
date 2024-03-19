import { useDndMonitor, DragOverlay, Active } from "@dnd-kit/core"
import React, { useState } from "react"
import { SidebarButtonDragOverlay } from "./SidebarButtonElement"
import { FormElements, ElementsType } from "./FormElements"

const DragOverlayWrapper = () => {
	const [draggedItem, setDraggedItem] = useState<Active | null>(null)

	useDndMonitor({
		onDragStart: (event) => {
			setDraggedItem(event.active)
		},
		onDragCancel: (event) => {
			setDraggedItem(null)
		},
		onDragEnd: (event) => {
			setDraggedItem(null)
		},
	})
	if (!draggedItem) return null

	let node = <div>No Drag Overlay</div>

	const isSidebarButtonElement =
		draggedItem.data?.current?.isDraggableButtonElement

	if (isSidebarButtonElement) {
		const type = draggedItem.data?.current?.type as ElementsType
		node = <SidebarButtonDragOverlay formElement={FormElements[type]} />
	}

	return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
