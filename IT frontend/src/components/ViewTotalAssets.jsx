// import React, { useEffect, useState } from 'react';
// import { fetchAvailableAssets, fetchIssuedAssets, fetchReturnedAssets } from '../api';
// import { exportToExcel } from '../utils/exportToExcel';

// const ViewTotalAssets = () => {
//   const [allAssets, setAllAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [selectedType, setSelectedType] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets(),
//       ]);

//       const available = (availableRes.data || []).map((asset) => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         issueDate: null,
//         returnDate: null,
//         employeeName: '—',
//         departmentName: '—',
//       }));

//       const issued = (issuedRes.data || []).map((issue) => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         issueDate: issue.issuedDate,
//         returnDate: null,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A',
//       }));

//       const returned = (returnedRes.data || [])
//         .filter((ret) => ret.assetId && ret.returnedDate)
//         .map((ret) => ({
//           ...ret.assetId,
//           status: 'Returned',
//           date: ret.returnedDate,
//           issueDate: ret.issuedDate,
//           returnDate: ret.returnedDate,
//           employeeName: ret.employeeId?.name || 'N/A',
//           departmentName: ret.departmentId?.name || 'N/A',
//         }));

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
//     if (type !== 'all') filtered = filtered.filter((a) => a.type === type);
//     if (status !== 'all') filtered = filtered.filter((a) => a.status === status);
//     if (date) {
//       const selected = new Date(date);
//       filtered = filtered.filter((a) => {
//         const assetDate = new Date(a.date);
//         return assetDate.toDateString() === selected.toDateString();
//       });
//     }
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map((asset) => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       IssueDate: asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate),
//       ReturnDate: asset.status === 'Returned' ? formatDate(asset.returnDate) : 'N/A',
//     }));
//     exportToExcel(exportData, `TotalAssets_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   const uniqueTypes = [...new Set(allAssets.map((a) => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
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
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>

//         <div>
//           <label>Filter by Date: </label>
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </div>

//         <div style={{ marginLeft: 'auto' }}>
//           <button
//             onClick={handleExport}
//             style={{
//               backgroundColor: '#2980b9',
//               color: 'white',
//               padding: '6px 12px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               height: '38px',
//               width: 'auto',
//             }}
//           >
//             Export to Excel
//           </button>
//         </div>
//       </div>

//       <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
//         Showing {filteredAssets.length} asset{filteredAssets.length !== 1 && 's'}.
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filters.</p>
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
//                 <td>{asset.status === 'Returned' ? formatDate(asset.returnDate) : 'N/A'}</td>
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
//   const [selectedType, setSelectedType] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);
//     if (isNaN(date)) return 'N/A';
//     return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}/${date.getFullYear()}`;
//   };

//   const loadAssets = async () => {
//     try {
//       const [availableRes, issuedRes, returnedRes] = await Promise.all([
//         fetchAvailableAssets(),
//         fetchIssuedAssets(),
//         fetchReturnedAssets(),
//       ]);

//       const available = (availableRes.data || []).map((asset) => ({
//         ...asset,
//         status: 'In Stock',
//         date: asset.addedDate || asset.createdAt,
//         issueDate: null,
//         returnDate: null,
//         employeeName: '—',
//         departmentName: '—',
//         partyName: asset.partyName || 'N/A',
//         price: asset.price || 'N/A',
//         configuration: asset.configuration || 'N/A',
//       }));

//       const issued = (issuedRes.data || []).map((issue) => ({
//         ...issue.assetId,
//         status: 'Issued',
//         date: issue.issuedDate,
//         issueDate: issue.issuedDate,
//         returnDate: null,
//         employeeName: issue.employeeId?.name || 'N/A',
//         departmentName: issue.departmentId?.name || 'N/A',
//         partyName: issue.assetId?.partyName || 'N/A',
//         price: issue.assetId?.price || 'N/A',
//         configuration: issue.assetId?.configuration || 'N/A',
//       }));

