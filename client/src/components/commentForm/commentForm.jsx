import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Auth from "../../utils/auth";

const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const CommentForm = ({ closeModal }) => {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (Auth.loggedIn) {
      const userInfo = Auth.getProfile().authenticatedPerson.username;
      setAuthor(userInfo);
    }

    setAuthor("");
  }, []);

  [complaintText, setComplaintText] = useState("");

  const [image, setImage] = useState(
    "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
  );

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const handleTextChange = (e) => {
    setComplaintText(e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };


};
