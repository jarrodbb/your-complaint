import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_COMPLAINT } from "../../utils/queries";

function SingleComplaint() {
  const { complaintID } = useParams();
  console.log(complaintID);

  const { loading, data } = useQuery(GET_COMPLAINT, {
    variables: { complaintID: complaintID },
  });

  const singleComplaint = data?.complaint || [];

  console.log(singleComplaint);

  return <h1>test</h1>;
}

export default SingleComplaint;
