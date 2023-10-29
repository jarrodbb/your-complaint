import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_COMPLAINT } from "../../utils/mutations";

export default function EditComplaint({
  complaintId,
  title,
  category,
  username,
  date,
  description,
  handleClose,
}) {
  //   const userName = Auth.getProfile().data.username;
  const [complaintTitle, setTitle] = useState(title);
  const [complaintCategory, setCategory] = useState(category);
  const [complaintText, setComplaintText] = useState(description);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [updateComplaint, { error }] = useMutation(UPDATE_COMPLAINT);

  console.log("id of complaint " + complaintId);

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

  console.log(selectedDate);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate === null) {
      console.log(date);
      try {
        const { data } = await updateComplaint({
          variables: {
            complaintID: complaintId,
            description: complaintText,
            title: complaintTitle,
            category: complaintCategory,
            date: date,
          },
        });
      } catch (err) {
        console.error(err);
      }
      handleClose();
    } else {
      const test = selectedDate.toString();
      const myArray = test.split(" ");
      console.log(myArray);
      let elementstodelete = 6;
      let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
      console.log(k);
      const formattedDate = k.join(" ");
      console.log(formattedDate);
      try {
        const { data } = await updateComplaint({
          variables: {
            complaintID: complaintId,
            description: complaintText,
            title: complaintTitle,
            category: complaintCategory,
            date: formattedDate,
          },
        });
      } catch (err) {
        console.error(err);
      }
      handleClose();
    }
  };

  return (
    <div className="complaint-form">
      <h2>Edit your complaint {username}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={complaintCategory} onChange={handleCategoryChange}>
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
          value={complaintTitle}
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
            placeholderText={date}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <button type="submit">Submit Updated Complaint</button>
      </form>
    </div>
  );
}
