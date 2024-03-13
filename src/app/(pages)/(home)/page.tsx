// import { UserButton } from "@clerk/nextjs"
import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps"
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps"
import Header from "@/components/Header"

export default function Home() {
	const canInitSupabaseClient = () => {
		// This function is just for the interactive tutorial.
		// Feel free to remove it once you have Supabase connected.
		try {
			createClient()
			return true
		} catch (e) {
			return false
		}
	}

	const isSupabaseConnected = canInitSupabaseClient()

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
				<DeployButton />
				{isSupabaseConnected && <AuthButton />}
			</div>

			<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
				<Header />
				<main className="flex-1 flex flex-col gap-6">
					<h2 className="font-bold text-4xl mb-4">Next steps</h2>
					{isSupabaseConnected ? (
						<SignUpUserSteps />
					) : (
						<ConnectSupabaseSteps />
					)}
				</main>
			</div>
		</main>
	)
}
