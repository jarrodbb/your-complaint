import "../adminDelete/adminDelete.css";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
//Import mutation to delete user
import { DELETE_USER } from "../../utils/mutations";

//userID and username passed as props
//Username required to check for all complaints made by user and delete them
export default function DeleteUser({ userID, username }) {
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  //Function to handle delete after click.
  //User logged out after deletion to end session
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

  return (
    <div className="button-background-delete">
      <Button onClick={handleClickDeleteButton}>Confirm</Button>
    </div>
  );
}
