// import { UserButton } from "@clerk/nextjs"
import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import Header from "@/components/Header"
import { NextPage } from "next"

const Home = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
				{/* <DeployButton /> */}
			</div>

			<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
				<Header />
				<main className="flex-1 flex flex-col gap-6">
					<h2 className="font-bold text-4xl mb-4">Next steps</h2>
				</main>
			</div>
		</main>
	)
}

export default Home
