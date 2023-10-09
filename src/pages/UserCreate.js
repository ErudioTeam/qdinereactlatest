// src/Create.js
import React, { useState } from "react";
import axios from "axios";
import "./UserCreate.css";

export  const UserCreate = () => {
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Create Entry..",
  });
  const [userData, setUserData] = useState({
    // You can set this to 0 as a placeholder or generate it as needed
    roleId: 300, // Replace with the desired roleId
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    email: "",
    Password: "",
    registeredAt: "", // You may want to set this automatically or provide a default value
    lastLogin: "", // You may want to set this automatically or provide a default value
    intro: "",
    profile: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the POST request to create a new user
    axios
      .post("http://103.186.185.127:8082/users", userData)
      .then((response) => {
        console.log("New user created:", response.data.message);

        setUserStatus({ ...userStatus, Message: response.data.message });
        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setUserStatus({ ...userStatus, Message: error });
        // Handle errors (e.g., display an error message)
      });
  };

  return (
    <div className="create">
      <h2>Create User</h2>
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
        <button type="submit">Create User</button>
      </form>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="status">Status:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={userStatus.Message}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

//export default UserCreate;
