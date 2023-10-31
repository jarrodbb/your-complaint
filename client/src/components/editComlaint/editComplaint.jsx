import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
//Import datepicker incase user needs to change date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_COMPLAINT } from "../../utils/mutations";

export default function EditComplaint({
  complaintId,
  title,
  category,

  date,
  description,
  handleClose,
}) {
  //Set states from porps to fill default values in form
  const [complaintTitle, setTitle] = useState(title);
  const [complaintCategory, setCategory] = useState(category);
  const [complaintText, setComplaintText] = useState(description);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [updateComplaint, { error }] = useMutation(UPDATE_COMPLAINT);

  //Handle chnage in form. Validation included to ensure user provides a description
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  //Validation included. Title required
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
    //Handle submit if date note included. Previous value for date passes as variable
    if (selectedDate === null) {
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
      //If date selected. Date is first formatted and then passed as variable
      const test = selectedDate.toString();
      const myArray = test.split(" ");
      
      let elementstodelete = 6;
      let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
      
      const formattedDate = k.join(" ");
      
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
        {/* Textarea for entering the title and complaint text */}
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
        {/* date */}
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
