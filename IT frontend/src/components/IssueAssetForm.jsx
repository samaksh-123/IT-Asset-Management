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

//     const issued = new Date(form.issuedDate);
//     const added = new Date(selectedAssetDate);
//     const todayDate = new Date(today);

//     issued.setHours(0, 0, 0, 0);
//     added.setHours(0, 0, 0, 0);
//     todayDate.setHours(0, 0, 0, 0);

//     if (issued < added) {
//       alert("Issued date cannot be before the asset's added date.");
//       return;
//     }

//     if (issued > todayDate) {
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
//       <label>Asset Type:</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>
//       <label>Select Asset:</label>
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

//       <label>Asset Type:</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>
//       <label>Select Asset:</label>
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
//       <label>Asset Type:</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>
//       <label>Select Asset:</label>
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
//       <label>Asset Type:</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((type, idx) => (
//           <option key={idx} value={type}>{type}</option>
//         ))}
//       </select>
//       <label>Select Asset:</label>
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
      
//         <label>Select Employee:</label>
//       <select name="employeeId" onChange={handleChange} value={form.employeeId}>
//         <option value="">Assign to Employee</option>
//         {employees.map(e => (
//           <option key={e._id} value={e._id}>{e.name}</option>
//         ))}
//       </select>
//       <label>Department:</label>
//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>
//      <label>Issue Date:</label>
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
// import {
//   issueAsset,
//   fetchEmployees,
//   fetchDepartments,
//   fetchAvailableAssets,
// } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//   });

//   const [assetGroups, setAssetGroups] = useState([
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//   ]);

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [empRes, deptRes, assetRes] = await Promise.all([
//           fetchEmployees(),
//           fetchDepartments(),
//           fetchAvailableAssets(),
//         ]);
//         setEmployees(empRes.data);
//         setDepartments(deptRes.data);
//         setAvailableAssets(assetRes.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchAll();
//   }, []);

//   const assetTypes = [...new Set(availableAssets.map((a) => a.type))];

//   const handleAssetGroupChange = (index, field, value) => {
//     const updated = [...assetGroups];
//     if (field === 'type') {
//       updated[index] = { type: value, assetId: '', assetDate: '' };
//     } else if (field === 'assetId') {
//       const asset = availableAssets.find((a) => a._id === value);
//       updated[index].assetId = value;
//       updated[index].assetDate = asset?.dateAdded || '';
//     }
//     setAssetGroups(updated);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'employeeId') {
//       const selectedEmp = employees.find((e) => e._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmp?.departmentId || '',
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.employeeId || !form.issuedDate) {
//       alert('Please fill in employee and issue date.');
//       return;
//     }

//     for (const group of assetGroups) {
//       if (group.assetId) {
//         const issued = new Date(form.issuedDate);
//         const added = new Date(group.assetDate);
//         const todayDate = new Date(today);

//         issued.setHours(0, 0, 0, 0);
//         added.setHours(0, 0, 0, 0);
//         todayDate.setHours(0, 0, 0, 0);

//         if (issued < added) {
//           alert("Issued date can't be before asset's added date.");
//           return;
//         }
//         if (issued > todayDate) {
//           alert("Issued date can't be in the future.");
//           return;
//         }
//       }
//     }

//     try {
//       const issuePromises = assetGroups
//         .filter((g) => g.assetId)
//         .map((g) =>
//           issueAsset({
//             assetId: g.assetId,
//             employeeId: form.employeeId,
//             departmentId: form.departmentId,
//             issuedDate: form.issuedDate,
//           })
//         );

//       await Promise.all(issuePromises);

//       alert('Assets issued successfully!');
//       setForm({ employeeId: '', departmentId: '', issuedDate: '' });
//       setAssetGroups([
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//       ]);
//     } catch (err) {
//       console.error('Issue failed', err);
//       alert('Failed to issue assets');
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '600px', margin: 'auto' }}>
//       <h3>Issue Multiple Assets</h3>

     

