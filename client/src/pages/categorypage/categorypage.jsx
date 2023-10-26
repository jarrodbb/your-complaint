import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_COMPLAINTS_BY_CATEGORY } from "../../utils/queries";

const CategoryPage = () => {
  const { categoryName } = useParams();
  console.log(categoryName);
  const { loading, error, data } = useQuery(GET_COMPLAINTS_BY_CATEGORY, {
    variables: { category: categoryName }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const complaints = data?.complaintsByCategory ?? [];

  if (complaints.length > 0) {
    return (
      <div>
        <h2>Complaints in {categoryName}</h2>
        <ul>
          {complaints.map(complaint => (
            <li key={complaint._id}>{complaint.title}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>No complaints found in this category.</p>;
  }
};

export default CategoryPage;