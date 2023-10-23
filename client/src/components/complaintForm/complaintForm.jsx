import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// Define React functional component called 'ComplaintForm' which takes 'closeModal' as a prop.
const ComplaintForm = ({ closemodal }) => {

  // 'category' state variable tracks the selected category for the complaint, with 'General' as the initial value.
  const [category, setCategory] = useState("General");

  // 'complaintText' state variable stores the text of the complaint.
  const [complaintText, setComplaintText] = useState("");

  // 'image' state variable is used to store an uploaded image (initially set to 'null').
  const [image, setImage] = useState(null);

  // 'handleCategoryChange' function updates the 'category' state when the user selects a category.
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // 'handleTextChange' function updates the 'complaintText' state as the user types their complaint.
  const handleTextChange = (e) => {
    setComplaintText(e.target.value);
  };

  // 'onDrop' function is called when the user drops an image into the dropzone. It handles the uploaded image files.
  const onDrop = (acceptedFiles) => {

    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  // 'handleSubmit' function is called when the user submits the form.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Close the modal after submission
    closemodal();
  };

  // 'useDropzone' hook provides dropzone functionality.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, video/*",
  });