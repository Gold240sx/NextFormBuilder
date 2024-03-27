import React, { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const StatsCard = ({
	title,
	value,
	icon,
	helperText,
	loading,
	className,
}: {
	title: string
	value: string
	helperText: string
	className: string
	loading: boolean
	icon: ReactNode
}) => {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{loading && (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
					)}
					{!loading && value}
				</div>
				<p className="text-xs text-muted-foreground pt-1">
					{helperText}
				</p>
			</CardContent>
		</Card>
	)
}

export default StatsCard
