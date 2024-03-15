import { Suspense } from "react"
import StatsCards from "./CardStatsWrapper"
import CardStatsWrapper from "./CardStatsWrapper"
import { NextPage } from "next"
// import StatsCard from "@/components/StatsCard"
import { Separator } from "@/components/ui/separator"
import CreateFormButton from "@/components/CreateFormButton"
import { FormCardSkeleton, FormCards } from "@/components/FormCards"

const Dashboard: NextPage = async () => {
	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<div className="w-full">
				<div className="py-1 font-bold dark:bg-purple-950 bg-purple-400 text-center">
					This is a protected page that you can only see as an
					authenticated user
				</div>
			</div>

			<div className="container pt-4 pb-10">
				<Suspense fallback={<StatsCards />}>
					<CardStatsWrapper />
				</Suspense>
				<Separator className="my-6" />
				<h2 className="4xl font-bold col-span-2">Your Forms</h2>
				<Separator className="my-6" />
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<CreateFormButton />
					<Suspense
						fallback={[1, 2, 3, 4].map((el) => (
							<FormCardSkeleton key={el} />
						))}>
						<FormCards />
					</Suspense>
				</div>
			</div>

			<footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
				<p>
					Powered by{" "}
					<a
						href="https://clerk.com/docs/quickstarts/nextjs"
						target="_blank"
						className="font-bold hover:underline"
						rel="noreferrer">
						Clerk
					</a>
				</p>
			</footer>
		</div>
	)
}

export default Dashboard
