import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

export default function EditCommentForm({ complaintID, comment, handleClose }) {
  const userName = Auth.getProfile().data.username;
  const [updateComment, { error }] = useMutation(UPDATE_COMMENT);
  const [descriptionText, setDescriptionText] = useState(comment.description);
  console.log("complaintID " + complaintID);
  console.log("commentID " + comment._id);

  console.log("des " + descriptionText);

  const handleTextChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateComment({
        variables: {
          complaintID: complaintID,
          commentID: comment._id,
          description: descriptionText,
          author: userName,
         
        },
      });
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  return (
    <div className="comment-form">
      <h2>Update your comment {userName}</h2>
      <form onSubmit={handleSubmit}>
        {/* Textarea for entering the complaint text */}
        <textarea
          placeholder="Type your comment here"
          value={descriptionText}
          onChange={handleTextChange}
        />

        {/* Submission button */}
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}
