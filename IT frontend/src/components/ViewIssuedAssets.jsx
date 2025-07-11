// import React, { useEffect, useState } from 'react';
// import { fetchIssuedAssets, deleteIssuedAsset, updateIssuedAsset } from '../api';
// import { FaEdit, FaTrash } from 'react-icons/fa';


// const ViewIssuedAssets = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedDateFilter, setSelectedDateFilter] = useState('');
//   const [customDate, setCustomDate] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     fetchIssuedAssets()
//       .then((res) => {
//         const data = Array.isArray(res.data) ? res.data : res.data.issuedAssets || [];
//         setIssuedAssets(data);
//         setFilteredAssets(data);
//       })
//       .catch((err) => console.error('Failed to fetch issued assets', err));
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedEmployee, selectedDateFilter, customDate);
//   };

//   const handleEmployeeChange = (e) => {
//     const empId = e.target.value;
//     setSelectedEmployee(empId);
//     applyFilters(selectedType, empId, selectedDateFilter, customDate);
//   };

//   const handleDateFilterChange = (e) => {
//     const filter = e.target.value;
//     setSelectedDateFilter(filter);
//     setCustomDate(''); // clear custom
//     applyFilters(selectedType, selectedEmployee, filter, '');
//   };

//   const handleCustomDateChange = (e) => {
//     const date = e.target.value;
//     setCustomDate(date);
//     setSelectedDateFilter(''); // clear preset
//     applyFilters(selectedType, selectedEmployee, '', date);
//   };

//   const applyFilters = (type, empId, dateFilter, customDate) => {
//     let filtered = [...issuedAssets];

//     if (type && type !== 'all') {
//       filtered = filtered.filter(issue => issue.assetId?.type === type);
//     }

//     if (empId && empId !== 'all') {
//       filtered = filtered.filter(issue => issue.employeeId?._id === empId);
//     }

//     if (dateFilter || customDate) {
//       const now = new Date();
//       filtered = filtered.filter(issue => {
//         const issuedDate = new Date(issue.issuedDate);
//         const diffTime = now - issuedDate;
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//         if (customDate) {
//           const selected = new Date(customDate);
//           return issuedDate.toDateString() === selected.toDateString();
//         }

//         switch (dateFilter) {
//           case 'today':
//             return issuedDate.toDateString() === now.toDateString();
//           case 'yesterday':
//             return diffDays === 1;
//           case 'last7':
//             return diffDays <= 7;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredAssets(filtered);
//   };

//   const uniqueTypes = [...new Set(issuedAssets.map(issue => issue.assetId?.type).filter(Boolean))];
//   const uniqueEmployees = [...new Map(
//     issuedAssets
//       .filter(issue => issue.employeeId)
//       .map(issue => [issue.employeeId._id, issue.employeeId])
//   ).values()];

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this issued asset?')) return;
//     await deleteIssuedAsset(id);
//     const updated = issuedAssets.filter(item => item._id !== id);
//     setIssuedAssets(updated);
//     setFilteredAssets(updated);
//   };

//   const handleEditClick = (item) => {
//     setEditingId(item._id);
//     setEditForm({
//       type: item.assetId?.type || '',
//       name: item.assetId?.name || '',
//       serialNumber: item.assetId?.serialNumber || '',
//       configuration: item.assetId?.configuration || '',
//       issuedDate: item.issuedDate ? new Date(item.issuedDate).toISOString().slice(0, 10) : ''
//     });
//   };

//   const handleEditChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSaveEdit = async (id) => {
//     await updateIssuedAsset(id, editForm);
//     setEditingId(null);
//     const updatedList = issuedAssets.map(asset =>
//       asset._id === id
//         ? { ...asset, assetId: { ...asset.assetId, ...editForm }, issuedDate: editForm.issuedDate }
//         : asset
//     );
//     setIssuedAssets(updatedList);
//     setFilteredAssets(updatedList);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };




//   return (
//     <div>
//       <h2>Issued Assets</h2>

