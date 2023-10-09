// src/Delete.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UserDelete = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the PUT request to update user data
    axios
      .delete(`http://103.186.185.127:8082/users/${id}`, userData) // Replace '3' with the desired user ID
      .then((response) => {
        console.log("User data deleted:", response.data);
        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        // Handle errors (e.g., display an error message)
      });
  };

  useEffect(() => {
    // Fetch user data based on the email parameter from the URL
    axios
      .get(`http://103.186.185.127:8082/users/${id}`)
      .then((response) => {
        console.log("API Response:", response.data.data); // Debugging line
        // console.log(Object.keys(response.data.data.id).length);
        console.log(response.data.data.id > 0);
        if (response.data.data && response.data.data.id > 0) {
          setUserData(response.data.data);
          console.log(response.data.data);
          //  console.log(Object.keys(response["data"][0].id).length) // Use the first user found with the matching email
        } else {
          setError("User not found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = (id) => {
    // Send a DELETE request to remove a user
    axios
      .delete(`http://103.186.185.127:8082/users/${id}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        setDeletedUserId(id);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="edit">
      <h2>Delete User Data</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="middleName">Middle Name:</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={userData.middleName}
            onChange={(e) =>
              setUserData({ ...userData, middleName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </div>
        {/* Add more input fields for other user data as needed */}
        <button type="submit">Delete User </button>
      </form>
    </div>
  );
  //   return (
  //     <div className="delete">
  //       <h2>Delete User Data</h2>
  //       {userData.map((user) => (
  //         <div key={user.id}>
  //           <h3>
  //             {user.firstName} {user.lastName}
  //           </h3>
  //           <div>
  //             <button onClick={() => handleDelete(user.id)}>Delete</button>
  //           </div>
  //         </div>
  //       ))}
  //       {deletedUserId && (
  //         <p>User with ID {deletedUserId} has been deleted successfully.</p>
  //       )}
  //     </div>
  //   );
};


