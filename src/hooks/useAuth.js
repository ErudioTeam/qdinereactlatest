import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import React, { useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  //   const handleLoginCheck = () => {
  //     console.log(
  //       "Check the login , Email : " + email + "  Password :" + password
  //     );

  //     //  e.preventDefault();
  //     setUserData({ ...userData, Email: email });
  //     setUserData({ ...userData, Password: password });

  //     console.log(userData);
  //     // Perform the POST request to create a new user
  //     axios
  //       .post("http://103.186.185.127:8082/userlogin", userData)
  //       .then((response) => {
  //         console.log("Login Token :", response.data);

  //         const { data, message } = response;
  //         setUserStatus({ ...userStatus, Message: response.data.message });

  //         if ((response.data.message = "Welcome")) {
  //           console.log("Navigate to welcome page");
  //           alert("Login Successful");
  //           navigate("/home");
  //           return (
  //             <div>
  //               <h1>{message}</h1>
  //               <h2>User Information:</h2>
  //               <ul>
  //                 <li>ID: {data.userInfo.id}</li>
  //                 <li>First Name: {data.userInfo.firstName}</li>
  //                 <li>Middle Name: {data.userInfo.middleName}</li>
  //                 <li>Last Name: {data.userInfo.lastName}</li>
  //                 <li>Email: {data.userInfo.email}</li>
  //                 <li>Mobile: {data.userInfo.mobile}</li>
  //                 <li>Intro: {data.userInfo.intro}</li>
  //                 <li>Profile: {data.userInfo.profile}</li>
  //               </ul>
  //             </div>
  //           );
  //         } else {
  //           console.log("User Login failed");
  //           alert("Login failed");
  //         }

  //         // Handle success (e.g., display a success message or redirect)
  //       })
  //       .catch((error) => {
  //         console.error("Error creating user:", error);
  //         setUserStatus({ ...userStatus, Message: error });
  //         // Handle errors (e.g., display an error message)
  //       });
  //   };

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

  const login = async (data) => {
    console.log(
      "Check the login , Email : " + data.email + "  Password :" + data.password
    );

    const tmpData = {
      // You can set this to 0 as a placeholder or generate it as needed
      Email: data.email, // Replace with the desired roleId
      Password: data.password,
    };
    //  e.preventDefault();
    setUserData({ ...userData, Email: data.email });
    setUserData({ ...userData, Password: data.password });

    console.log(tmpData);

    console.log("email : " + data.email);
    console.log("password :" + data.password);

    axios
      .post("http://103.186.185.127:8082/userlogin", tmpData)
      .then((response) => {
        console.log("Login Token :", response.data);

        const { data, message } = response;
        setUserStatus({ ...userStatus, Message: response.data.message });

        if ((response.data.message = "Welcome")) {
          console.log("Navigate to welcome page");
          //  alert("Login Successful");
          console.log("set user :" + response.data.data.userInfo.email);
          setUser(response.data.data.userInfo.email);
          navigate("/dashboard/profile", { replace: true });
          // navigate("/home");
          //   return (
          //     <div>
          //       <h1>{message}</h1>
          //       <h2>User Information:</h2>
          //       <ul>
          //         <li>ID: {response.data.data.userInfo.id}</li>
          //         <li>First Name: {response.data.data.userInfo.firstName}</li>
          //         <li>Middle Name: {response.data.data.userInfo.middleName}</li>
          //         <li>Last Name: {response.data.data.userInfo.lastName}</li>
          //       </ul>
          //     </div>
          //   );
        } else {
          console.log("User Login failed");
          alert("Login failed");
        }

        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error login user:", error);
        setUserStatus({ ...userStatus, Message: error });
        alert("Login failed");
        // Handle errors (e.g., display an error message)
      });

    //call login api and validate the access
    //

    //
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
