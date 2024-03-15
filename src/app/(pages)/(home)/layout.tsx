import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
			<Navbar />
			<main className="flex w-full flex-grow"> {children}</main>
		</div>
	)
}

export default HomeLayout
