// components/Dashboard.jsx
import React, { useState } from 'react';
import { addDepartment } from '../api';

const AddDepartment = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    await addDepartment({ name });
    alert('Department Added');
    setName('');
  };

  return (
    <div className="form">
      <h3>Add Department</h3>
      <label>Department Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Department Name" />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddDepartment;