//       <label>Employee:</label>
// <select name="employeeId" value={form.employeeId} onChange={handleFormChange}>
//   <option value="">Select Employee</option>
//   {employees.map((emp) => (
//     <option key={emp._id} value={emp._id}>
//       {emp.name} ({emp.employeeId || 'No ID'})
//     </option>
//   ))}
// </select>

//       {/* Department (auto-filled) */}
//       <label>Department:</label>
//       <select name="departmentId" value={form.departmentId} disabled>
//         <option value="">Select Department</option>
//         {departments.map((d) => (
//           <option key={d._id} value={d._id}>
//             {d.name}
//           </option>
//         ))}
//       </select>

//       {/* Issue Date */}
//       <label>Issue Date:</label>
//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleFormChange}
//         max={today}
//       />

//       <hr />

//       {/* Asset Sections */}
//       {assetGroups.map((group, idx) => {
//         const filteredAssets = group.type
//           ? availableAssets.filter((a) => a.type === group.type)
//           : [];

//         return (
//           <div key={idx}>
//             <h4>Asset #{idx + 1}</h4>

//             <label>Asset Type:</label>
//             <select
//               value={group.type}
//               onChange={(e) =>
//                 handleAssetGroupChange(idx, 'type', e.target.value)
//               }
//             >
//               <option value="">Select Type</option>
//               {assetTypes.map((type, i) => (
//                 <option key={i} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>

//             <label>Asset:</label>
//             <select
//               value={group.assetId}
//               onChange={(e) =>
//                 handleAssetGroupChange(idx, 'assetId', e.target.value)
//               }
//             >
//               <option value="">Select Asset</option>
//               {filteredAssets.map((asset) => (
//                 <option key={asset._id} value={asset._id}>
//                   {asset.name} - {asset.serialNumber} - {asset.configuration}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       })}

//       <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
//         Issue Assets
//       </button>
//     </div>
//   );
// };

// export default IssueAssetForm;



// import React, { useState, useEffect } from 'react';
// import './AddDepartment.css'
// import {
//   issueAsset,
//   fetchEmployees,
//   fetchDepartments,
//   fetchAvailableAssets,
// } from '../api';

// const IssueAssetForm = () => {
//   const [form, setForm] = useState({
//     employeeId: '',
//     departmentId: '',
//     issuedDate: '',
//   });

//   const [assetGroups, setAssetGroups] = useState([
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//     { type: '', assetId: '', assetDate: '' },
//   ]);

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [availableAssets, setAvailableAssets] = useState([]);
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [empRes, deptRes, assetRes] = await Promise.all([
//           fetchEmployees(),
//           fetchDepartments(),
//           fetchAvailableAssets(),
//         ]);
//         setEmployees(empRes.data);
//         setDepartments(deptRes.data);
//         setAvailableAssets(assetRes.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchAll();
//   }, []);

//   const assetTypes = [...new Set(availableAssets.map((a) => a.type))];

//   const handleAssetGroupChange = (index, field, value) => {
//     const updated = [...assetGroups];
//     if (field === 'type') {
//       updated[index] = { type: value, assetId: '', assetDate: '' };
//     } else if (field === 'assetId') {
//       const asset = availableAssets.find((a) => a._id === value);
//       updated[index].assetId = value;
//       updated[index].assetDate = asset?.dateAdded || '';
//     }
//     setAssetGroups(updated);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'employeeId') {
//       const selectedEmp = employees.find((e) => e._id === value);
//       setForm({
//         ...form,
//         employeeId: value,
//         departmentId: selectedEmp?.departmentId || '',
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.employeeId || !form.issuedDate) {
//       alert('Please fill in employee and issue date.');
//       return;
//     }

//     for (const group of assetGroups) {
//       if (group.assetId) {
//         const issued = new Date(form.issuedDate);
//         const added = new Date(group.assetDate);
//         const todayDate = new Date(today);

//         issued.setHours(0, 0, 0, 0);
//         added.setHours(0, 0, 0, 0);
//         todayDate.setHours(0, 0, 0, 0);

//         if (issued < added) {
//           alert("Issued date can't be before asset's added date.");
//           return;
//         }
//         if (issued > todayDate) {
//           alert("Issued date can't be in the future.");
//           return;
//         }
//       }
//     }

//     try {
//       const issuePromises = assetGroups
//         .filter((g) => g.assetId)
//         .map((g) =>
//           issueAsset({
//             assetId: g.assetId,
//             employeeId: form.employeeId,
//             departmentId: form.departmentId,
//             issuedDate: form.issuedDate,
//           })
//         );

//       await Promise.all(issuePromises);

//       alert('Assets issued successfully!');
//       setForm({ employeeId: '', departmentId: '', issuedDate: '' });
//       setAssetGroups([
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//         { type: '', assetId: '', assetDate: '' },
//       ]);
//     } catch (err) {
//       console.error('Issue failed', err);
//       alert('Failed to issue assets');
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '600px', margin: 'auto' }}>
//       <h3>Issue Multiple Assets</h3>

