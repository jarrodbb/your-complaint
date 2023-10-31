import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
// import mutation to add comment
import { CREATE_COMMENT } from "../../utils/mutations";

import PropTypes from "prop-types";
import Auth from "../../utils/auth";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//Form to add comment
const CommentForm = ({ closeModal, singleComplaint }) => {
  console.log(singleComplaint);
  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const [author, setAuthor] = useState("");

  //UseEffect to get username of logged in user
  useEffect(() => {
    const userInfo = Auth.getProfile().data.username;

    setAuthor(userInfo);
  }, []);

  const [complaintText, setComplaintText] = useState("");

  

  const handleTextChange = (e) => {
    setComplaintText(e.target.value);
  };

  //Handle submit. Pass ComplaintID, author and description 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          complaintID: singleComplaint._id,
          author: author,
          description: complaintText,
        },
      });
      setAuthor("");

      setComplaintText("");
    } catch (err) {
      console.error(err);
    }

    closeModal();
  };

  return (
    <div className="complaint-form">
      <div className="modal-content">
        <IconButton className="close-button" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          {/* Textarea for entering the complaint text */}
          <textarea
            placeholder="Type your comment here"
            value={complaintText}
            onChange={handleTextChange}
            required
          />

          {/* Submission button */}
          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation to ensure that props are passed correctly
CommentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// Export 'CommentForm' component to make it available for use in other parts of app
export default CommentForm;
