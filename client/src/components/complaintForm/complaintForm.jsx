import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import base64 from 'react-native-base64'
import { useMutation } from "@apollo/client";

import { CREATE_COMPLAINT } from "../../utils/mutations";

// Import PropTypes validation
import PropTypes from "prop-types";
import { GET_COMPLAINTS } from "../../utils/queries";

// Define React functional component called 'ComplaintForm' which takes 'closeModal' as a prop.
const ComplaintForm = ({ closeModal }) => {
  const [addComplaint, { error }] = useMutation(CREATE_COMPLAINT);

  // 'category' state variable tracks the selected category for the complaint, with 'General' as the initial value.
  const [category, setCategory] = useState("General");
  // 'complaintText' state variable stores the text of the complaint.
  const [complaintText, setComplaintText] = useState("");
  // 'image' state variable is used to store an uploaded image (initially set to 'null').
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  // const [uploadImage] = useMutation(UPLOAD_IMAGE);

  // 'handleCategoryChange' function updates the 'category' state when the user selects a category.
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // 'handleTextChange' function updates the 'complaintText' state as the user types their complaint.
  const handleTextChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputValue === "") {
      return (
        setErrorMessage("Please include a description"), setComplaintText("")
      );
    } else {
      setComplaintText(e.target.value);
    }
  };

  const handleTitleChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputValue === "") {
      return setErrorMessage("Please include a Title"), setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };

  // 'handleSubmit' function is called when the user submits the form.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addComplaint({
        variables: {
          title: title,
          description: complaintText,
          category: category,
          image: image,
          date: selectedDate,
        },
      });
      setCategory("General");
      setImage("");
      setComplaintText("");
      setSelectedDate(null);
      setTitle("");
    } catch (err) {
      console.error(err);
    }

    closeModal();
  };

  function convertToBase64(e) {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  }

  // Render complaint form within a <div> element.
  return (
    <div className="complaint-form">
      <h2>Make a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="General">General</option>
            <option value="Food">Food</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
            <option value="Life">Life</option>
            <option value="Health">Health</option>
            <option value="Technology">Technology</option>
            <option value="Random">Random</option>
          </select>
        </label>
        {/* Textarea for entering the complaint text */}
        <textarea
          placeholder="Title"
          value={title}
          name="title"
          type="text"
          required
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Type your complaint here"
          value={complaintText}
          name="description"
          type="text"
          required
          onChange={handleTextChange}
        />
        <div className="App">
          <DatePicker
            selected={selectedDate}
            placeholderText="When did it happen"
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div className="auth-wrapper">
          <div className="auth-inner" style={{ width: "auto" }}>
            Upload an image <br />
            <input accept="image/*" type="file" onChange={convertToBase64} />
            {image === "" || image == null ? (
              ""
            ) : (
              <img width={100} height={100} src={image} />
            )}
          </div>
        </div>

        {/* Submission button */}
        <button type="submit">Submit Complaint</button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text p-2 error-display mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

// PropTypes validation to ensure that props are passed correctly
ComplaintForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// Export 'ComplaintForm' component to make it available for use in other parts of app
export default ComplaintForm;
