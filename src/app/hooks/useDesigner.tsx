"use client"
import React, { useContext } from "react"
import { DesignerContext } from "@/app/context/DesignerContext"

const useDesigner = () => {
	const context = useContext(DesignerContext)

	if (!context) {
		throw new Error(
			"useDesigner must be used within a DesignerContextProvider"
		)
	}
	return context
}

export default useDesigner