//       {/* Filters */}
//       <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => (
//               <option key={idx} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Employee: </label>
//           <select value={selectedEmployee} onChange={handleEmployeeChange}>
//             <option value="all">All</option>
//             {uniqueEmployees.map((emp) => (
//               <option key={emp._id} value={emp._id}>{emp.name}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Date Filter: </label>
//           <select value={selectedDateFilter} onChange={handleDateFilterChange}>
//             <option value="">All</option>
//             <option value="today">Today</option>
//             <option value="yesterday">Yesterday</option>
//             <option value="last7">Last 7 Days</option>
//           </select>
//         </div>

//         <div>
//           <label>Or Pick Date: </label>
//           <input type="date" value={customDate} onChange={handleCustomDateChange} />
//         </div>
//       </div>

//       <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
//         Showing {filteredAssets.length} issued asset{filteredAssets.length !== 1 ? 's' : ''}.
//       </div>
      

//       {/* Table */}
//       {filteredAssets.length === 0 ? (
//         <p>No assets issued with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Asset Name</th>
//               <th>Serial Number</th>
//               <th>Configuration</th>
//               <th>Issued To</th>
//               <th>Department</th>
//               <th>Issued Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((issue) => (
//               <tr key={issue._id}>
//                 {editingId === issue._id ? (
//                   <>
//                     <td><input value={editForm.type} onChange={(e) => handleEditChange('type', e.target.value)} /></td>
//                     <td><input value={editForm.name} onChange={(e) => handleEditChange('name', e.target.value)} /></td>
//                     <td><input value={editForm.serialNumber} onChange={(e) => handleEditChange('serialNumber', e.target.value)} /></td>
//                     <td><input value={editForm.configuration} onChange={(e) => handleEditChange('configuration', e.target.value)} /></td>
//                     <td>{issue.employeeId?.name || 'N/A'}</td>
//                     <td>{issue.departmentId?.name || 'N/A'}</td>
//                     <td><input type="date" value={editForm.issuedDate} onChange={(e) => handleEditChange('issuedDate', e.target.value)} /></td>
//                     <td>
//                       <button onClick={() => handleSaveEdit(issue._id)}>Save</button>
//                       <button onClick={() => setEditingId(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{issue.assetId?.type || 'N/A'}</td>
//                     <td>{issue.assetId?.name || 'N/A'}</td>
//                     <td>{issue.assetId?.serialNumber || 'N/A'}</td>
//                     <td>{issue.assetId?.configuration || 'N/A'}</td>
//                     <td>{issue.employeeId?.name || 'N/A'}</td>
//                     <td>{issue.departmentId?.name || 'N/A'}</td>
//                     <td>{formatDate(issue.issuedDate)}</td>
//                     <td>
//                       <FaEdit style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} onClick={() => handleEditClick(issue)} />
//                       <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(issue._id)} />
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewIssuedAssets;
  // const handleSaveEdit = async (id) => {
  //   await updateIssuedAsset(id, editForm);
  //   setEditingId(null);
  //   const updatedList = issuedAssets.map(asset =>
  //     asset._id === id
  //       ? { ...asset, assetId: { ...asset.assetId, ...editForm }, issuedDate: editForm.issuedDate }
  //       : asset
  //   );
  //   setIssuedAssets(updatedList);
  //   setFilteredAssets(updatedList);
  // };

import React, { useEffect, useState } from 'react';
import { fetchIssuedAssets } from '../api';
import { exportToExcel } from '../utils/exportToExcel';

