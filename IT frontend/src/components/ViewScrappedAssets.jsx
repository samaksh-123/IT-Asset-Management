import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ViewScrappedAssets = () => {
  const [scrappedAssets, setScrappedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchScrappedAssets();
  }, []);

  const fetchScrappedAssets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/returns');
      const data = Array.isArray(res.data) ? res.data : res.data.returns || [];

      // ✅ Only assets with status "Scrapped"
      const scrapped = data.filter(item => item.status === 'Scrapped');
      setScrappedAssets(scrapped);
      setFilteredAssets(scrapped);
    } catch (err) {
      console.error('Failed to fetch scrapped assets', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'null') return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-GB');
  };

  const applyFilters = (type, empId, date) => {
    let filtered = scrappedAssets;

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

    setFilteredAssets(filtered);
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

  const handleExport = () => {
    const data = filteredAssets.map(item => ({
      Type: item.assetId?.type || 'N/A',
      Name: item.assetId?.name || 'N/A',
      SerialNumber: item.assetId?.serialNumber || 'N/A',
      Configuration: item.assetId?.configuration || 'N/A',
      Employee: item.employeeId?.name || 'N/A',
      Department: item.departmentId?.name || 'N/A',
      ReturnedTo: item.returnTo || 'N/A',
      ReturnReason: item.returnReason || 'N/A',
      Remark: item.remark || 'N/A',
      IssuedDate: formatDate(item.issuedDate),
      ReturnedDate: formatDate(item.returnedDate),
      Status: item.status || 'Scrapped',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ScrappedAssets");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `Scrapped_Assets_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const uniqueTypes = [...new Set(scrappedAssets.map(item => item.assetId?.type).filter(Boolean))];
  const uniqueEmployees = [...new Map(
    scrappedAssets
      .filter(item => item.employeeId)
      .map(item => [item.employeeId._id, item.employeeId])
  ).values()];

  return (
    <div>
      <h2>Scrapped Assets</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Employee: </label>
          <select value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="all">All</option>
            {uniqueEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Return Date: </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
      </div>

      {/* Export Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', width: '100%' }}>

        <button
          onClick={handleExport}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2980b9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width:'auto'
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
            <th>Remark</th>
            <th>Issued Date</th>
            <th>Returned Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.length === 0 ? (
            <tr><td colSpan="12" style={{ textAlign: 'center' }}>No scrapped assets found</td></tr>
          ) : (
            filteredAssets.map(item => (
              <tr key={item._id}>
                <td>{item.assetId?.type || 'N/A'}</td>
                <td>{item.assetId?.name || 'N/A'}</td>
                <td>{item.assetId?.serialNumber || 'N/A'}</td>
                <td>{item.assetId?.configuration || 'N/A'}</td>
                <td>{item.employeeId?.name || 'N/A'}</td>
                <td>{item.departmentId?.name || 'N/A'}</td>
                <td>{item.returnTo || 'N/A'}</td>
                <td>{item.returnReason || 'N/A'}</td>
                <td>{item.remark || 'N/A'}</td>
                <td>{formatDate(item.issuedDate)}</td>
                <td>{formatDate(item.returnedDate)}</td>
                <td style={{ color: 'red', fontWeight: 'bold' }}>{item.status || 'Scrapped'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewScrappedAssets;
