// AddUserForm.js
import React from 'react';

const AddUserForm = ({ newUser, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={onChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <select name="gender" value={newUser.gender} onChange={onChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
