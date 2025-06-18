// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [totalAssets, setTotalAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedDateFilter, setSelectedDateFilter] = useState('');
//   const [customDate, setCustomDate] = useState('');

//   useEffect(() => {
//     const loadAssets = async () => {
//       try {
//         const [availableRes, issuedRes, returnedRes] = await Promise.all([
//           fetchAvailableAssets(),
//           fetchIssuedAssets(),
//           fetchReturnedAssets()
//         ]);

//         const availableAssets = availableRes.data.map(asset => ({
//           ...asset,
//           status: 'Available',
//           employee: null,
//           department: null,
//           date: asset.date || asset.addedDate || asset.createdAt
//         }));

//         const issuedAssets = issuedRes.data.map(issue => ({
//           ...issue.assetId,
//           status: 'Issued',
//           employee: issue.employeeId,
//           department: issue.departmentId,
//           date: issue.issuedDate
//         }));

//         const returnedAssets = returnedRes.data.map(ret => ({
//           ...ret.assetId,
//           status: 'Returned',
//           employee: ret.employeeId,
//           department: ret.departmentId,
//           date: ret.returnDate
//         }));

//         const combined = [...availableAssets, ...issuedAssets, ...returnedAssets];
//         setTotalAssets(combined);
//         setFilteredAssets(combined);
//       } catch (error) {
//         console.error('Error loading assets:', error);
//       }
//     };

//     loadAssets();
//   }, []);

//   const uniqueTypes = [...new Set(totalAssets.map(asset => asset.type).filter(Boolean))];

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus, selectedDateFilter, customDate);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status, selectedDateFilter, customDate);
//   };

//   const handleDateFilterChange = (e) => {
//     const filter = e.target.value;
//     setSelectedDateFilter(filter);
//     setCustomDate('');
//     applyFilters(selectedType, selectedStatus, filter, '');
//   };

//   const handleCustomDateChange = (e) => {
//     const date = e.target.value;
//     setCustomDate(date);
//     setSelectedDateFilter('');
//     applyFilters(selectedType, selectedStatus, '', date);
//   };

//   const applyFilters = (type, status, dateFilter, customDate) => {
//     let filtered = [...totalAssets];

//     if (type && type !== 'all') {
//       filtered = filtered.filter(asset => asset.type === type);
//     }

//     if (status && status !== 'all') {
//       filtered = filtered.filter(asset => asset.status === status);
//     }

//     if (dateFilter || customDate) {
//       const now = new Date();
//       filtered = filtered.filter(asset => {
//         const assetDate = new Date(asset.date);
//         const diffTime = now - assetDate;
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//         if (customDate) {
//           const selected = new Date(customDate);
//           return assetDate.toDateString() === selected.toDateString();
//         }

//         switch (dateFilter) {
//           case 'today':
//             return assetDate.toDateString() === now.toDateString();
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

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Type: asset.type || 'N/A',
//       Name: asset.name || 'N/A',
//       SerialNumber: asset.serialNumber || 'N/A',
//       Configuration: asset.configuration || 'N/A',
//       Status: asset.status,
//       Employee: asset.employee?.name || 'N/A',
//       Department: asset.department?.name || 'N/A',
//       Date: formatDate(asset.date)
//     }));

//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   return (
//     <div>
//       <h2>Total Assets Overview</h2>

//       {/* Filters */}
//       <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => (
//               <option key={idx} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="Available">Available</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
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

//       {/* Export Button */}
//       {filteredAssets.length > 0 && (
//         <button
//           onClick={handleExport}
//           style={{
//             marginBottom: '1rem',
//             float: 'right',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto'
//           }}
//         >
//           Export to Excel
//         </button>
//       )}

//       <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
//         Showing {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}.
//       </div>

//       {/* Table */}
//       {filteredAssets.length === 0 ? (
//         <p>No assets match current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Name</th>
//               <th>Serial Number</th>
//               <th>Configuration</th>
//               <th>Status</th>
//               <th>Issued To</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.type || 'N/A'}</td>
//                 <td>{asset.name || 'N/A'}</td>
//                 <td>{asset.serialNumber || 'N/A'}</td>
//                 <td>{asset.configuration || 'N/A'}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employee?.name || '—'}</td>
//                 <td>{asset.department?.name || '—'}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;


// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [typeFilter, setTypeFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [customDate, setCustomDate] = useState('');

//   useEffect(() => {
//     const loadAssets = async () => {
//       try {
//         const [availableRes, issuedRes, returnedRes] = await Promise.all([
//           fetchAvailableAssets(),
//           fetchIssuedAssets(),
//           fetchReturnedAssets(),
//         ]);

//         const available = Array.isArray(availableRes.data)
//           ? availableRes.data
//           : availableRes.data.assets || [];

//         const issued = Array.isArray(issuedRes.data)
//           ? issuedRes.data
//           : issuedRes.data.issuedAssets || [];

//         const returned = Array.isArray(returnedRes.data)
//           ? returnedRes.data
//           : returnedRes.data.returnedAssets || [];

//         const formattedAssets = [
//           ...available.map(asset => ({ ...asset, status: 'Available' })),
//           ...issued.map(asset => ({
//             ...asset,
//             type: asset.assetId?.type || '',
//             name: asset.assetId?.name || '',
//             serialNumber: asset.assetId?.serialNumber || '',
//             configuration: asset.assetId?.configuration || '',
//             issuedDate: asset.issuedDate,
//             status: 'Issued'
//           })),
//           ...returned.map(asset => ({
//             ...asset,
//             type: asset.assetId?.type || '',
//             name: asset.assetId?.name || '',
//             serialNumber: asset.assetId?.serialNumber || '',
//             configuration: asset.assetId?.configuration || '',
//             returnDate: asset.returnDate,
//             status: 'Returned'
//           })),
//         ];

//         setAllAssets(formattedAssets);
//         setFilteredAssets(formattedAssets);
//       } catch (error) {
//         console.error('Error loading assets:', error);
//       }
//     };

