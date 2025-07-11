// import React, { useEffect, useState } from 'react';
// import { fetchDepartments, fetchEmployees, deleteEmployee } from '../api';
// import { FaTrash } from 'react-icons/fa';
// import { exportToExcel } from '../utils/exportToExcel';
// import './ViewEmployees.css';

// const ViewEmployees = () => {
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedDeptId, setSelectedDeptId] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');

//   const locationOptions = ["", "HO", "Bagru", "R.C.Pura", "Hyderabad"];

//   useEffect(() => {
//     fetchDepartments().then(res => setDepartments(res.data));
//     loadEmployees();
//   }, []);

//   const loadEmployees = async () => {
//     try {
//       const res = await fetchEmployees();
//       setEmployees(res.data);
//     } catch (err) {
//       console.error("Failed to load employees:", err);
//     }
//   };

//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Delete employee "${name}"?`)) {
//       try {
//         await deleteEmployee(id);
//         loadEmployees();
//       } catch (err) {
//         console.error(err);
//         alert('Failed to delete employee');
//       }
//     }
//   };

//   const getDepartmentName = (deptId) => {
//     const dept = departments.find(d => d._id === deptId);
//     return dept ? dept.name : 'Unknown';
//   };

//   const filteredEmployees = employees
//     .filter(emp =>
//       (!selectedDeptId || emp.departmentId === selectedDeptId) &&
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (!selectedLocation || (emp.location || '').toLowerCase() === selectedLocation.toLowerCase())
//     )
//     .sort((a, b) => a.name.localeCompare(b.name));

//   const handleExport = () => {
//     const exportData = filteredEmployees.map(emp => ({
//       Name: emp.name,
//       Department: getDepartmentName(emp.departmentId),
//       Location: emp.location || 'No Location'
//     }));
//     exportToExcel(exportData, 'Employees.xlsx');
//   };

//   return (
//     <div className="employee-container">
//       <h2>Employee List</h2>

//       {/* Filters */}
//       <div style={{  display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//         {/* Department Filter */}
//         <select value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)}>
//           <option value="">All Departments</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept._id}>{dept.name}</option>
//           ))}
//         </select>

//         {/* Name Search */}
//         <input
//           type="text"
//           placeholder="Search by employee name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Location Filter */}
//         <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
//           <option value="">All Locations</option>
//           {locationOptions.filter(loc => loc).map((loc, idx) => (
//             <option key={idx} value={loc}>{loc}</option>
//           ))}
//         </select>

//         {/* Export */}
//         <button onClick={handleExport} className="export-btn">
//           Export to Excel
//         </button>
//       </div>

//       {/* Employee Table */}
//       {filteredEmployees.length === 0 ? (
//         <p className="no-results">No matching employees.</p>
//       ) : (
//         <table className="employee-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Department</th>
//               <th>Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map(emp => (
//               <tr key={emp._id}>
//                 <td>{emp.name}</td>
//                 <td>{getDepartmentName(emp.departmentId)}</td>
//                 <td>{emp.location || 'No Location'}</td>
//                 <td>
//                   <FaTrash
//                     onClick={() => handleDelete(emp._id, emp.name)}
//                     className="trash-icon"
//                     title="Delete"
//                     style={{ color: '#555', cursor: 'pointer' }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewEmployees;


import React, { useEffect, useState } from 'react';
import { fetchDepartments, fetchEmployees, deleteEmployee } from '../api';
import { FaTrash } from 'react-icons/fa';
import { exportToExcel } from '../utils/exportToExcel';
import './ViewEmployees.css';

const ViewEmployees = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const locationOptions = ["", "HO", "Bagru", "R.C.Pura", "Hyderabad"];

  useEffect(() => {
    fetchDepartments().then(res => setDepartments(res.data));
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete employee "${name}"?`)) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (err) {
        console.error(err);
        alert('Failed to delete employee');
      }
    }
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d._id === deptId);
    return dept ? dept.name : 'Unknown';
  };

  const filteredEmployees = employees
    .filter(emp =>
      (!selectedDeptId || emp.departmentId === selectedDeptId) &&
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedLocation || (emp.location || '').toLowerCase() === selectedLocation.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleExport = () => {
    const exportData = filteredEmployees.map(emp => ({
      'Employee ID': emp.employeeId || 'N/A',
      Name: emp.name,
      Department: getDepartmentName(emp.departmentId),
      Location: emp.location || 'No Location'
    }));
    exportToExcel(exportData, 'Employees.xlsx');
  };

  return (
    <div className="employee-container">
      <h2>Employee List</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <select value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="">All Locations</option>
          {locationOptions.filter(loc => loc).map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>

        <button onClick={handleExport} className="export-btn">
          Export to Excel
        </button>
      </div>

      {/* Employee Table */}
      {filteredEmployees.length === 0 ? (
        <p className="no-results">No matching employees.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
               
              <th>Employee ID</th>
             <th>Name</th>
              <th>Department</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.employeeId || 'N/A'}</td>
                <td>{emp.name}</td>
                <td>{getDepartmentName(emp.departmentId)}</td>
                <td>{emp.location || 'No Location'}</td>
                <td>
                  <FaTrash
                    onClick={() => handleDelete(emp._id, emp.name)}
                    className="trash-icon"
                    title="Delete"
                    style={{ color: '#555', cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewEmployees;
