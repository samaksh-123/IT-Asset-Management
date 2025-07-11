
// import React, { useState, useEffect } from 'react';
// import { addEmployee, fetchDepartments } from '../api';
// import'./AddDepartment.css'

// const AddEmployee = () => {
//   const [form, setForm] = useState({
//     employeeId: '',
//     name: '',
//     departmentId: '',
//     location: ''
//   });

//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     fetchDepartments().then(res => setDepartments(res.data));
//   }, []);

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     try {
//       await addEmployee(form);
//       alert('Employee added');
//       setForm({ employeeId: '', name: '', departmentId: '', location: '' });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add employee');
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
//       <h3>Add Employee</h3>

//          <label>Employee Name:</label>
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Enter Employee Name"
//       />

//       <label>Employee ID:</label>
//       <input
//         name="employeeId"
//         value={form.employeeId}
//         onChange={handleChange}
//         placeholder="Enter Employee ID"
//       />

   

//       <label>Department:</label>
//       <select
//         name="departmentId"
//         value={form.departmentId}
//         onChange={handleChange}
//       >
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       <label>Location:</label>
//       <select
//         name="location"
//         value={form.location}
//         onChange={handleChange}
//       >
//         <option value="">Select Location</option>
//         <option value="HO">HO</option>
//         <option value="Bagru">Bagru</option>
//         <option value="R.C.Pura">R.C.Pura</option>
//         <option value="Hyderabad">Hyderabad</option>
//       </select>

//       <button onClick={handleSubmit}>Add</button>
//     </div>
//   );
// };

// export default AddEmployee;



import React, { useState, useEffect } from 'react';
import { addEmployee, fetchDepartments } from '../api';
import './AddDepartment.css'; // Use a dedicated CSS for employee form

const AddEmployee = () => {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    departmentId: '',
    location: ''
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments().then(res => setDepartments(res.data));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await addEmployee(form);
      alert('Employee added');
      setForm({ employeeId: '', name: '', departmentId: '', location: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add employee');
    }
  };

  return (
    <div className="employee-form-wrapper">
      <div className="employee-form-glass">
        <h3>Add Employee</h3>

        <label>Employee Name:</label>
        <input
          className="input-field"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Employee Name"
        />

        <label>Employee ID:</label>
        <input
          className="input-field"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Enter Employee ID"
        />

        <label>Department:</label>
        <select
          className="input-field"
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          {departments.map(d => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>

        <label>Location:</label>
        <select
          className="input-field"
          name="location"
          value={form.location}
          onChange={handleChange}
        >
          <option value="">Select Location</option>
          <option value="HO">HO</option>
          <option value="Bagru">Bagru</option>
          <option value="R.C.Pura">R.C.Pura</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <button className="submit-btn" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddEmployee;
