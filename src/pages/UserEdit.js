// src/Edit.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserEdit.css";

export const UserEdit = () => {
  const { id } = useParams();
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Update Entry..",
  });
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    // Send a POST request to create a new user
    axios
      .put(`http://103.186.185.127:8082/users/"${id}`, userData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        // Clear the form after successful creation
        // setNewUser({
        //   roleId: 103,
        //   firstName: "",
        //   middleName: "",
        //   lastName: "",
        //   mobile: "",
        //   email: "",
        //   Password: "",
        //   intro: "",
        //   profile: "User",
        // });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the PUT request to update user data
    axios
      .put(`http://103.186.185.127:8082/users/${id}`, userData) // Replace '3' with the desired user ID
      .then((response) => {
        console.log("User data updated:", response.data);
        setUserStatus({ ...userData, Message: response.data.message });
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

  // Implement the form for editing user data here

  return (
    <div className="edit">
      <h2>Edit User </h2>
      <form onSubmit={handleFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="firstName">First Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="middleName">Middle Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={userData.middleName}
                  onChange={(e) =>
                    setUserData({ ...userData, middleName: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastName">Last Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="mobile">Mobile:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={userData.mobile}
                  onChange={(e) =>
                    setUserData({ ...userData, mobile: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Password">Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  value={userData.Password}
                  onChange={(e) =>
                    setUserData({ ...userData, Password: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="registeredAt">Registered At:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="registeredAt"
                  name="registeredAt"
                  value={userData.registeredAt}
                  onChange={(e) =>
                    setUserData({ ...userData, registeredAt: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastLogin">Last Login:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastLogin"
                  name="lastLogin"
                  value={userData.lastLogin}
                  onChange={(e) =>
                    setUserData({ ...userData, lastLogin: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="intro">Intro:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="intro"
                  name="intro"
                  value={userData.intro}
                  onChange={(e) =>
                    setUserData({ ...userData, intro: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="profile">Profile:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="profile"
                  name="profile"
                  value={userData.profile}
                  onChange={(e) =>
                    setUserData({ ...userData, profile: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Add more input fields for other user data as needed */}
        <button type="submit">Save Changes</button>
      </form>

      <div>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={userStatus.Message}
        />
      </div>
    </div>
  );
};
