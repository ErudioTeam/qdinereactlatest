import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser';

export default function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8082/users")
      .then((response) => {
        const allUsers = response.data.data;
        setUserList(allUsers);
        //console.log(allUsers);
        
  
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return userList.map((user) => (
    <tr className="bg-warning">
      <th scope="row" className="px-6 py-4 font-weight-bold text-dark">
        {user.firstName}
      </th>
      <td className="px-6 py-4">{user.middleName}</td>
      <td className="px-6 py-4">{user.lastName}</td>
      <td className="px-6 py-4">{user.mobile}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.Password}</td>
      <td className="px-6 py-4">{user.intro}</td>
      <td className="px-6 py-4">{user.profile}</td>
      <td className="px-6 py-4">
      <div className="btn-group" role="group">
        <EditUser user={user} />
        <ViewUser user={user} />
        <DeleteUser user={user} />
        </div>
      </td>
    </tr>
  ));
}