//     loadAssets();
//   }, []);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Type: asset.type || 'N/A',
//       Name: asset.name || 'N/A',
//       SerialNumber: asset.serialNumber || 'N/A',
//       Configuration: asset.configuration || 'N/A',
//       Status: asset.status || 'N/A',
//       IssuedDate: asset.issuedDate ? formatDate(asset.issuedDate) : '',
//       ReturnedDate: asset.returnDate ? formatDate(asset.returnDate) : '',
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const handleFilter = () => {
//     let filtered = [...allAssets];

//     if (typeFilter) {
//       filtered = filtered.filter(asset => asset.type === typeFilter);
//     }

//     if (statusFilter) {
//       filtered = filtered.filter(asset => asset.status === statusFilter);
//     }

//     if (dateFilter || customDate) {
//       const now = new Date();
//       filtered = filtered.filter(asset => {
//         const compareDate = asset.issuedDate || asset.returnDate || asset.addedDate;
//         const date = new Date(compareDate);
//         const diffTime = now - date;
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//         if (customDate) {
//           const selected = new Date(customDate);
//           return date.toDateString() === selected.toDateString();
//         }

//         switch (dateFilter) {
//           case 'today':
//             return date.toDateString() === now.toDateString();
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

//   const uniqueTypes = [...new Set(allAssets.map(asset => asset.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       {/* Filters */}
//       <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//             <option value="">All</option>
//             {uniqueTypes.map((type, i) => (
//               <option key={i} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Status: </label>
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">All</option>
//             <option value="Available">Available</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>

//         <div>
//           <label>Date Filter: </label>
//           <select value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setCustomDate(''); }}>
//             <option value="">All</option>
//             <option value="today">Today</option>
//             <option value="yesterday">Yesterday</option>
//             <option value="last7">Last 7 Days</option>
//           </select>
//         </div>

//         <div>
//           <label>Pick Custom Date: </label>
//           <input
//             type="date"
//             value={customDate}
//             onChange={(e) => {
//               setCustomDate(e.target.value);
//               setDateFilter('');
//             }}
//           />
//         </div>

//         <button
//           onClick={handleFilter}
//           style={{
//             backgroundColor: '#3498db',
//             color: '#fff',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             height: 'fit-content',
//             marginTop: '22px',
//           }}
//         >
//           Apply Filters
//         </button>

//         {filteredAssets.length > 0 && (
//           <button
//             onClick={handleExport}
//             style={{
//               marginLeft: 'auto',
//               backgroundColor: '#2ecc71',
//               color: 'white',
//               padding: '6px 12px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               height: 'fit-content',
//               marginTop: '22px',
//             }}
//           >
//             Export to Excel
//           </button>
//         )}
//       </div>

//       {/* Table */}
//       {filteredAssets.length === 0 ? (
//         <p>No assets match the selected filters.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Name</th>
//               <th>Serial Number</th>
//               <th>Configuration</th>
//               <th>Status</th>
//               <th>Issued Date</th>
//               <th>Returned Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, index) => (
//               <tr key={index}>
//                 <td>{asset.type || 'N/A'}</td>
//                 <td>{asset.name || 'N/A'}</td>
//                 <td>{asset.serialNumber || 'N/A'}</td>
//                 <td>{asset.configuration || 'N/A'}</td>
//                 <td>{asset.status || 'N/A'}</td>
//                 <td>{asset.issuedDate ? formatDate(asset.issuedDate) : 'N/A'}</td>
//                 <td>{asset.returnDate ? formatDate(asset.returnDate) : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')
//     }/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets(),
//       ]);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'Available',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data) ? returnedRes.data.map(ret => ({
//         ...ret.assetId,
//         status: 'Returned',
//         date: ret.returnedDate,
//         employeeName: ret.employeeId?.name || 'N/A',
//         departmentName: ret.departmentId?.name || 'N/A'
//       })) : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];

//     if (type && type !== 'all') {
//       filtered = filtered.filter(asset => asset.type === type);
//     }

//     if (status && status !== 'all') {
//       filtered = filtered.filter(asset => asset.status === status);
//     }

//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       SerialNumber: asset.serialNumber,
//       Configuration: asset.configuration || 'N/A',
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date),
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(asset => asset.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       {/* Filters */}
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => (
//               <option key={idx} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="Available">Available</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>

//         {filteredAssets.length > 0 && (
//           <button
//             onClick={handleExport}
//             style={{
//               marginLeft: 'auto',
//               backgroundColor: '#2980b9',
//               color: 'white',
//               padding: '6px 12px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               width: 'auto',
//               height: '38px'
//             }}
//           >
//             Export to Excel
//           </button>
//         )}
//       </div>

//       {/* Table */}
//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Serial Number</th>
//               <th>Configuration</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, index) => (
//               <tr key={index}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.serialNumber}</td>
//                 <td>{asset.configuration || 'N/A'}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')
//     }/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);
//       console.log('Returned Response:', returnedRes.data);

//       // Available Assets
//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       // Issued Assets
//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       // Returned Assets
//       const returned = Array.isArray(returnedRes.data) ? returnedRes.data.map(ret => ({
//         ...ret.assetId,
//         status: 'Returned',
//         date: ret.returnedDate, // ✅ Correctly mapped
//         employeeName: ret.employeeId?.name || 'N/A',
//         departmentName: ret.departmentId?.name || 'N/A'
//       })) : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       // SerialNumber: asset.serialNumber,
//       // Configuration: asset.configuration || 'N/A',
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>
//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>
//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               {/* <th>Serial Number</th>
//               <th>Configuration</th> */}
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 {/* <td>{asset.serialNumber}</td>
//                 <td>{asset.configuration || 'N/A'}</td> */}
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/$${(date.getMonth() + 1).toString().padStart(2, '0')}/$${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data) ? returnedRes.data.map(ret => ({
//         ...ret.assetId,
//         status: ret.returnReason === 'In Stock' ? 'In Stock' : 'Returned',
//         date: ret.returnedDate,
//         employeeName: ret.employeeId?.name || 'N/A',
//         departmentName: ret.departmentId?.name || 'N/A'
//       })) : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>
//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>
//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/$${(date.getMonth() + 1).toString().padStart(2, '0')}/$${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data)
//         ? returnedRes.data
//             .filter(ret => ret.assetId) // ✅ Only include if assetId is valid
//             .map(ret => ({
//               ...ret.assetId,
//               status: ret.returnReason === 'In Stock' ? 'In Stock' : 'Returned',
//               date: ret.returnedDate,
//               employeeName: ret.employeeId?.name || 'N/A',
//               departmentName: ret.departmentId?.name || 'N/A'
//             }))
//         : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>
//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>
//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data) ? returnedRes.data
//         .filter(ret => ret.assetId) // Ensure assetId exists
//         .map(ret => ({
//           ...ret.assetId,
//           status: ret.returnReason || 'Returned', // Show returnReason as status
//           date: ret.returnedDate,
//           employeeName: ret.employeeId?.name || 'N/A',
//           departmentName: ret.departmentId?.name || 'N/A'
//         })) : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, 
  
//   []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];
//   const uniqueStatuses = [...new Set(allAssets.map(a => a.status).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             {uniqueStatuses.map((status, idx) => (
//               <option key={idx} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;



// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       console.log("✅ Available Assets:", availableRes.data);
//       console.log("✅ Issued Assets:", issuedRes.data);
//       console.log("✅ Returned Assets (Raw):", returnedRes.data);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data)
//         ? returnedRes.data
//             .filter(ret => ret.assetId && ret.returnedDate) // Ensure both are present
//             .map(ret => ({
//               ...ret.assetId,
//               status: ret.returnReason || 'Returned',
//               date: ret.returnedDate,
//               employeeName: ret.employeeId?.name || 'N/A',
//               departmentName: ret.departmentId?.name || 'N/A'
//             }))
//         : [];

//       console.log("✅ Parsed Returned Assets:", returned);

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('❌ Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status);
//   };

//   const applyFilters = (type, status) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       Date: formatDate(asset.date)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];
//   const uniqueStatuses = [...new Set(allAssets.map(a => a.status).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             {uniqueStatuses.map((status, idx) => (
//               <option key={idx} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             width: 'auto',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.date)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;


// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return isNaN(date) ? 'N/A' : `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       console.log("✅ Available Assets:", availableRes.data);
//       console.log("✅ Issued Assets:", issuedRes.data);
//       console.log("✅ Returned Assets (Raw):", returnedRes.data);

//       const available = (availableRes.data || []).map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         employeeName: '—',
//         departmentName: '—',
//         issueDate: null,
//         returnDate: null,
//         baseDate: asset.addedDate || asset.createdAt
//       }));

//       const issued = (issuedRes.data || []).map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A',
//         issueDate: issue.issuedDate,
//         returnDate: null,
//         baseDate: issue.issuedDate
//       }));

//       const returned = (returnedRes.data || []).filter(ret => ret.assetId && ret.returnedDate).map(ret => ({
//         ...ret.assetId,
//         status: 'Returned',
//         employeeName: ret.employeeId?.name || 'N/A',
//         departmentName: ret.departmentId?.name || 'N/A',
//         issueDate: ret.issuedDate || null,
//         returnDate: ret.returnedDate,
//         baseDate: ret.returnedDate
//       }));

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('❌ Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(status, selectedDate);
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     applyFilters(selectedStatus, date);
//   };

//   const applyFilters = (status, date) => {
//     let filtered = [...allAssets];
//     if (status !== 'all') filtered = filtered.filter(a => a.status === status || (status === 'returned' && a.status.toLowerCase().includes('returned')));
//     if (date) {
//       filtered = filtered.filter(a => {
//         const assetDate = new Date(a.baseDate).toISOString().slice(0, 10);
//         return assetDate === date;
//       });
//     }
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       'Issue Date': formatDate(asset.issueDate),
//       'Return Date': formatDate(asset.returnDate)
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
//         <div>
//           <label>Status Filter: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="returned">Returned</option>
//           </select>
//         </div>

//         <div>
//           <label>Filter by Date: </label>
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </div>

//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             height: '38px'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{formatDate(asset.issueDate)}</td>
//                 <td>{formatDate(asset.returnDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;


// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       console.log("✅ Available Assets:", availableRes.data);
//       console.log("✅ Issued Assets:", issuedRes.data);
//       console.log("✅ Returned Assets (Raw):", returnedRes.data);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         issueDate: null,
//         returnDate: null,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         issueDate: issue.issuedDate,
//         returnDate: null,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data)
//         ? returnedRes.data
//             .filter(ret => ret.assetId && ret.returnedDate)
//             .map(ret => ({
//               ...ret.assetId,
//               status: ret.returnReason || 'Returned',
//               date: ret.returnedDate,
//               issueDate: ret.issuedDate,
//               returnDate: ret.returnedDate,
//               employeeName: ret.employeeId?.name || 'N/A',
//               departmentName: ret.departmentId?.name || 'N/A'
//             }))
//         : [];

//       console.log("✅ Parsed Returned Assets:", returned);

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('❌ Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus, selectedDate);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status, selectedDate);
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     applyFilters(selectedType, selectedStatus, date);
//   };

//   const applyFilters = (type, status, date) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     if (date) {
//       const selected = new Date(date);
//       filtered = filtered.filter(a => {
//         const assetDate = new Date(a.date);
//         return assetDate.toDateString() === selected.toDateString();
//       });
//     }
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       IssueDate: asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate),
//       ReturnDate: asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate),
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];
//   const uniqueStatuses = [...new Set(allAssets.map(a => a.status).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             {uniqueStatuses.map((status, idx) => (
//               <option key={idx} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Date: </label>
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </div>

//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             height: '38px',
//             width:'auto'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate)}</td>
//                 <td>{asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;


// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets()
//       ]);

//       const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         issueDate: null,
//         returnDate: null,
//         employeeName: '—',
//         departmentName: '—'
//       })) : [];

//       const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         issueDate: issue.issuedDate,
//         returnDate: null,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A'
//       })) : [];

//       const returned = Array.isArray(returnedRes.data)
//         ? returnedRes.data
//             .filter(ret => ret.assetId && ret.returnedDate)
//             .map(ret => ({
//               ...ret.assetId,
//               status: 'Returned',
//               date: ret.returnedDate,
//               issueDate: ret.issuedDate,
//               returnDate: ret.returnedDate,
//               employeeName: ret.employeeId?.name || 'N/A',
//               departmentName: ret.departmentId?.name || 'N/A'
//             }))
//         : [];

//       const combined = [...available, ...issued, ...returned];
//       setAllAssets(combined);
//       setFilteredAssets(combined);
//     } catch (err) {
//       console.error('❌ Error loading assets:', err);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     applyFilters(type, selectedStatus, selectedDate);
//   };

//   const handleStatusChange = (e) => {
//     const status = e.target.value;
//     setSelectedStatus(status);
//     applyFilters(selectedType, status, selectedDate);
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     applyFilters(selectedType, selectedStatus, date);
//   };

//   const applyFilters = (type, status, date) => {
//     let filtered = [...allAssets];
//     if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
//     if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
//     if (date) {
//       const selected = new Date(date);
//       filtered = filtered.filter(a => {
//         const assetDate = new Date(a.date);
//         return assetDate.toDateString() === selected.toDateString();
//       });
//     }
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map(asset => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       IssueDate: asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate),
//       ReturnDate: asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate),
//     }));
//     exportToExcel(exportData, 'TotalAssets.xlsx');
//   };

//   const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
//         <div>
//           <label>Filter by Type: </label>
//           <select value={selectedType} onChange={handleTypeChange}>
//             <option value="all">All</option>
//             {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
//           </select>
//         </div>

//         <div>
//           <label>Filter by Status: </label>
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>

//         <div>
//           <label>Filter by Date: </label>
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </div>

//         <button
//           onClick={handleExport}
//           style={{
//             marginLeft: 'auto',
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '6px 12px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             height: '38px',
//             width:'auto'
//           }}
//         >
//           Export to Excel
//         </button>
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filter.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Employee</th>
//               <th>Department</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((asset, idx) => (
//               <tr key={idx}>
//                 <td>{asset.name}</td>
//                 <td>{asset.type}</td>
//                 <td>{asset.status}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate)}</td>
//                 <td>{asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;




import React, { useEffect, useState } from 'react';
import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
import { exportToExcel } from '../utils/exportToExcel';

const ViewTotalAssets = () => {
  const [allAssets, setAllAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return 'N/A';
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const loadAssets = async () => {
    try {
      const [availableRes, issuedRes, returnedRes] = await Promise.all([
        fetchAvailableAssets(),
        fetchIssuedAssets(),
        fetchReturnedAssets()
      ]);

      const available = Array.isArray(availableRes.data) ? availableRes.data.map(asset => ({
        ...asset,
        status: 'In Stock',
        date: asset.addedDate || asset.createdAt,
        issueDate: null,
        returnDate: null,
        employeeName: '—',
        departmentName: '—'
      })) : [];

      const issued = Array.isArray(issuedRes.data) ? issuedRes.data.map(issue => ({
        ...issue.assetId,
        status: 'Issued',
        date: issue.issuedDate,
        issueDate: issue.issuedDate,
        returnDate: null,
        employeeName: issue.employeeId?.name || 'N/A',
        departmentName: issue.departmentId?.name || 'N/A'
      })) : [];

      const returned = Array.isArray(returnedRes.data)
        ? returnedRes.data
            .filter(ret => ret.assetId && ret.returnedDate)
            .map(ret => ({
              ...ret.assetId,
              status: 'Returned',
              date: ret.returnedDate,
              issueDate: ret.issuedDate,
              returnDate: ret.returnedDate,
              employeeName: ret.employeeId?.name || 'N/A',
              departmentName: ret.departmentId?.name || 'N/A'
            }))
        : [];

      const combined = [...available, ...issued, ...returned];
      setAllAssets(combined);
      setFilteredAssets(combined);
    } catch (err) {
      console.error('❌ Error loading assets:', err);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    applyFilters(type, selectedStatus, selectedDate);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    applyFilters(selectedType, status, selectedDate);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    applyFilters(selectedType, selectedStatus, date);
  };

  const applyFilters = (type, status, date) => {
    let filtered = [...allAssets];
    if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
    if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
    if (date) {
      const selected = new Date(date);
      filtered = filtered.filter(a => {
        const assetDate = new Date(a.date);
        return assetDate.toDateString() === selected.toDateString();
      });
    }
    setFilteredAssets(filtered);
  };

  const handleExport = () => {
    const exportData = filteredAssets.map(asset => ({
      Name: asset.name,
      Type: asset.type,
      Status: asset.status,
      AssignedTo: asset.employeeName,
      Department: asset.departmentName,
      IssueDate: asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate),
      ReturnDate: asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate),
    }));
    exportToExcel(exportData, 'TotalAssets.xlsx');
  };

  const uniqueTypes = [...new Set(allAssets.map(a => a.type).filter(Boolean))];

  return (
    <div>
      <h2>Total Assets</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label>Filter by Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label>Filter by Status: </label>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Issued">Issued</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        <div>
          <label>Filter by Date: </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>

        <button
          onClick={handleExport}
          style={{
            marginLeft: 'auto',
            backgroundColor: '#2980b9',
            color: 'white',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            height: '38px',
            width: 'auto'
          }}
        >
          Export to Excel
        </button>
      </div>

      <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Showing {filteredAssets.length} asset{filteredAssets.length !== 1 && 's'}.
      </div>

      {filteredAssets.length === 0 ? (
        <p>No assets found with current filter.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Issue Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, idx) => (
              <tr key={idx}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.status}</td>
                <td>{asset.employeeName}</td>
                <td>{asset.departmentName}</td>
                <td>{asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate)}</td>
                <td>{asset.status === 'Issued' || asset.status === 'In Stock' ? 'N/A' : formatDate(asset.returnDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTotalAssets;