//       const returned = (returnedRes.data || [])
//         .filter((ret) => ret.assetId && ret.returnedDate)
//         .map((ret) => ({
//           ...ret.assetId,
//           status: 'Returned',
//           date: ret.returnedDate,
//           issueDate: ret.issuedDate,
//           returnDate: ret.returnedDate,
//           employeeName: ret.employeeId?.name || 'N/A',
//           departmentName: ret.departmentId?.name || 'N/A',
//           partyName: ret.assetId?.partyName || 'N/A',
//           price: ret.assetId?.price || 'N/A',
//           configuration: ret.assetId?.configuration || 'N/A',
//         }));

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
//     if (type !== 'all') filtered = filtered.filter((a) => a.type === type);
//     if (status !== 'all') filtered = filtered.filter((a) => a.status === status);
//     if (date) {
//       const selected = new Date(date);
//       filtered = filtered.filter((a) => {
//         const assetDate = new Date(a.date);
//         return assetDate.toDateString() === selected.toDateString();
//       });
//     }
//     setFilteredAssets(filtered);
//   };

//   const handleExport = () => {
//     const exportData = filteredAssets.map((asset) => ({
//       Name: asset.name,
//       Type: asset.type,
//       Status: asset.status,
//       Configuration: asset.configuration || 'N/A',
//       PartyName: asset.partyName || 'N/A',
//       Price: asset.price ? `₹${asset.price}` : 'N/A',
//       AssignedTo: asset.employeeName,
//       Department: asset.departmentName,
//       IssueDate: asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate),
//       ReturnDate: asset.status === 'Returned' ? formatDate(asset.returnDate) : 'N/A',
//     }));
//     exportToExcel(exportData, `TotalAssets_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   const uniqueTypes = [...new Set(allAssets.map((a) => a.type).filter(Boolean))];

//   return (
//     <div>
//       <h2>Total Assets</h2>

//       <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
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
//             <option value="In Stock">In Stock</option>
//             <option value="Issued">Issued</option>
//             <option value="Returned">Returned</option>
//           </select>
//         </div>

//         <div>
//           <label>Filter by Date: </label>
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </div>

//         <div style={{ marginLeft: 'auto' }}>
//           <button
//             onClick={handleExport}
//             style={{
//               backgroundColor: '#2980b9',
//               color: 'white',
//               padding: '6px 12px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               height: '38px',
//               width: 'auto',
//             }}
//           >
//             Export to Excel
//           </button>
//         </div>
//       </div>

//       <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
//         Showing {filteredAssets.length} asset{filteredAssets.length !== 1 && 's'}.
//       </div>

//       {filteredAssets.length === 0 ? (
//         <p>No assets found with current filters.</p>
//       ) : (
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Configuration</th>
//               <th>Party Name</th>
//               <th>Price</th>
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
//                 <td>{asset.configuration || 'N/A'}</td>
//                 <td>{asset.partyName || 'N/A'}</td>
//                 <td>{asset.price ? `₹${asset.price}` : 'N/A'}</td>
//                 <td>{asset.employeeName}</td>
//                 <td>{asset.departmentName}</td>
//                 <td>{asset.status === 'In Stock' ? 'N/A' : formatDate(asset.issueDate)}</td>
//                 <td>{asset.status === 'Returned' ? formatDate(asset.returnDate) : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewTotalAssets;

import React, { useEffect, useState } from "react";
import {
  fetchAvailableAssets,
  fetchIssuedAssets,
  fetchReturnedAssets,
} from "../api";
import { exportToExcel } from "../utils/exportToExcel";

