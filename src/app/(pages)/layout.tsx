import type { Metadata } from "next"
import React, { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProviders"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000"

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Form Maker",
	description: "Next JS + Prisma form building application",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className="bg-background text-foreground">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem={true}
						disableTransitionOnChange={true}>
						<main className="min-h-screen flex flex-col items-center justify-center">
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
