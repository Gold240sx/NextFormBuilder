import React from "react"
import { Button } from "../ui/button"
import { MdOutlinePublish } from "react-icons/md"

const PublishFormButton = () => {
	return (
		<Button
			className="gap-2  text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600"
			variant={"outline"}>
			<MdOutlinePublish className="h-4 w-4" />
			Publish
		</Button>
	)
}

export default PublishFormButton
