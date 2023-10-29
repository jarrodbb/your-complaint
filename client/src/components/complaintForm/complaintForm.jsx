import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
import { CREATE_COMPLAINT } from "../../utils/mutations";
import PropTypes from "prop-types";
import { GET_COMPLAINTS } from "../../utils/queries";
import Auth from "../../utils/auth";

// Define 'ComplaintForm' component, responsible for capturing and submitting user complaints
const ComplaintForm = ({ closeModal }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userInfo = Auth.getProfile().data.username;

    setUsername(userInfo);
  }, []);
  // Use 'useMutation' hook to execute the 'CREATE_COMPLAINT' mutation from Apollo Client
  const [addComplaint, { error }] = useMutation(CREATE_COMPLAINT);

  // Define React state variables to manage form input fields and related data
  const [category, setCategory] = useState("General");
  const [complaintText, setComplaintText] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const maxSize = 1024; // Maximum image size in KB

  console.log(selectedDate);

  if (selectedDate) {
    const test = selectedDate.toString();
    const myArray = test.split(" ");
    console.log(myArray);
    let elementstodelete = 6;
    let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
    console.log(k);
    const formattedDate = k.join(" ");
    console.log(formattedDate);
  }

  // console.log(new Date(selectedDate));
  console.log(Date.now());

  // Event handler to update the 'category' state based on user selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  // Event handler to validate and update the 'complaintText' state as the user types
  const handleTextChange = (e) => {
    // Retrieve the input type, input value, and validate user input
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

  // Event handler to validate and update the 'title' state as the user types
  const handleTitleChange = (e) => {
    // Retrieve the input type, input value, and validate user input
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputValue === "") {
      return setErrorMessage("Please include a Title"), setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDate) {
      const test = selectedDate.toString();
      const myArray = test.split(" ");
      console.log(myArray);
      let elementstodelete = 6;
      let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
      console.log(k);
      const formattedDate = k.join(" ");
      console.log(formattedDate);

      try {
        // Execute 'CREATE_COMPLAINT' mutation and send complaint data to the server
        const { data } = await addComplaint({
          variables: {
            title: title,
            description: complaintText,
            category: category,
            username: username,
            image: image,
            date: formattedDate,
          },
          // Update complaint list by refetching it from the server
          refetchQueries: [{ query: GET_COMPLAINTS }],
        });

        // Clear form fields and states upon successful submission
        setCategory("General");
        setImage("");
        setComplaintText("");
        setSelectedDate(null);
        setTitle("");
      } catch (err) {
        console.error(err);
      }
    }

    if (!selectedDate) {
      try {
        // Execute 'CREATE_COMPLAINT' mutation and send complaint data to the server
        const { data } = await addComplaint({
          variables: {
            title: title,
            description: complaintText,
            category: category,
            username: username,
            image: image,
          },
          // Update complaint list by refetching it from the server
          refetchQueries: [{ query: GET_COMPLAINTS }],
        });

        // Clear form fields and states upon successful submission
        setCategory("General");
        setImage("");
        setComplaintText("");
        setSelectedDate(null);
        setTitle("");
      } catch (err) {
        console.error(err);
      }
    }

    // Close the modal after submission
    closeModal();
  };

  // Function to handle image selection and validate image size
  function convertToBase64(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const fileSize = Math.round(file.size / 1024); // File size in KB

          if (fileSize > maxSize) {
            setErrorMessage(
              "Image size is too large. Please choose a smaller image."
            );
            setImage(null); // Clear the image
          } else {
            setImage(reader.result); // Image is within size limits
          }
        };
      };

      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  }

  // Render the complaint form as a part of the user interface
  return (
    <div className="complaint-form">
      <h2>Make a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            {/* Define available complaint categories */}
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
        {/* Input field for the complaint title */}
        <textarea
          placeholder="Title"
          value={title}
          name="title"
          type="text"
          required
          onChange={handleTitleChange}
        />
        {/* Text area for entering the complaint description */}
        <textarea
          placeholder="Type your complaint here"
          value={complaintText}
          name="description"
          type="text"
          required
          onChange={handleTextChange}
        />
        {/* DatePicker component for selecting the complaint date */}
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
            {/* Input for uploading an image */}
            Upload an image <br />
            <input accept="image/*" type="file" onChange={convertToBase64} />
            {/* Display the selected image */}
            {image ? (
              <img width={300} height={300} src={image} alt="Uploaded" />
            ) : null}
          </div>
        </div>
        {/* Button to submit the complaint */}
        <button type="submit">Submit Complaint</button>
      </form>
      {/* Display error message if there is any */}
      {errorMessage && (
        <div>
          <p className="error-text p-2 error-display mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

// PropTypes validation to ensure 'closeModal' prop is passed correctly
ComplaintForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// Export 'ComplaintForm' component for use in other parts of the application
export default ComplaintForm;
