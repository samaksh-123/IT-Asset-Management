
// import React, { useState, useEffect } from 'react';
// import { issueAsset, fetchEmployees, fetchDepartments, fetchAvailableAssets } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     assetId: '',
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//     type: ''
//   });

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const [selectedAssetDate, setSelectedAssetDate] = useState('');

//   useEffect(() => {
//     fetchEmployees().then(res => setEmployees(res.data));
//     fetchDepartments().then(res => setDepartments(res.data));
//     fetchAvailableAssets().then(res => setAvailableAssets(res.data));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "employeeId") {
//       const selectedEmployee = employees.find(emp => emp._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmployee?.departmentId || ''
//       });
//     } else if (name === "assetId") {
//       const asset = availableAssets.find(a => a._id === value);
//       setSelectedAssetDate(asset?.dateAdded || '');
//       setForm({ ...form, assetId: value });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.assetId || !form.employeeId) {
//       alert("Please select a valid asset and employee.");
//       return;
//     }

//     if (form.issuedDate < selectedAssetDate) {
//       alert("Issued date cannot be before the asset's added date.");
//       return;
//     }

//     try {
//       await issueAsset({
//         assetId: form.assetId,
//         employeeId: form.employeeId,
//         departmentId: form.departmentId,
//         issuedDate: form.issuedDate,
//       });

//       alert('Asset issued successfully!');
//       setForm({
//         assetId: '',
//         employeeId: '',
//         departmentId: '',
//         issuedDate: '',
//         type: ''
//       });
//       setSelectedAssetDate('');
//     } catch (err) {
//       console.error('Failed to issue asset:', err);
//       alert('Failed to issue asset');
//     }
//   };

//   const filteredAssets = form.type
//     ? availableAssets.filter(asset => asset.type === form.type)
//     : [];

//   const assetTypes = [...new Set(availableAssets.map(a => a.type))];

//   return (
//     <div className="form">
//       <h3>Issue Asset</h3>

//       {/* Asset Type Dropdown */}
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>

