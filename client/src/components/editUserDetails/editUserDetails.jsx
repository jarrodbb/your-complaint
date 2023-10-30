import { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { validateEmail, checkPassword } from "../../utils/helpers";
import { UPDATE_USER } from "../../utils/mutations";

export default function EditUserDetails({
  userID,
  username,
  email,
  handleClose,
}) {
  const [userEmail, setUserEmail] = useState(email);
  const [userName, setUserName] = useState(username);
  const [userPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleTextChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(userEmail)) {
      setErrorMessage("Email is invalid, please try again");
      return;
    }
    if (userPassword) {
      if (!userPassword) {
        setErrorMessage("Password is invalid, please try again");
        return;
      }
      try {
        const { data } = await updateUser({
          variables: {
            username: userName,
            email: userEmail,
            password: userPassword,
          },
        });

        Auth.login(data.updateUser.token);
      } catch (err) {
        console.error(err);
      }
    }
    if (!validateEmail(userEmail) && userPassword) {
      if (!userPassword) {
        setErrorMessage("Password and email are invalid, please try again");
        return;
      }
    }

    try {
      const { data } = await updateUser({
        variables: {
          username: userName,
          email: userEmail,
        },
      });

      Auth.login(data.updateUser.token);
    } catch (err) {
      console.error(err);
    }

    setErrorMessage("");
  };

  return (
    <div className="user-form">
      <h2>{userName}, update your profile? </h2>
      <form onSubmit={handleSubmit}>
        {/* Textarea for entering the complaint text */}
        <textarea
          placeholder="Username"
          value={userName}
          onChange={handleTextChange}
          type="text"
          label="text"
          name="username"
          required
        />
        <textarea
          placeholder="Email"
          value={userEmail}
          onChange={handleEmailChange}
          type="email"
          name="email"
          label="email"
          required
        />
        <textarea
          placeholder="update password?"
          value={userPassword}
          onChange={handlePasswordChange}
          type="password"
          name="password"
          label="password"
        />

        {/* Submission button */}
        <button type="submit">Submit Update</button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text p-2 error-display mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
