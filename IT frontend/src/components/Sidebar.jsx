import React from 'react';

const Sidebar = ({ setActiveTab }) => (
  <div className="sidebar">
    {/* <h2>Hello IT Admin</h2>
    <h3>itadmin@oswalcables.com</h3> */}
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
     <li onClick={() => setActiveTab('view-scrapped')}>View Scrapped Assets</li> {/* ✅ NEW */}
    </ul>
  </div>
);

export default Sidebar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import'./Sidebar.css'

// const Sidebar = () => (
//   <div className="sidebar">
//     <ul>
//       <li><Link to="/dashboard">Dashboard</Link></li>
//       <li><Link to="/add-asset">Add Asset</Link></li>
//       <li><Link to="/add-department">Add Department</Link></li>
//       <li><Link to="/add-employee">Add Employee</Link></li>
//       <li><Link to="/issue-asset">Issue Asset</Link></li>
//       <li><Link to="/return-asset">Return Asset</Link></li>
//       <li><Link to="/view-assets">View Available Assets</Link></li>
//       <li><Link to="/view-department">View Department</Link></li>
//       <li><Link to="/view-employee">View Employee</Link></li>
//       <li><Link to="/view-issued">View Issued Assets</Link></li>
//       <li><Link to="/view-returned">View Returned Assets</Link></li>
//       <li><Link to="/view-total">View Total Assets</Link></li>
//       <li><Link to="/view-scrapped">View Scrapped Assets</Link></li>
//     </ul>
//   </div>
// );

// export default Sidebar;
