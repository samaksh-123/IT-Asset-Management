import React from 'react';

const Sidebar = ({ setActiveTab }) => (
  <div className="sidebar">
    <h2>Hello IT Admin</h2>
    <h3>itadmin@oswalcables.com</h3>
    <ul>
      <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
      <li onClick={() => setActiveTab('add-asset')}>Add Asset</li>
      <li onClick={() => setActiveTab('add-department')}>Add Department</li>
      <li onClick={() => setActiveTab('add-employee')}>Add Employee</li>
       <li onClick={() => setActiveTab('issue-asset')}>Issue Asset</li>
      <li onClick={() => setActiveTab('return-asset')}>Return Asset</li> {/* ✅ NEW */}
      <li onClick={() => setActiveTab('view-assets')}>View Available Assets</li>
       <li onClick={() => setActiveTab('view-department')}>View Department</li>
       <li onClick={() => setActiveTab('view-employee')}>View Employee</li>
      <li onClick={() => setActiveTab('view-issued')}>View Issued Assets</li>
       <li onClick={() => setActiveTab('view-returned')}>View Returned Assets</li> {/* ✅ NEW */}
      <li onClick={() => setActiveTab('view-total')}>View Total Assets</li> {/* ✅ NEW */}
     
    </ul>
  </div>
);

export default Sidebar;
