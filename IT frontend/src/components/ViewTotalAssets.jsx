


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