const ViewIssuedAssets = () => {
  const [issuedAssets, setIssuedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    fetchIssuedAssets()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.issuedAssets || [];
        setIssuedAssets(data);
        setFilteredAssets(data);
      })
      .catch((err) => console.error('Failed to fetch issued assets', err));
  }, []);

  const applyFilters = (type, empId, dateFilter, customDate) => {
    let filtered = [...issuedAssets];

    if (type && type !== 'all') {
      filtered = filtered.filter(issue => issue.assetId?.type === type);
    }

    if (empId && empId !== 'all') {
      filtered = filtered.filter(issue => issue.employeeId?._id === empId);
    }

    if (dateFilter || customDate) {
      const now = new Date();
      filtered = filtered.filter(issue => {
        const issuedDate = new Date(issue.issuedDate);
        const diffTime = now - issuedDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (customDate) {
          const selected = new Date(customDate);
          return issuedDate.toDateString() === selected.toDateString();
        }

        switch (dateFilter) {
          case 'today':
            return issuedDate.toDateString() === now.toDateString();
          case 'yesterday':
            return diffDays === 1;
          case 'last7':
            return diffDays <= 7;
          default:
            return true;
        }
      });
    }

    setFilteredAssets(filtered);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    applyFilters(value, selectedEmployee, selectedDateFilter, customDate);
  };

  const handleEmployeeChange = (e) => {
    const value = e.target.value;
    setSelectedEmployee(value);
    applyFilters(selectedType, value, selectedDateFilter, customDate);
  };

  const handleDateFilterChange = (e) => {
    const value = e.target.value;
    setSelectedDateFilter(value);
    setCustomDate('');
    applyFilters(selectedType, selectedEmployee, value, '');
  };

  const handleCustomDateChange = (e) => {
    const value = e.target.value;
    setCustomDate(value);
    setSelectedDateFilter('');
    applyFilters(selectedType, selectedEmployee, '', value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' :
      `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleExport = () => {
    const exportData = filteredAssets.map(issue => ({
      Type: issue.assetId?.type || 'N/A',
      Name: issue.assetId?.name || 'N/A',
      SerialNumber: issue.assetId?.serialNumber || 'N/A',
      Configuration: issue.assetId?.configuration || 'N/A',
      Employee: issue.employeeId?.name || 'N/A',
      Department: issue.departmentId?.name || 'N/A',
      IssuedDate: formatDate(issue.issuedDate),
    }));
    exportToExcel(exportData, 'IssuedAssets.xlsx');
  };

  const uniqueTypes = [...new Set(issuedAssets.map(issue => issue.assetId?.type).filter(Boolean))];
  const uniqueEmployees = [...new Map(
    issuedAssets.filter(issue => issue.employeeId).map(issue => [issue.employeeId._id, issue.employeeId])
  ).values()];

  const groupedByEmployee = filteredAssets.reduce((acc, curr) => {
    const empId = curr.employeeId?._id || 'unknown';
    if (!acc[empId]) acc[empId] = [];
    acc[empId].push(curr);
    return acc;
  }, {});

  return (
    <div>
      <h2>Issued Assets</h2>

      {/* Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <label>Filter by Type:</label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Filter by Employee:</label>
          <select value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="all">All</option>
            {uniqueEmployees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date Filter:</label>
          <select value={selectedDateFilter} onChange={handleDateFilterChange}>
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 Days</option>
          </select>
        </div>

        <div>
          <label>Pick Date:</label>
          <input type="date" value={customDate} onChange={handleCustomDateChange} />
        </div>

        <button onClick={handleExport} style={{ padding: '6px 12px', background: '#2980b9', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer',width: 'auto'}}>
          Export to Excel
        </button>
      </div>

      {/* Table */}
      {Object.keys(groupedByEmployee).length === 0 ? (
        <p>No issued assets found.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Issued To</th>
              <th>Department</th>
              <th>Type</th>
              <th>Asset Name</th>
              <th>Serial No.</th>
              <th>Configuration</th>
              <th>Issued Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedByEmployee).map(([empId, issues]) =>
              issues.map((issue, index) => (
                <tr key={issue._id}>
                  {index === 0 && (
                    <>
                      <td rowSpan={issues.length}>{issue.employeeId?.name || 'N/A'}</td>
                      <td rowSpan={issues.length}>{issue.departmentId?.name || 'N/A'}</td>
                    </>
                  )}
                  <td>{issue.assetId?.type || 'N/A'}</td>
                  <td>{issue.assetId?.name || 'N/A'}</td>
                  <td>{issue.assetId?.serialNumber || 'N/A'}</td>
                  <td>{issue.assetId?.configuration || 'N/A'}</td>
                  <td>{formatDate(issue.issuedDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewIssuedAssets;
