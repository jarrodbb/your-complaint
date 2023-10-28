import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { DELETE_USER } from "../../utils/mutations";

export default function DeleteUser({ userID, username }) {
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  console.log(username);
  const handleClickDeleteButton = async (e) => {
    try {
      const { data } = await deleteUser({
        variables: {
          userID,
          username,
        },
      });
      Auth.logout();
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={handleClickDeleteButton}>Confirm</Button>;
}
