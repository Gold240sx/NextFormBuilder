"use client"
import Reac, { useEffect } from "react"

const ErrorPage = ({ error }: { error: Error }) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="flex w-full h-full  justify-center items-center bg-red-500 mx-auto">
			Error Page
		</div>
	)
}

export default ErrorPage
