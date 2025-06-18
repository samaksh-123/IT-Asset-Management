// import React, { useState, useEffect } from 'react';
// import { addEmployee, fetchDepartments } from '../api';

// const AddEmployee = () => {
//   const [form, setForm] = useState({ name: '', departmentId: '' });
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     fetchDepartments().then(res => setDepartments(res.data));
//   }, []);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     try {
//   await addEmployee({ name: form.name, departmentId: form.departmentId });
//   alert('Employee added');
//       setForm({ name: '', departmentId: '' });
//     }catch(err){
//       console.error(err);
//       alert('Failed to add employee');
//     }
    
// };

//   return (
//     <div className="form">
//       <h3>Add Employee</h3>
//       <input name="name" value={form.name} onChange={handleChange} placeholder="Employee Name" />
//       <select name="departmentId" value={form.departmentId} onChange={handleChange}>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>
//       <button onClick={handleSubmit}>Add</button>
//     </div>
//   );
// };

// export default AddEmployee;



// import React, { useState, useEffect } from 'react';
// import { addEmployee, fetchDepartments } from '../api';

// const AddEmployee = () => {
//   const [form, setForm] = useState({ name: '', departmentId: '', location: '' });
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     fetchDepartments().then(res => setDepartments(res.data));
//   }, []);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if (!form.name || !form.departmentId || !form.location) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       await addEmployee(form);
//       alert('Employee added');
//       setForm({ name: '', departmentId: '', location: '' });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add employee');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Add Employee</h3>
      
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Employee Name"
//       />

//       <select name="departmentId" value={form.departmentId} onChange={handleChange}>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       <select name="location" value={form.location} onChange={handleChange}>
//         <option value="">Select Location</option>
//         <option value="HO">HO</option>
//         <option value="Bagru">Bagru</option>
//         <option value="R.C.Pura">R.C.Pura</option>
//       </select>

//       <button onClick={handleSubmit}>Add</button>
//     </div>
//   );
// };

// export default AddEmployee;



import React, { useState, useEffect } from 'react';
import { addEmployee, fetchDepartments } from '../api';

const AddEmployee = () => {
  const [form, setForm] = useState({ name: '', departmentId: '', location: '' });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments().then(res => setDepartments(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await addEmployee(form);
      alert('Employee added');
      setForm({ name: '', departmentId: '', location: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add employee');
    }
  };

  return (
    <div className="form"> 
      <h3>Add Employee</h3>
      <label>Employee Name:</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Employee Name"
      />
      <label>Department:</label>
      <select
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

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddEmployee;
