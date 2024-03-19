import React from "react"
import { Button } from "../ui/button"
import { HiSaveAs } from "react-icons/hi"

const SaveFormButton = () => {
	return (
		<Button className="gap-2 bg-primary text-secondary" variant={"outline"}>
			<HiSaveAs className="h-4 w-4" />
			Save
		</Button>
	)
}

export default SaveFormButton
