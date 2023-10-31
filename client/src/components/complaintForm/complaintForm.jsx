import React, { useState, useEffect } from "react";
//Import Datepicker from React
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
//Mutation to create Mutation
import { CREATE_COMPLAINT } from "../../utils/mutations";
import PropTypes from "prop-types";
//Query to get all complaints
import { GET_COMPLAINTS } from "../../utils/queries";
//Import Auth
import Auth from "../../utils/auth";
//Import from MUI
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//Create complaint
const ComplaintForm = ({ closeModal }) => {
  const [username, setUsername] = useState("");

  //UseEffect to get username from Auth
  useEffect(() => {
    const userInfo = Auth.getProfile().data.username;
    setUsername(userInfo);
  }, []);

  //Mutation to add complaint
  const [addComplaint, { error }] = useMutation(CREATE_COMPLAINT);

  //Set states
  const [category, setCategory] = useState("General");
  const [complaintText, setComplaintText] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const maxSize = 1024; // Maximum image size in KB

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };
//Validation for description included. Description required
  const handleTextChange = (e) => {
    const { target } = e;
    const inputValue = target.value;
    if (inputValue === "") {
      return (
        setErrorMessage("Please include a description"), setComplaintText("")
      );
    } else {
      setComplaintText(e.target.value);
    }
  };
//validation for title included. Title is required and error message displays if not included
  const handleTitleChange = (e) => {
    const { target } = e;
    const inputValue = target.value;
    if (inputValue === "") {
      return setErrorMessage("Please include a Title"), setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle submit if date is selected. Date not required

    if (selectedDate) {
      //Format date
      const test = selectedDate.toString();
      const myArray = test.split(" ");
      let elementstodelete = 6;
      let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
      const formattedDate = k.join(" ");

      try {
        const { data } = await addComplaint({
          variables: {
            title: title,
            description: complaintText,
            category: category,
            username: username,
            image: image,
            date: formattedDate,
          },
          refetchQueries: [{ query: GET_COMPLAINTS }],
        });
        // reset states
        setCategory("General");
        setImage("");
        setComplaintText("");
        setSelectedDate(null);
        setTitle("");
      } catch (err) {
        console.error(err);
      }
    }
//mutation if no date selected. Date not passed as variable
    if (!selectedDate) {
      try {
        const { data } = await addComplaint({
          variables: {
            title: title,
            description: complaintText,
            category: category,
            username: username,
            image: image,
          },
          refetchQueries: [{ query: GET_COMPLAINTS }],
        });

        setCategory("General");
        setImage("");
        setComplaintText("");
        setSelectedDate(null);
        setTitle("");
      } catch (err) {
        console.error(err);
      }
    }

    handleClose();
  };
//Convert image to base64 string from upload
//validation if image is too large
  function convertToBase64(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const fileSize = Math.round(file.size / 1024); // File size in KB

          if (fileSize > maxSize) {
            setErrorMessage(
              "Image size is too large. Please choose a smaller image."
            );
            setImage(null);
          } else {
            setImage(reader.result);
          }
        };
      };

      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  }

  return (
    <div className="complaint-form">
      <div className="modal-content">
        <IconButton className="close-button" onClick={handleClose}>
          <CloseIcon />
        </IconButton>

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
              {image ? (
                <img width={300} height={300} src={image} alt="Uploaded" />
              ) : null}
            </div>
          </div>
          <button type="submit">Submit Complaint</button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text p-2 error-display mt-2">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

ComplaintForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ComplaintForm;