const ViewTotalAssets = () => {
  const [allAssets, setAllAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const loadAssets = async () => {
    try {
      const [availableRes, issuedRes, returnedRes] = await Promise.all([
        fetchAvailableAssets(),
        fetchIssuedAssets(),
        fetchReturnedAssets(),
      ]);

      const available = (availableRes.data || []).map((asset) => ({
        ...asset,
        status: "In Stock",
        date: asset.addedDate || asset.createdAt,
        issueDate: null,
        returnDate: null,
        employeeName: "—",
        departmentName: "—",
      }));

      const issued = (issuedRes.data || []).map((issue) => ({
        ...issue.assetId,
        status: "Issued",
        date: issue.issuedDate,
        issueDate: issue.issuedDate,
        returnDate: null,
        employeeName: issue.employeeId?.name || "N/A",
        departmentName: issue.departmentId?.name || "N/A",
      }));

      const returned = (returnedRes.data || [])
        .filter((ret) => ret.assetId && ret.returnedDate)
        .map((ret) => ({
          ...ret.assetId,
          status: "Returned",
          date: ret.returnedDate,
          issueDate: ret.issuedDate,
          returnDate: ret.returnedDate,
          employeeName: ret.employeeId?.name || "N/A",
          departmentName: ret.departmentId?.name || "N/A",
        }));

      const combined = [...available, ...issued, ...returned];
      setAllAssets(combined);
      setFilteredAssets(combined);
    } catch (err) {
      console.error("❌ Error loading assets:", err);
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
    if (type !== "all") filtered = filtered.filter((a) => a.type === type);
    if (status !== "all") filtered = filtered.filter((a) => a.status === status);
    if (date) {
      const selected = new Date(date);
      filtered = filtered.filter((a) => {
        const assetDate = new Date(a.date);
        return assetDate.toDateString() === selected.toDateString();
      });
    }
    setFilteredAssets(filtered);
  };

  const handleExport = () => {
    const exportData = filteredAssets.map((asset) => ({
      // AssetCode: asset.assetCode || "N/A",
      Type: asset.type || "N/A",
      Name: asset.name || "N/A",
      Configuration: asset.configuration || "N/A",
      SerialNumber: asset.serialNumber || "N/A",
      Location: asset.location || "N/A",
      Status: asset.status,
      PartyName: asset.partyName || "N/A",
      Price: asset.price ? `₹${asset.price}` : "N/A",
      Warranty: asset.warranty || "N/A",
      Employee: asset.employeeName,
      Department: asset.departmentName,
      IssueDate: asset.status === "In Stock" ? "N/A" : formatDate(asset.issueDate),
      ReturnDate:
        asset.status === "Returned" ? formatDate(asset.returnDate) : "N/A",
      DateAdded: formatDate(asset.dateAdded || asset.createdAt),
      Invoice: asset.invoiceFile ? "Attached" : "N/A",
    }));
    exportToExcel(
      exportData,
      `TotalAssets_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const uniqueTypes = [
    ...new Set(allAssets.map((a) => a.type).filter(Boolean)),
  ];

  return (
    <div>
      <h2>Total Assets</h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <label>Filter by Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
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

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={handleExport}
            style={{
              backgroundColor: "#2980b9",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              height: "38px",
              width: "auto",
            }}
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Showing {filteredAssets.length} asset
        {filteredAssets.length !== 1 && "s"}.
      </div>

      {/* Table */}
      {filteredAssets.length === 0 ? (
        <p>No assets found with current filters.</p>
      ) : (
        <table
          border="1"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              {/* <th>Asset Code</th> */}
              <th>Type</th>
              <th>Name</th>
              <th>Configuration</th>
              <th>Serial Number</th>
              <th>Location</th>
              <th>Status</th>
              <th>Party Name</th>
              <th>Price (₹)</th>
              <th>Warranty</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Date Added</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, idx) => (
              <tr key={idx}>
                {/* <td>{asset.assetCode || "N/A"}</td> */}
                <td>{asset.type || "N/A"}</td>
                <td>{asset.name || "N/A"}</td>
                <td>{asset.configuration || "N/A"}</td>
                <td>{asset.serialNumber || "N/A"}</td>
                <td>{asset.location || "N/A"}</td>
                <td>{asset.status}</td>
                <td>{asset.partyName || "N/A"}</td>
                <td>{asset.price ? `₹${asset.price}` : "N/A"}</td>
                <td>{asset.warranty || "N/A"}</td>
                <td>{asset.employeeName}</td>
                <td>{asset.departmentName}</td>
                <td>
                  {asset.status === "In Stock"
                    ? "N/A"
                    : formatDate(asset.issueDate)}
                </td>
                <td>
                  {asset.status === "Returned"
                    ? formatDate(asset.returnDate)
                    : "N/A"}
                </td>
                <td>{formatDate(asset.dateAdded || asset.createdAt)}</td>
                <td>
                  {asset.invoiceFile ? (
                    <a
                      href={`http://localhost:5000/uploads/invoice/${asset.invoiceFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2980b9", textDecoration: "underline" }}
                    >
                      View Invoice
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTotalAssets;
