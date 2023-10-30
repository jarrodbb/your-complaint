import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../utils/mutations";
// import { gql } from "@apollo/client";
import PropTypes from "prop-types";
import Auth from "../../utils/auth";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// const UPLOAD_IMAGE = gql`
//   mutation uploadImage($file: Upload!) {
//     uploadImage(file: $file) {
//       filename
//       mimetype
//       encoding
//     }
//   }
// `;

const CommentForm = ({ closeModal, singleComplaint }) => {
  console.log(singleComplaint);
  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const [author, setAuthor] = useState("");

  useEffect(() => {
    const userInfo = Auth.getProfile().data.username;

    setAuthor(userInfo);
  }, []);

  const [complaintText, setComplaintText] = useState("");

  const [image, setImage] = useState(
    "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
  );

  const handleTextChange = (e) => {
    setComplaintText(e.target.value);
  };

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
