// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, deleteAsset, updateAsset } from '../api';
// import './ViewAssets.css';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const ViewAssets = () => {
//   const [assets, setAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedDateFilter, setSelectedDateFilter] = useState('');
//   const [customDate, setCustomDate] = useState('');

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   const loadAssets = () => {
//     fetchAvailableAssets()
//       .then(res => {
//         setAssets(res.data);
//         setFilteredAssets(res.data);
//       })
//       .catch(err => console.error('Error fetching assets:', err));
//   };

//   const filterAssets = (type, dateFilter, customDate) => {
//     let filtered = [...assets];

//     if (type && type !== 'all') {
//       filtered = filtered.filter(a => a.type === type);
//     }

//     if (dateFilter || customDate) {
//       const now = new Date();
//       filtered = filtered.filter(asset => {
//         const assetDate = new Date(asset.dateAdded);
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

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);
//     filterAssets(type, selectedDateFilter, customDate);
//   };

//   const handleDateFilterChange = (e) => {
//     const dateFilter = e.target.value;
//     setSelectedDateFilter(dateFilter);
//     setCustomDate(''); // reset custom if using predefined
//     filterAssets(selectedType, dateFilter, '');
//   };

//   const handleCustomDateChange = (e) => {
//     const date = e.target.value;
//     setCustomDate(date);
//     setSelectedDateFilter(''); // reset predefined if using custom
//     filterAssets(selectedType, '', date);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this asset?')) {
//       deleteAsset(id)
//         .then(() => loadAssets())
//         .catch(err => console.error('Delete failed:', err));
//     }
//   };

//   const handleEdit = (asset) => {
//     const updated = {
//       type: prompt('Enter type', asset.type) || asset.type,
//       name: prompt('Enter name', asset.name) || asset.name,
//       manufacturer: prompt('Enter manufacturer', asset.manufacturer) || asset.manufacturer,
//       configuration: prompt('Enter Configuration', asset.configuration) || asset.configuration,
//       serialNumber: prompt('Enter serial number', asset.serialNumber) || asset.serialNumber,
//       status: prompt('Enter status', asset.status) || asset.status,
//       location: prompt('Enter location', asset.location) || asset.location,
//       dateAdded: prompt('Enter date added (YYYY-MM-DD)', asset.dateAdded?.split('T')[0]) || asset.dateAdded,
//     };

//     updateAsset(asset._id, updated)
//       .then(() => loadAssets())
//       .catch((err) => console.error('Update failed:', err));
//   };

//   const assetTypes = [...new Set(assets.map(a => a.type))];

//   const formatDate = (dateString) => {
//     if (!dateString || dateString === 'null') return 'N/A';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <div className="table-container">
//       <h3>Available Assets</h3>

//       {/* Type Filter */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="type-select">Filter by Type: </label>
//         <select id="type-select" value={selectedType} onChange={handleTypeChange}>
//           <option value="all">All</option>
//           {assetTypes.map((type, idx) => (
//             <option key={idx} value={type}>{type}</option>
//           ))}
//         </select>
//       </div>

//       {/* Date Filter Dropdown */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="date-filter">Predefined Date Filter: </label>
//         <select id="date-filter" value={selectedDateFilter} onChange={handleDateFilterChange}>
//           <option value="">All Dates</option>
//           <option value="today">Today</option>
//           <option value="yesterday">Yesterday</option>
//           <option value="last7">Last 7 Days</option>
//         </select>
//       </div>

//       {/* Custom Date Picker */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="custom-date">Or Choose Specific Date: </label>
//         <input
//           type="date"
//           id="custom-date"
//           value={customDate}
//           onChange={handleCustomDateChange}
//         />
//       </div>

//       {/* Filter Summary */}
//       <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
//         Showing {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} 
//         {selectedType !== '' && selectedType !== 'all' && ` of type "${selectedType}"`}
//         {selectedDateFilter && ` added ${selectedDateFilter}`}
//         {customDate && ` added on ${formatDate(customDate)}`}
//       </div>

//       {/* Table */}
//       {filteredAssets.length === 0 ? (
//         <p>No assets available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Name</th>
//               <th>Manufacturer</th>
//               <th>Configuration</th>
//               <th>Serial Number</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Date Received</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAssets.map((a, idx) => (
//               <tr key={idx}>
//                 <td>{a.type}</td>
//                 <td>{a.name}</td>
//                 <td>{a.manufacturer}</td>
//                 <td>{a.configuration}</td>
//                 <td>{a.serialNumber}</td>
//                 <td>{a.location}</td>
//                 <td>{a.status}</td>
//                 <td>{formatDate(a.dateAdded)}</td>
//                 <td>
//                   <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(a)} />
//                   <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(a._id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewAssets;


