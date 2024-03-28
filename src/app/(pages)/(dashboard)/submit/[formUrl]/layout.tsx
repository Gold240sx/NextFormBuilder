import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"
import CardStatsWrapper from "../../dashboard/CardStatsWrapper"

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="flex w-full flex-grow flex-col mx-auto ">
			<Navbar />
			<section className="flex flex-col flex-grow h-screen container">
				{children}
			</section>
		</main>
	)
}

export default layout
