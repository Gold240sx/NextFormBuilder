import React from "react"
import { Button } from "../ui/button"
import { MdPreview } from "react-icons/md"

const PreviewDialogButton = () => {
	return (
		<Button className="gap-2 bg-primary text-secondary" variant={"outline"}>
			<MdPreview className="h-6 w-6" />
			Preview
		</Button>
	)
}

export default PreviewDialogButton