import React, { useEffect, useState } from 'react';
import { fetchAvailableAssets  } from '../api';   //deleteAsset, updateAsset
 import './ViewAssets.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { exportToExcel } from '../utils/exportToExcel';

const ViewAssets = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = () => {
    fetchAvailableAssets()
      .then(res => {
        setAssets(res.data);
        setFilteredAssets(res.data);
      })
      .catch(err => console.error('Error fetching assets:', err));
  };

  const filterAssets = (type, dateFilter, customDate) => {
    let filtered = [...assets];
    const now = new Date();

    if (type && type !== 'all') {
      filtered = filtered.filter(a => a.type === type);
    }

    if (dateFilter || customDate) {
      filtered = filtered.filter(asset => {
        const assetDate = new Date(asset.dateAdded);
        const diffTime = now - assetDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (customDate) {
          const selected = new Date(customDate);
          return assetDate.toDateString() === selected.toDateString();
        }

        switch (dateFilter) {
          case 'today':
            return assetDate.toDateString() === now.toDateString();
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
    const type = e.target.value;
    setSelectedType(type);
    filterAssets(type, selectedDateFilter, customDate);
  };

  const handleDateFilterChange = (e) => {
    const dateFilter = e.target.value;
    setSelectedDateFilter(dateFilter);
    setCustomDate('');
    filterAssets(selectedType, dateFilter, '');
  };

  const handleCustomDateChange = (e) => {
    const date = e.target.value;
    setCustomDate(date);
    setSelectedDateFilter('');
    filterAssets(selectedType, '', date);
  };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this asset?')) {
  //     deleteAsset(id)
  //       .then(() => loadAssets())
  //       .catch(err => console.error('Delete failed:', err));
  //   }
  // };

  // const handleEdit = (asset) => {
  //   const updated = {
  //     type: prompt('Enter type', asset.type) || asset.type,
  //     name: prompt('Enter name', asset.name) || asset.name,
  //     manufacturer: prompt('Enter manufacturer', asset.manufacturer) || asset.manufacturer,
  //     configuration: prompt('Enter Configuration', asset.configuration) || asset.configuration,
  //     serialNumber: prompt('Enter serial number', asset.serialNumber) || asset.serialNumber,
  //     status: prompt('Enter status', asset.status) || asset.status,
  //     location: prompt('Enter location', asset.location) || asset.location,
  //     dateAdded: prompt('Enter date added (YYYY-MM-DD)', asset.dateAdded?.split('T')[0]) || asset.dateAdded,
  //   };

  //   updateAsset(asset._id, updated)
  //     .then(() => loadAssets())
  //     .catch((err) => console.error('Update failed:', err));
  // };

  const handleExport = () => {
    const exportData = filteredAssets.map(asset => ({
      Type: asset.type || 'N/A',
      Name: asset.name || 'N/A',
      Manufacturer: asset.manufacturer || 'N/A',
      Configuration: asset.configuration || 'N/A',
      SerialNumber: asset.serialNumber || 'N/A',
      Location: asset.location || 'N/A',
      Status: asset.status || 'N/A',
      DateAdded: formatDate(asset.dateAdded),
    }));

    exportToExcel(exportData, 'AvailableAssets.xlsx');
  };

  const assetTypes = [...new Set(assets.map(a => a.type))];

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'null') return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h3>Available Assets</h3>

      {/* Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <label>Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {assetTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Date Filter: </label>
          <select value={selectedDateFilter} onChange={handleDateFilterChange}>
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 Days</option>
          </select>
        </div>

        <div>
          <label>Or Pick Date: </label>
          <input type="date" value={customDate} onChange={handleCustomDateChange} />
        </div>

        <div>
          <button onClick={handleExport}
          
           style={{
            padding: '6px 12px',
            backgroundColor: '#2980b9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width:'auto',
          }}>Export to Excel</button>
        </div>
      </div>

      <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Showing {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}.
      </div>

      {/* Table */}
      {filteredAssets.length === 0 ? (
        <p>No assets available.</p>
      ) : (
        <table className='asset-table'>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Configuration</th>
              <th>Serial Number</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date Received</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((a, idx) => (
              <tr key={idx}>
                <td>{a.type}</td>
                <td>{a.name}</td>
                <td>{a.manufacturer}</td>
                <td>{a.configuration}</td>
                <td>{a.serialNumber}</td>
                <td>{a.location}</td>
                <td>{a.status}</td>
                <td>{formatDate(a.dateAdded)}</td>
                {/* <td>
                  <div className='action-icons'>
                  <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(a)} />
                 
                    </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAssets;
