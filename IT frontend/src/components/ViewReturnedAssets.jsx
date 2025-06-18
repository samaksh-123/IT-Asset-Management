import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaTrash } from 'react-icons/fa';

const ViewReturnedAssets = () => {
  const [returns, setReturns] = useState([]);
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await axios.get('https://it-asset-management-u60k.onrender.com/api/returns');
      const data = Array.isArray(res.data) ? res.data : res.data.returns || [];
      setReturns(data);
      setFilteredReturns(data);
    } catch (err) {
      console.error('Failed to fetch returned assets', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'null') return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-GB');
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    applyFilters(value, selectedEmployee, selectedDate);
  };

  const handleEmployeeChange = (e) => {
    const value = e.target.value;
    setSelectedEmployee(value);
    applyFilters(selectedType, value, selectedDate);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    applyFilters(selectedType, selectedEmployee, value);
  };

  const applyFilters = (type, empId, date) => {
    let filtered = returns;

    if (type !== 'all') {
      filtered = filtered.filter(item => item.assetId?.type === type);
    }

    if (empId !== 'all') {
      filtered = filtered.filter(item => item.employeeId?._id === empId);
    }

    if (date) {
      filtered = filtered.filter(item => {
        const returned = new Date(item.returnedDate).toISOString().slice(0, 10);
        return returned === date;
      });
    }

    setFilteredReturns(filtered);
  };

  const uniqueTypes = [...new Set(returns.map(item => item.assetId?.type).filter(Boolean))];
  const uniqueEmployees = [...new Map(
    returns
      .filter(item => item.employeeId)
      .map(item => [item.employeeId._id, item.employeeId])
  ).values()];

  const handleExport = () => {
    const data = filteredReturns.map(item => ({
      Type: item.assetId?.type || 'N/A',
      Name: item.assetId?.name || 'N/A',
      SerialNumber: item.assetId?.serialNumber || 'N/A',
      Configuration: item.assetId?.configuration || 'N/A',
      Employee: item.employeeId?.name || 'N/A',
      Department: item.departmentId?.name || 'N/A',
      ReturnedTo: item.returnTo || 'N/A',
      ReturnReason: item.returnReason || 'N/A',
      IssuedDate: formatDate(item.issuedDate),
      ReturnedDate: formatDate(item.returnedDate),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReturnedAssets");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `Returned_Assets_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Optional delete function can be re-enabled if needed
  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this returned asset record?");
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`https://it-asset-management-u60k.onrender.com/api/returns/${id}`);
  //     alert("Deleted successfully.");
  //     fetchReturns();
  //   } catch (err) {
  //     console.error("Error deleting returned asset:", err);
  //     alert("Failed to delete record.");
  //   }
  // };

  return (
    <div>
      <h2>Returned Assets</h2>

      {/* Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>Filter by Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Filter by Employee: </label>
          <select value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="all">All</option>
            {uniqueEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Filter by Return Date: </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
      </div>

      <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Showing {filteredReturns.length} returned asset{filteredReturns.length !== 1 && 's'}.
      </div>

      {/* Export Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={handleExport}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2980b9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: 'auto'
          }}
        >
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Asset Name</th>
            <th>Serial Number</th>
            <th>Configuration</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Returned To</th>
            <th>Return Reason</th>
            <th>Issued Date</th>
            <th>Returned Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredReturns.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: 'center' }}>No returned assets found</td>
            </tr>
          ) : (
            filteredReturns.map((item) => (
              <tr key={item._id}>
                <td>{item.assetId?.type || 'N/A'}</td>
                <td>{item.assetId?.name || 'N/A'}</td>
                <td>{item.assetId?.serialNumber || 'N/A'}</td>
                <td>{item.assetId?.configuration || 'N/A'}</td>
                <td>{item.employeeId?.name || 'N/A'}</td>
                <td>{item.departmentId?.name || 'N/A'}</td>
                <td>{item.returnTo || 'N/A'}</td>
                <td>{item.returnReason || 'N/A'}</td>
                <td>{formatDate(item.issuedDate)}</td>
                <td>{formatDate(item.returnedDate)}</td>
                {/* <td>
                  <FaTrash
                    style={{ color: '#555', cursor: 'pointer' }}
                    onClick={() => handleDelete(item._id)}
                    title="Delete record"
                  />
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReturnedAssets;
