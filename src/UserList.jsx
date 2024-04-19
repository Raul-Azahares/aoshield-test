// UserList.js
import React from 'react';

const UserList = ({ users, deleteUser }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} className="user-item">
          {user.name} - {user.email}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
