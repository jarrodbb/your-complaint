import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
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
  return <Button onClick={handleClickDelete}>Confirm</Button>;
}
