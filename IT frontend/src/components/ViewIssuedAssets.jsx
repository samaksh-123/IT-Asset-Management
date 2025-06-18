
import React, { useEffect, useState } from 'react';
import { fetchIssuedAssets } from '../api';    // deleteIssuedAsset, updateIssuedAsset
import { FaEdit, FaTrash } from 'react-icons/fa';
import { exportToExcel } from '../utils/exportToExcel';
 
const ViewIssuedAssets = () => {
  const [issuedAssets, setIssuedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchIssuedAssets()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.issuedAssets || [];
        setIssuedAssets(data);
        setFilteredAssets(data);
      })
      .catch((err) => console.error('Failed to fetch issued assets', err));
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    applyFilters(type, selectedEmployee, selectedDateFilter, customDate);
  };

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    applyFilters(selectedType, empId, selectedDateFilter, customDate);
  };

  const handleDateFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedDateFilter(filter);
    setCustomDate('');
    applyFilters(selectedType, selectedEmployee, filter, '');
  };

  const handleCustomDateChange = (e) => {
    const date = e.target.value;
    setCustomDate(date);
    setSelectedDateFilter('');
    applyFilters(selectedType, selectedEmployee, '', date);
  };

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

  const uniqueTypes = [...new Set(issuedAssets.map(issue => issue.assetId?.type).filter(Boolean))];
  const uniqueEmployees = [...new Map(
    issuedAssets
      .filter(issue => issue.employeeId)
      .map(issue => [issue.employeeId._id, issue.employeeId])
  ).values()];

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this issued asset?')) return;
  //   await deleteIssuedAsset(id);
  //   const updated = issuedAssets.filter(item => item._id !== id);
  //   setIssuedAssets(updated);
  //   setFilteredAssets(updated);
  // };

  // const handleEditClick = (item) => {
  //   setEditingId(item._id);
  //   setEditForm({
  //     type: item.assetId?.type || '',
  //     name: item.assetId?.name || '',
  //     serialNumber: item.assetId?.serialNumber || '',
  //     configuration: item.assetId?.configuration || '',
  //     issuedDate: item.issuedDate ? new Date(item.issuedDate).toISOString().slice(0, 10) : ''
  //   });
  // };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };


const handleSaveEdit = async (id) => {
  try {
    const updated = await updateIssuedAsset(id, editForm); // Sends request to backend and gets updated populated data
    setEditingId(null);

    const updatedList = issuedAssets.map(asset =>
      asset._id === id ? updated.data : asset
    );

    setIssuedAssets(updatedList);
    setFilteredAssets(updatedList);
  } catch (error) {
    console.error('Failed to save edited asset:', error);
    alert('Failed to save changes. Please try again.');
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
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

  return (
    <div>
      <h2>Issued Assets</h2>

      {/* Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label> Filter by Type: </label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="all">All</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label> Filer by Employee: </label>
          <select value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="all">All</option>
            {uniqueEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Date Filter: </label>
          <select value={selectedDateFilter} onChange={handleDateFilterChange}>
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 Days</option>
          </select>
        </div>

        <div>
          <label>Or Pick Date: </label>
          <input type="date" value={customDate} onChange={handleCustomDateChange} />
        </div>
      </div>

      <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Showing {filteredAssets.length} issued asset{filteredAssets.length !== 1 ? 's' : ''}.
      </div>

      {/* Export Button */}
      {filteredAssets.length > 0 && (
        <button
          onClick={handleExport}
          style={{
            marginBottom: '1rem',
            float: 'right',
            backgroundColor: '#2980b9', 
            color: 'white',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width:'auto',
          }}
        >
          Export to Excel
        </button>
      )}

      {/* Table */}
      {filteredAssets.length === 0 ? (
        <p>No assets issued with current filter.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Asset Name</th>
              <th>Serial Number</th>
              <th>Configuration</th>
              <th>Issued To</th>
              <th>Department</th>
              <th>Issued Date</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((issue) => (
              <tr key={issue._id}>
                {editingId === issue._id ? (
                  <>
                    <td><input value={editForm.type} onChange={(e) => handleEditChange('type', e.target.value)} /></td>
                    <td><input value={editForm.name} onChange={(e) => handleEditChange('name', e.target.value)} /></td>
                    <td><input value={editForm.serialNumber} onChange={(e) => handleEditChange('serialNumber', e.target.value)} /></td>
                    <td><input value={editForm.configuration} onChange={(e) => handleEditChange('configuration', e.target.value)} /></td>
                    <td>{issue.employeeId?.name || 'N/A'}</td>
                    <td>{issue.departmentId?.name || 'N/A'}</td>
                    <td><input type="date" value={editForm.issuedDate} onChange={(e) => handleEditChange('issuedDate', e.target.value)} /></td>
                    <td>
                      <button onClick={() => handleSaveEdit(issue._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{issue.assetId?.type || 'N/A'}</td>
                    <td>{issue.assetId?.name || 'N/A'}</td>
                    <td>{issue.assetId?.serialNumber || 'N/A'}</td>
                    <td>{issue.assetId?.configuration || 'N/A'}</td>
                    <td>{issue.employeeId?.name || 'N/A'}</td>
                    <td>{issue.departmentId?.name || 'N/A'}</td>
                    <td>{formatDate(issue.issuedDate)}</td>
                    {/* <td>
                      <FaEdit style={{ cursor: 'pointer', color: '#555', marginRight: '10px' }} onClick={() => handleEditClick(issue)} />
                      <FaTrash style={{ cursor: 'pointer', color: '#555' }} onClick={() => handleDelete(issue._id)} />
                    </td> */}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewIssuedAssets;




