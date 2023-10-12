import React, { useState } from "react";
import Axios from "axios";

export default function UserRegister() {
  const [id, setId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registeredAt, setRegisteredAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [intro, setIntro] = useState("");
  const [profile, setProfile] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    console.log("function called");
    Axios.post("http://103.186.185.127:8082/users", {
      roleId: 300,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      Password: Password,
      registeredAt: Date.now(),
      lastLogin: Date.now(),
      intro: intro,
      profile: profile,
    }).then((response) => {
      alert("User Added Successfully");
    });
  };

  return (
    <div className="bg-orange-300 min-h-screen">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="bg-orange-100 rounded-lg shadow p-5 mb-4 w-100">
          <form>
            <h1 className="mb-4 text-3xl font-bold text-center">Add New User</h1>
            <input
              type="text"
              className="form-control mb-4"
              name="fullname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="middlename"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle Name"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              type="password"
              className="form-control mb-4"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Intro"
            />

            <input
              type="text"
              className="form-control mb-4"
              name="profile"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="Profile"
            />

            <button
              onClick={(e) => registerUser(e)}
              className="btn btn-primary btn-block"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
