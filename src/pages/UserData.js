import React from 'react';

function UserData() {
  const userData = {
    data: {
      tokens: {
        AccessToken: {
          Token: "$2a$10$QcgiGTPmdcjI.RuqABVTvehQBTtoro0Ehxu46zu.7nsSanQFuroti",
          CreatedAt: "282812-09-28 12:49:37",
          ExpiredAt: "292912-09-29 12:49:37"
        },
        RefreshToken: {
          Token: "$2a$10$6xhwZW2cWZCU7TLi7Atkpe0XAuJW1Oe.fKkEhrtA2LyXPc0rjfikW",
          CreatedAt: "2023-09-28 12:49:37",
          ExpiredAt: "2023-10-01 12:49:37"
        }
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
          content: ""
        }
      }
    },
    message: "Welcome!"
  };

  const { data, message } = userData;

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
}

export default UserData;
