
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('https://it-asset-management-2.onrender.com/api/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`https://it-asset-management-2.onrender.com/api/departments/${id}`);
        fetchDepartments();
      } catch (err) {
        console.error('Error deleting department:', err);
      }
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://it-asset-management-2.onrender.com/api/departments/${id}`, { name: editedName });
      setEditingId(null);
      setEditedName('');
      fetchDepartments();
    } catch (err) {
      console.error('Error updating department:', err);
    }
  };

  const exportToExcel = () => {
    const worksheetData = departments.map((dept, index) => ({
      'S.No.': index + 1,
      'Department Name': dept.name,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Departments');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Departments_List.xlsx');
  };

  return (
    <div className="view-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Departments List</h3>
        <button
          onClick={exportToExcel}
          style={{
            padding: '6px 12px',
            backgroundColor: '#2980b9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width:'auto',
          }}
        >
          Export to Excel
        </button>
      </div>

      {departments.length > 0 ? (
        <table className="department-table">
          <thead>
            <tr>
              <th>Serial NO.</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept._id}>
                <td>{index + 1}</td>
                <td>
                  {editingId === dept._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    dept.name
                  )}
                </td>
                <td>
                  {editingId === dept._id ? (
                    <>
                      <FaSave
                        onClick={() => handleUpdate(dept._id)}
                        style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }}
                      />
                      <FaTimes
                        onClick={() => setEditingId(null)}
                        style={{ cursor: 'pointer', color: '#555' }}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        onClick={() => handleEdit(dept._id, dept.name)}
                        style={{ cursor: 'pointer', marginRight: '10px', color: '#555' }}
                      />
                      <FaTrash
                        onClick={() => handleDelete(dept._id)}
                        style={{ cursor: 'pointer', color: '#555' }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
};

export default ViewDepartment;
