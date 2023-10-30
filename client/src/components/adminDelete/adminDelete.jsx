import "./adminDelete.css";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";

import { ADMIN_DELETE } from "../../utils/mutations";
import { GET_COMPLAINTS } from "../../utils/queries";

export default function DeleteAdmin({
  complaintID,
  complaintUsername,
  handleClose,
}) {
  console.log(complaintUsername);
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
    <div id="button background-delete">
      <Button onClick={handleClickDelete}>Confirm</Button>
    </div>
  );
}