//       <label>Employee:</label>
//       <select
//         name="employeeId"
//         value={form.employeeId}
//         onChange={handleFormChange}
//         className="input-field"
//       >
//         <option value="">Select Employee</option>
//         {employees.map((emp) => (
//           <option key={emp._id} value={emp._id}>
//             {emp.name} ({emp.employeeId || 'No ID'})
//           </option>
//         ))}
//       </select>

//       <label>Department:</label>
//       <select
//         name="departmentId"
//         value={form.departmentId}
//         disabled
//         className="input-field"
//       >
//         <option value="">Select Department</option>
//         {departments.map((d) => (
//           <option key={d._id} value={d._id}>
//             {d.name}
//           </option>
//         ))}
//       </select>

//       <label>Issue Date:</label>
//       <input
//         type="date"
//         name="issuedDate"
//         value={form.issuedDate}
//         onChange={handleFormChange}
//         max={today}
//         className="input-field"
//       />

//       <hr />

//       {assetGroups.map((group, idx) => {
//         const filteredAssets = group.type
//           ? availableAssets.filter((a) => a.type === group.type)
//           : [];

//         return (
//           <div key={idx}>
//             <h4>Asset #{idx + 1}</h4>

//             <label>Asset Type:</label>
//             <select
//               value={group.type}
//               onChange={(e) =>
//                 handleAssetGroupChange(idx, 'type', e.target.value)
//               }
//               className="input-field"
//             >
//               <option value="">Select Type</option>
//               {assetTypes.map((type, i) => (
//                 <option key={i} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>

//             <label>Asset:</label>
//             <select
//               value={group.assetId}
//               onChange={(e) =>
//                 handleAssetGroupChange(idx, 'assetId', e.target.value)
//               }
//               className="input-field"
//             >
//               <option value="">Select Asset</option>
//               {filteredAssets.map((asset) => (
//                 <option key={asset._id} value={asset._id}>
//                   {asset.name} - {asset.serialNumber} - {asset.configuration}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       })}

//       <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
//         Issue Assets
//       </button>
//     </div>
//   );
// };

// export default IssueAssetForm;



import React, { useState, useEffect } from 'react';
import './AddDepartment';
import {
  issueAsset,
  fetchEmployees,
  fetchDepartments,
  fetchAvailableAssets,
} from '../api';

