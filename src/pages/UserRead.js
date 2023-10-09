// // src/Read.js
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Read.css";

// const Read = () => {
//   const [userData, setUserData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch user data from the provided endpoint when the component mounts
//     axios
//       .get("http://103.186.185.127:8082/users")
//       .then((response) => {
//         console.log("API Response:", response.data); // Debugging line
//         setUserData(response.data.data); // Use response.data.data here
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <p>Loading user data...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="read">
//       <h2>Admin User List </h2>
//       <div className="user-grid">
//         {userData.map((user) => (
//           <div className="user-card" key={user.id}>
//             <h3>
//               {user.firstName} {user.middleName} {user.lastName}
//             </h3>
//             <div>
//               <strong>Email:</strong>{" "}
//               <Link to={`/edit/${user.id}`}>{user.email}</Link>
//             </div>

//             <div>
//               <strong>Edit</strong>{" "}
//               <Link to={`/edit/${user.id}`}>{user.id}</Link>
//             </div>
//             <div>
//               <strong>Delete</strong>{" "}
//               <Link to={`/delete/${user.id}`}>{user.id}</Link>
//             </div>
//             {/* Add more user data fields as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Read;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserRead.css";

export const UserRead = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the provided endpoint when the component mounts
    axios
      .get("http://103.186.185.127:8082/users")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging line
        setUserData(response.data.data); // Use response.data.data here
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="read">
      <h2>Admin User List</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Edit</th>
            <th className="table-header">Delete</th>

            {/* Add more table headers for additional data fields */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.middleName} {user.lastName}
              </td>
              <td>
                <Link to={`/dashboard/useredit/${user.id}`}>{user.email}</Link>
              </td>
              <td>
                <Link to={`/dashboard/useredit/${user.id}`}>Edit</Link>
              </td>
              <td>
                <Link to={`/dashboard/userdelete/${user.id}`}>Delete</Link>
              </td>
              {/* Add more table data cells for additional data fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//export  UserRead;
