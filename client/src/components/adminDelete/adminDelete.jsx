import "./adminDelete.css";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";

//Import mutation for deleting 
import { ADMIN_DELETE } from "../../utils/mutations";
//Import query to refetch complaints after deleting
import { GET_COMPLAINTS } from "../../utils/queries";

export default function DeleteAdmin({
  complaintID,
  complaintUsername,
  handleClose,
}) {
 //Mutation to delete complaint as Admin User. ComplaintID and username used for mutation
  const [adminDelete, { error }] = useMutation(ADMIN_DELETE, {
    refetchQueries: [GET_COMPLAINTS],
  });
  const handleClickDelete = async (e) => {
    try {
      const { data } = await adminDelete({
        variables: {
          complaintID: complaintID,
          username: complaintUsername,
        },
      });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="button-background-delete">
      {/* on click - handle deletion */}
      <Button onClick={handleClickDelete}>Confirm</Button>
    </div>
  );
}
