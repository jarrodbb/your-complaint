import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

export default function EditCommentForm({commentDescription}) {
const [descriptionText, setDescriptionText] = useState(commentDescription)

    console.log("des " + descriptionText)

return (
    <h2>testy</h2>
)

}