//       {/* Filtered Assets Dropdown */}
//       <select name="assetId" onChange={handleChange} value={form.assetId}>
//         <option value="">Select Asset (Name - Serial Number-Configuration)</option>
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map(a => (
//             <option key={a._id} value={a._id}>
//               {a.name} - {a.serialNumber} -{a.configuration}
//             </option>
//           ))
//         ) : (
//           <option disabled>No assets available for this type</option>
//         )}
//       </select>

//       {/* Employee Dropdown */}
//       <select name="employeeId" onChange={handleChange} value={form.employeeId}>
//         <option value="">Assign to Employee</option>
//         {employees.map(e => (
//           <option key={e._id} value={e._id}>{e.name}</option>
//         ))}
//       </select>

//       {/* Department Dropdown (Auto-filled) */}
//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       {/* Issued Date (minimum is asset added date) */}
//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleChange}
//         min={selectedAssetDate}
//       />

//       <button onClick={handleSubmit}>Issue</button>
//     </div>
//   );
// };

// export default IssueAssetForm;




// import React, { useState, useEffect } from 'react';
// import { issueAsset, fetchEmployees, fetchDepartments, fetchAvailableAssets } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     assetId: '',
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//     type: ''
//   });

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const [selectedAssetDate, setSelectedAssetDate] = useState('');

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const empRes = await fetchEmployees();
//       const deptRes = await fetchDepartments();
//       const assetRes = await fetchAvailableAssets();
//       setEmployees(empRes.data);
//       setDepartments(deptRes.data);
//       setAvailableAssets(assetRes.data);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "employeeId") {
//       const selectedEmployee = employees.find(emp => emp._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmployee?.departmentId || ''
//       });
//     } else if (name === "assetId") {
//       const asset = availableAssets.find(a => a._id === value);
//       setSelectedAssetDate(asset?.dateAdded || '');
//       setForm({ ...form, assetId: value });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.assetId || !form.employeeId || !form.issuedDate) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     // Extra validation to block issuing before asset added date
//     if (form.issuedDate < selectedAssetDate) {
//       alert("Issued date cannot be before the asset's added date.");
//       return;
//     }

//     const today = new Date().toISOString().split("T")[0];
//     if (form.issuedDate > today) {
//       alert("Issued date cannot be in the future.");
//       return;
//     }

//     try {
//       await issueAsset({
//         assetId: form.assetId,
//         employeeId: form.employeeId,
//         departmentId: form.departmentId,
//         issuedDate: form.issuedDate,
//       });

//       alert('Asset issued successfully!');

//       // Clear form and re-fetch latest assets
//       setForm({
//         assetId: '',
//         employeeId: '',
//         departmentId: '',
//         issuedDate: '',
//         type: ''
//       });
//       setSelectedAssetDate('');
//       await loadData();
//     } catch (err) {
//       console.error('Failed to issue asset:', err);
//       alert('Failed to issue asset');
//     }
//   };

//   const filteredAssets = form.type
//     ? availableAssets.filter(asset => asset.type === form.type)
//     : [];

//   const assetTypes = [...new Set(availableAssets.map(a => a.type))];

//   return (
//     <div className="form">
//       <h3>Issue Asset</h3>

//       {/* Asset Type Dropdown */}
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>

//       {/* Filtered Assets Dropdown */}
//       <select name="assetId" onChange={handleChange} value={form.assetId}>
//         <option value="">Select Asset (Name - Serial - Configuration)</option>
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map(a => (
//             <option key={a._id} value={a._id}>
//               {a.name} - {a.serialNumber} - {a.configuration}
//             </option>
//           ))
//         ) : (
//           <option disabled>No assets available for this type</option>
//         )}
//       </select>

//       {/* Employee Dropdown */}
//       <select name="employeeId" onChange={handleChange} value={form.employeeId}>
//         <option value="">Assign to Employee</option>
//         {employees.map(e => (
//           <option key={e._id} value={e._id}>{e.name}</option>
//         ))}
//       </select>

//       {/* Department Dropdown (auto-filled, disabled) */}
//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       {/* Issued Date (enforced min/max) */}
//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleChange}
//         min={selectedAssetDate}
//         max={new Date().toISOString().split('T')[0]} // Prevent future dates
//       />

//       <button onClick={handleSubmit}>Issue</button>
//     </div>
//   );
// };

// export default IssueAssetForm;

// import React, { useState, useEffect } from 'react';
// import { issueAsset, fetchEmployees, fetchDepartments, fetchAvailableAssets } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     assetId: '',
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//     type: ''
//   });

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const [selectedAssetDate, setSelectedAssetDate] = useState('');

//   const today = new Date().toISOString().split('T')[0];

//   const fetchAllData = async () => {
//     try {
//       const [empRes, deptRes, assetRes] = await Promise.all([
//         fetchEmployees(),
//         fetchDepartments(),
//         fetchAvailableAssets()
//       ]);

//       setEmployees(empRes.data);
//       setDepartments(deptRes.data);
//       setAvailableAssets(assetRes.data);
//     } catch (err) {
//       console.error('Failed to fetch data', err);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "employeeId") {
//       const selectedEmployee = employees.find(emp => emp._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmployee?.departmentId || ''
//       });
//     } else if (name === "assetId") {
//       const asset = availableAssets.find(a => a._id === value);
//       setSelectedAssetDate(asset?.dateAdded || '');
//       setForm({ ...form, assetId: value });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.assetId || !form.employeeId) {
//       alert("Please select a valid asset and employee.");
//       return;
//     }

//     if (form.issuedDate < selectedAssetDate) {
//       alert("Issued date cannot be before the asset's added date.");
//       return;
//     }

//     if (form.issuedDate > today) {
//       alert("Issued date cannot be in the future.");
//       return;
//     }

//     try {
//       await issueAsset({
//         assetId: form.assetId,
//         employeeId: form.employeeId,
//         departmentId: form.departmentId,
//         issuedDate: form.issuedDate
//       });

//       alert('Asset issued successfully!');
//       setForm({
//         assetId: '',
//         employeeId: '',
//         departmentId: '',
//         issuedDate: '',
//         type: ''
//       });
//       setSelectedAssetDate('');
//       fetchAllData(); // refresh assets list
//     } catch (err) {
//       console.error('Failed to issue asset:', err);
//       alert('Failed to issue asset');
//     }
//   };

//   const filteredAssets = form.type
//     ? availableAssets.filter(asset => asset.type === form.type)
//     : [];

//   const assetTypes = [...new Set(availableAssets.map(a => a.type))];

//   return (
//     <div className="form">
//       <h3>Issue Asset</h3>

//       {/* Manual Refresh Button */}
//       <button onClick={fetchAllData}>🔄 Refresh Data</button>

//       {/* Asset Type Dropdown */}
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>

//       {/* Filtered Assets Dropdown */}
//       <select name="assetId" onChange={handleChange} value={form.assetId}>
//         <option value="">Select Asset (Name - Serial Number - Configuration)</option>
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map(a => (
//             <option key={a._id} value={a._id}>
//               {a.name} - {a.serialNumber} - {a.configuration}
//             </option>
//           ))
//         ) : (
//           <option disabled>No assets available for this type</option>
//         )}
//       </select>

//       {/* Employee Dropdown */}
//       <select name="employeeId" onChange={handleChange} value={form.employeeId}>
//         <option value="">Assign to Employee</option>
//         {employees.map(e => (
//           <option key={e._id} value={e._id}>{e.name}</option>
//         ))}
//       </select>

//       {/* Department Dropdown (Auto-filled) */}
//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       {/* Issued Date (with min and max validation) */}
//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleChange}
//         min={selectedAssetDate}
//         max={today}
//         required
//       />

//       <button onClick={handleSubmit}>Issue</button>
//     </div>
//   );
// };

// export default IssueAssetForm;


// import React, { useState, useEffect } from 'react';
// import { issueAsset, fetchEmployees, fetchDepartments, fetchAvailableAssets } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     assetId: '',
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//     type: ''
//   });

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const [selectedAssetDate, setSelectedAssetDate] = useState('');
//   const today = new Date().toISOString().split('T')[0];

//   const fetchAllData = async () => {
//     try {
//       const [empRes, deptRes, assetRes] = await Promise.all([
//         fetchEmployees(),
//         fetchDepartments(),
//         fetchAvailableAssets()
//       ]);

//       setEmployees(empRes.data);
//       setDepartments(deptRes.data);
//       setAvailableAssets(assetRes.data);
//     } catch (err) {
//       console.error('Failed to fetch data', err);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "employeeId") {
//       const selectedEmployee = employees.find(emp => emp._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmployee?.departmentId || ''
//       });
//     } else if (name === "assetId") {
//       const asset = availableAssets.find(a => a._id === value);
//       setSelectedAssetDate(asset?.dateAdded || '');
//       setForm({ ...form, assetId: value });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.assetId || !form.employeeId) {
//       alert("Please select a valid asset and employee.");
//       return;
//     }

//     if (form.issuedDate < selectedAssetDate) {
//       alert("Issued date cannot be before the asset's added date.");
//       return;
//     }

//     if (form.issuedDate > today) {
//       alert("Issued date cannot be in the future.");
//       return;
//     }

//     try {
//       await issueAsset({
//         assetId: form.assetId,
//         employeeId: form.employeeId,
//         departmentId: form.departmentId,
//         issuedDate: form.issuedDate
//       });

//       alert('Asset issued successfully!');
//       setForm({
//         assetId: '',
//         employeeId: '',
//         departmentId: '',
//         issuedDate: '',
//         type: ''
//       });
//       setSelectedAssetDate('');
//       fetchAllData(); // auto-refresh after issuing
//     } catch (err) {
//       console.error('Failed to issue asset:', err);
//       alert('Failed to issue asset');
//     }
//   };

//   const filteredAssets = form.type
//     ? availableAssets.filter(asset => asset.type === form.type)
//     : [];

//   const assetTypes = [...new Set(availableAssets.map(a => a.type))];

//   return (
//     <div className="form">
//       <h3>Issue Asset</h3>

//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>

//       <select name="assetId" onChange={handleChange} value={form.assetId}>
//         <option value="">Select Asset (Name - Serial Number - Configuration)</option>
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map(a => (
//             <option key={a._id} value={a._id}>
//               {a.name} - {a.serialNumber} - {a.configuration}
//             </option>
//           ))
//         ) : (
//           <option disabled>No assets available for this type</option>
//         )}
//       </select>

//       <select name="employeeId" onChange={handleChange} value={form.employeeId}>
//         <option value="">Assign to Employee</option>
//         {employees.map(e => (
//           <option key={e._id} value={e._id}>{e.name}</option>
//         ))}
//       </select>

//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>

//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleChange}
//         min={selectedAssetDate}
//         max={today}
//         required
//       />

//       <button onClick={handleSubmit}>Issue</button>
//     </div>
//   );
// };

// export default IssueAssetForm;



import React, { useState, useEffect } from 'react';
import { issueAsset, fetchEmployees, fetchDepartments, fetchAvailableAssets } from '../api';

const IssueAssetForm = () => {
  const [form, setForm] = useState({
    assetId: '',
    employeeId: '',
    departmentId: '',
    issuedDate: '',
    type: ''
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [availableAssets, setAvailableAssets] = useState([]);
  const [selectedAssetDate, setSelectedAssetDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const fetchAllData = async () => {
    try {
      const [empRes, deptRes, assetRes] = await Promise.all([
        fetchEmployees(),
        fetchDepartments(),
        fetchAvailableAssets()
      ]);

      setEmployees(empRes.data);
      setDepartments(deptRes.data);
      setAvailableAssets(assetRes.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      const selectedEmployee = employees.find(emp => emp._id === value);
      setForm({
        ...form,
        employeeId: value,
        departmentId: selectedEmployee?.departmentId || ''
      });
    } else if (name === "assetId") {
      const asset = availableAssets.find(a => a._id === value);
      setSelectedAssetDate(asset?.dateAdded || '');
      setForm({ ...form, assetId: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.assetId || !form.employeeId) {
      alert("Please select a valid asset and employee.");
      return;
    }

    const issued = new Date(form.issuedDate);
    const added = new Date(selectedAssetDate);
    const todayDate = new Date(today);

    issued.setHours(0, 0, 0, 0);
    added.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    if (issued < added) {
      alert("Issued date cannot be before the asset's added date.");
      return;
    }

    if (issued > todayDate) {
      alert("Issued date cannot be in the future.");
      return;
    }

    try {
      await issueAsset({
        assetId: form.assetId,
        employeeId: form.employeeId,
        departmentId: form.departmentId,
        issuedDate: form.issuedDate
      });

      alert('Asset issued successfully!');
      setForm({
        assetId: '',
        employeeId: '',
        departmentId: '',
        issuedDate: '',
        type: ''
      });
      setSelectedAssetDate('');
      fetchAllData(); // auto-refresh after issuing
    } catch (err) {
      console.error('Failed to issue asset:', err);
      alert('Failed to issue asset');
    }
  };

  const filteredAssets = form.type
    ? availableAssets.filter(asset => asset.type === form.type)
    : [];

  const assetTypes = [...new Set(availableAssets.map(a => a.type))];

  return (
    <div className="form">
      <h3>Issue Asset</h3>
      <label>Asset Type:</label>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="">Select Asset Type</option>
        {assetTypes.map((type, idx) => (
          <option key={idx} value={type}>{type}</option>
        ))}
      </select>
      <label>Select Asset:</label>
      <select name="assetId" onChange={handleChange} value={form.assetId}>
        <option value="">Select Asset (Name - Serial Number - Configuration)</option>
        {filteredAssets.length > 0 ? (
          filteredAssets.map(a => (
            <option key={a._id} value={a._id}>
              {a.name} - {a.serialNumber} - {a.configuration}
            </option>
          ))
        ) : (
          <option disabled>No assets available for this type</option>
        )}
      </select>
        <label>Select Employee:</label>
      <select name="employeeId" onChange={handleChange} value={form.employeeId}>
        <option value="">Assign to Employee</option>
        {employees.map(e => (
          <option key={e._id} value={e._id}>{e.name}</option>
        ))}
      </select>
      <label>Department:</label>
      <select name="departmentId" value={form.departmentId} disabled>
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>
     <label>Issue Date:</label>
      <input
        type="date"
        name="issuedDate"
        value={form.issuedDate}
        onChange={handleChange}
        min={selectedAssetDate}
        max={today}
        required
      />

      <button onClick={handleSubmit}>Issue</button>
    </div>
  );
};

export default IssueAssetForm;