const IssueAssetForm = () => {
  const [form, setForm] = useState({
    employeeId: '',
    departmentId: '',
    issuedDate: '',
  });

  const [assetGroups, setAssetGroups] = useState([
    { type: '', assetId: '', assetDate: '' },
    { type: '', assetId: '', assetDate: '' },
    { type: '', assetId: '', assetDate: '' },
    { type: '', assetId: '', assetDate: '' },
  ]);

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [availableAssets, setAvailableAssets] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [empRes, deptRes, assetRes] = await Promise.all([
          fetchEmployees(),
          fetchDepartments(),
          fetchAvailableAssets(),
        ]);
        setEmployees(empRes.data);
        setDepartments(deptRes.data);
        setAvailableAssets(assetRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchAll();
  }, []);

  const assetTypes = [...new Set(availableAssets.map((a) => a.type))];

  const handleAssetGroupChange = (index, field, value) => {
    const updated = [...assetGroups];
    if (field === 'type') {
      updated[index] = { type: value, assetId: '', assetDate: '' };
    } else if (field === 'assetId') {
      const asset = availableAssets.find((a) => a._id === value);
      updated[index].assetId = value;
      updated[index].assetDate = asset?.dateAdded || '';
    }
    setAssetGroups(updated);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'employeeId') {
      const selectedEmp = employees.find((e) => e._id === value);
      setForm({
        ...form,
        employeeId: value,
        departmentId: selectedEmp?.departmentId || '',
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.employeeId || !form.issuedDate) {
      alert('Please fill in employee and issue date.');
      return;
    }

    for (const group of assetGroups) {
      if (group.assetId) {
        const issued = new Date(form.issuedDate);
        const added = new Date(group.assetDate);
        const todayDate = new Date(today);

        issued.setHours(0, 0, 0, 0);
        added.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        if (issued < added) {
          alert("Issued date can't be before asset's added date.");
          return;
        }
        if (issued > todayDate) {
          alert("Issued date can't be in the future.");
          return;
        }
      }
    }

    try {
      const issuePromises = assetGroups
        .filter((g) => g.assetId)
        .map((g) =>
          issueAsset({
            assetId: g.assetId,
            employeeId: form.employeeId,
            departmentId: form.departmentId,
            issuedDate: form.issuedDate,
          })
        );

      await Promise.all(issuePromises);

      alert('Assets issued successfully!');
      setForm({ employeeId: '', departmentId: '', issuedDate: '' });
      setAssetGroups([
        { type: '', assetId: '', assetDate: '' },
        { type: '', assetId: '', assetDate: '' },
        { type: '', assetId: '', assetDate: '' },
        { type: '', assetId: '', assetDate: '' },
      ]);
    } catch (err) {
      console.error('Issue failed', err);
      alert('Failed to issue assets');
    }
  };

  return (
    <div className="issue-form-wrapper">
      <div className="issue-form-glass">
        <h3>Issue Multiple Assets</h3>

        <label>Employee:</label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleFormChange}
          className="input-field"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.employeeId || 'No ID'})
            </option>
          ))}
        </select>

        <label>Department:</label>
        <select
          name="departmentId"
          value={form.departmentId}
          disabled
          className="input-field"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <label>Issue Date:</label>
        <input
          type="date"
          name="issuedDate"
          value={form.issuedDate}
          onChange={handleFormChange}
          max={today}
          className="input-field"
        />

        <hr />

        {assetGroups.map((group, idx) => {
          const filteredAssets = group.type
            ? availableAssets.filter((a) => a.type === group.type)
            : [];

          return (
            <div key={idx}>
              <h4>Asset #{idx + 1}</h4>

              <label>Asset Type:</label>
              <select
                value={group.type}
                onChange={(e) =>
                  handleAssetGroupChange(idx, 'type', e.target.value)
                }
                className="input-field"
              >
                <option value="">Select Type</option>
                {assetTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label>Asset:</label>
              <select
                value={group.assetId}
                onChange={(e) =>
                  handleAssetGroupChange(idx, 'assetId', e.target.value)
                }
                className="input-field"
              >
                <option value="">Select Asset</option>
                {filteredAssets.map((asset) => (
                  <option key={asset._id} value={asset._id}>
                    {asset.name} - {asset.serialNumber} - {asset.configuration}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <button className="submit-btn" onClick={handleSubmit}>
          Issue Assets
        </button>
      </div>
    </div>
  );
};

export default IssueAssetForm;
