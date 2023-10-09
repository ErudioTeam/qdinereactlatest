import React, { useState } from "react";
import "./UserLogin.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    // You can set this to 0 as a placeholder or generate it as needed
    Email: "", // Replace with the desired roleId
    Password: "",
  });

  const userResData = {
    data: {
      tokens: {
        AccessToken: {
          Token: "$2a$10$QcgiGTPmdcjI.RuqABVTvehQBTtoro0Ehxu46zu.7nsSanQFuroti",
          CreatedAt: "282812-09-28 12:49:37",
          ExpiredAt: "292912-09-29 12:49:37",
        },
        RefreshToken: {
          Token: "$2a$10$6xhwZW2cWZCU7TLi7Atkpe0XAuJW1Oe.fKkEhrtA2LyXPc0rjfikW",
          CreatedAt: "2023-09-28 12:49:37",
          ExpiredAt: "2023-10-01 12:49:37",
        },
      },
      userInfo: {
        id: 16,
        roleId: 104,
        firstName: "Nikil",
        middleName: "Msc",
        lastName: "US",
        mobile: "9144444",
        email: "niki@gmail.com",
        Password: "4f7eff7d658c3b2217b9f0eb974fe9b4",
        registeredAt: "0001-01-01T00:00:00Z",
        intro: "Director",
        profile: "User",
        role: {
          id: 0,
          title: "",
          slug: "",
          description: "",
          active: false,
          createdAt: "0001-01-01T00:00:00Z",
          content: "",
        },
      },
    },
    message: "Welcome!",
  };
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Create Entry..",
  });
  const { data, message } = userResData;

  // {
  //     "data": {
  //         "tokens": {
  //             "AccessToken": {
  //                 "Token": "$2a$10$QcgiGTPmdcjI.RuqABVTvehQBTtoro0Ehxu46zu.7nsSanQFuroti",
  //                 "CreatedAt": "282812-09-28 12:49:37",
  //                 "ExpiredAt": "292912-09-29 12:49:37"
  //             },
  //             "RefreshToken": {
  //                 "Token": "$2a$10$6xhwZW2cWZCU7TLi7Atkpe0XAuJW1Oe.fKkEhrtA2LyXPc0rjfikW",
  //                 "CreatedAt": "2023-09-28 12:49:37",
  //                 "ExpiredAt": "2023-10-01 12:49:37"
  //             }
  //         },
  //         "userInfo": {
  //             "id": 16,
  //             "roleId": 104,
  //             "firstName": "Nikil",
  //             "middleName": "Msc",
  //             "lastName": "US",
  //             "mobile": "9144444",
  //             "email": "niki@gmail.com",
  //             "Password": "4f7eff7d658c3b2217b9f0eb974fe9b4",
  //             "registeredAt": "0001-01-01T00:00:00Z",
  //             "intro": "Director",
  //             "profile": "User",
  //             "role": {
  //                 "id": 0,
  //                 "title": "",
  //                 "slug": "",
  //                 "description": "",
  //                 "active": false,
  //                 "createdAt": "0001-01-01T00:00:00Z",
  //                 "content": ""
  //             }
  //         }
  //     },
  //     "message": "Welcome!"
  // }

  //   const handleFormSubmit = (e) => {
  //     e.preventDefault();

  //     // Perform the POST request to create a new user
  //     axios
  //       .post("http://103.186.185.127:8082/users", userData)
  //       .then((response) => {
  //         console.log("New user created:", response.data.message);

  //         setUserStatus({ ...userStatus, Message: response.data.message });
  //         // Handle success (e.g., display a success message or redirect)
  //       })
  //       .catch((error) => {
  //         console.error("Error creating user:", error);
  //         setUserStatus({ ...userStatus, Message: error });
  //         // Handle errors (e.g., display an error message)
  //       });
  //   };

  const handleNextStep = () => {
    if (step === 1 && email.trim() !== "") {
      // Check if the email exists in your database or perform any other validation here.
      // For simplicity, we'll just move to the next step.
      setStep(2);
    }
  };

  const handleLoginCheck = () => {
    console.log(
      "Check the login , Email : " + email + "  Password :" + password
    );

    //  e.preventDefault();
    setUserData({ ...userData, Email: email });
    setUserData({ ...userData, Password: password });

    console.log(userData);
    // Perform the POST request to create a new user
    axios
      .post("http://103.186.185.127:8082/userlogin", userData)
      .then((response) => {
        console.log("Login Token :", response.data);

        const { data, message } = response;
        setUserStatus({ ...userStatus, Message: response.data.message });

        if ((response.data.message = "Welcome")) {
          console.log("Navigate to welcome page");
          alert("Login Successful");
          navigate("/home");
          return (
            <div>
              <h1>{message}</h1>
              <h2>User Information:</h2>
              <ul>
                <li>ID: {data.userInfo.id}</li>
                <li>First Name: {data.userInfo.firstName}</li>
                <li>Middle Name: {data.userInfo.middleName}</li>
                <li>Last Name: {data.userInfo.lastName}</li>
                <li>Email: {data.userInfo.email}</li>
                <li>Mobile: {data.userInfo.mobile}</li>
                <li>Intro: {data.userInfo.intro}</li>
                <li>Profile: {data.userInfo.profile}</li>
              </ul>
            </div>
          );
        } else {
          console.log("User Login failed");
          alert("Login failed");
        }

        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setUserStatus({ ...userStatus, Message: error });
        // Handle errors (e.g., display an error message)
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setUserData({ ...userData, Email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setUserData({ ...userData, Password: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        {step === 1 ? (
          <>
            <h1>What's your email?</h1>
            <p>We'll check if you have an account</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleNextStep}>Next</button>
          </>
        ) : (
          <>
            <h1>Email</h1>
            <p>{email}</p>
            {/* Add password input and login button for the second step */}
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <button onClick={handleLoginCheck}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
