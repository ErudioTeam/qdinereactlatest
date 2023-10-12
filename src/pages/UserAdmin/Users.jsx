import React from 'react';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate = useNavigate();

  const addUser = () => {
    navigate('/AddUser');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={addUser}
          className="btn btn-primary mb-2"
        >
          Add New User
        </button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Intro</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <UserList />
          </tbody>
        </table>
      </div>
    </div>
  );
}
