// import { UserButton } from "@clerk/nextjs"
import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import Header from "@/components/Header"
import { NextPage } from "next"
import { SignedIn, ClerkProvider } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppProps } from "next/app"
import ClerkIsSignedInComponent from "@/components/ClerkIsSignedInComponent"
import { auth, clerkClient } from "@clerk/nextjs"

const Home = async ({ Component, pageProps }: AppProps) => {
	const { userId } = auth()
	if (!userId) {
		return
	}
	const user = await clerkClient.users.getUser(userId)

	return (
		<section className="h-full flex items-center justify-center">
			{/* <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-white">
				<SignedIn>
					<Link href="/dashboard">
						<Button asChild>Go to Dashkoard</Button>
					</Link>
				</SignedIn>
				{/* <DeployButton />
			</div> */}

			<div className="flex flex-col gap-20 max-w-4xl px-3">
				{/* <Header /> */}

				{/* <ClerkIsSignedInComponent> */}
				{user && (
					<Link
						href="/dashboard"
						className="text-primary hover:text-teal-400">
						Go to Dashboard
						<Button asChild>Go to Dashboard</Button>
					</Link>
				)}
				{!user && (
					<Link
						href="/signIn"
						className="text-primary hover:text-teal-400">
						Sign In / Register
						<Button asChild>Sign In / Register</Button>
					</Link>
				)}
				{/* </ClerkIsSignedInComponent> */}
			</div>
		</section>
	)
}

export default Home
