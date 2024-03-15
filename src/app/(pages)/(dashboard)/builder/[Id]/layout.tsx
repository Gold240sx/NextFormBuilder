import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex w-full flex-grow flex-col mx-auto ">
			<Navbar />
			{children}
		</div>
	)
}

export default layout
