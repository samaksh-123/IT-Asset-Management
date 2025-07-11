import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddAssetForm from './components/AddAssetForm.jsx';
import IssueAssetForm from './components/IssueAssetForm.jsx';
import ViewAssets from './components/ViewAssets.jsx';
import ViewIssuedAssets from './components/ViewIssuedAssets.jsx';
import AddDepartment from './components/AddDepartment.jsx';
import AddEmployee from './components/AddEmployees.jsx';
import ReturnAsset from './components/ReturnAsset.jsx';
import ViewReturnedAssets from './components/ViewReturnedAssets.jsx';
import ViewEmployees from './components/ViewEmployees.jsx';
import ViewDepartment from './components/ViewDepartment.jsx';
import ViewTotalAssets from './components/ViewTotalAssets.jsx';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ViewScrappedAssets from './components/ViewScrappedAssets.jsx';

import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'add-asset': return <AddAssetForm />;
      case 'issue-asset': return <IssueAssetForm />;
      case 'view-assets': return <ViewAssets />;
      case 'view-issued': return <ViewIssuedAssets />;
      case 'return-asset': return <ReturnAsset />;
      case 'view-returned': return <ViewReturnedAssets />;
      case 'add-department': return <AddDepartment />;
      case 'add-employee': return <AddEmployee />;
      case 'view-employee': return <ViewEmployees />;
      case 'view-department': return <ViewDepartment />;
      case 'view-total': return <ViewTotalAssets />;
      case 'view-scrapped': return <ViewScrappedAssets />;
      default: return <Dashboard />;
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar setActiveTab={setActiveTab} />
                <div className="main-content">
                  {renderTab()}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// import Sidebar from './components/Sidebar.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import AddAssetForm from './components/AddAssetForm.jsx';
// import IssueAssetForm from './components/IssueAssetForm.jsx';
// import ViewAssets from './components/ViewAssets.jsx';
// import ViewIssuedAssets from './components/ViewIssuedAssets.jsx';
// import AddDepartment from './components/AddDepartment.jsx';
// import AddEmployee from './components/AddEmployees.jsx';
// import ReturnAsset from './components/ReturnAsset.jsx';
// import ViewReturnedAssets from './components/ViewReturnedAssets.jsx';
// import ViewEmployees from './components/ViewEmployees.jsx';
// import ViewDepartment from './components/ViewDepartment.jsx';
// import ViewTotalAssets from './components/ViewTotalAssets.jsx';

// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './components/Navbar.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import ViewScrappedAssets from './components/ViewScrappedAssets.jsx';

// import './App.css';

// const AppContent = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const location = useLocation();

//   const renderTab = () => {
//     switch (activeTab) {
//       case 'dashboard': return <Dashboard />;
//       case 'add-asset': return <AddAssetForm />;
//       case 'issue-asset': return <IssueAssetForm />;
//       case 'view-assets': return <ViewAssets />;
//       case 'view-issued': return <ViewIssuedAssets />;
//       case 'return-asset': return <ReturnAsset />;
//       case 'view-returned': return <ViewReturnedAssets />;
//       case 'add-department': return <AddDepartment />;
//       case 'add-employee': return <AddEmployee />;
//       case 'view-employee': return <ViewEmployees />;
//       case 'view-department': return <ViewDepartment />;
//       case 'view-total': return <ViewTotalAssets />;
//       case 'view-scrapped': return <ViewScrappedAssets />;
//       default: return <Dashboard />;
//     }
//   };

//   return (
//     <>
//       {location.pathname === '/dashboard' && <Navbar />}
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <div className="app">
//                 <Sidebar setActiveTab={setActiveTab} />
//                 <div className="main-content">
//                   {renderTab()}
//                 </div>
//               </div>
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect root to login */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </>
//   );
// };

// const App = () => (
//   <Router>
//     <AppContent />
//   </Router>
// );

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Sidebar from './components/Sidebar.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import AddAssetForm from './components/AddAssetForm.jsx';
// import IssueAssetForm from './components/IssueAssetForm.jsx';
// import ViewAssets from './components/ViewAssets.jsx';
// import ViewIssuedAssets from './components/ViewIssuedAssets.jsx';
// import AddDepartment from './components/AddDepartment.jsx';
// import AddEmployee from './components/AddEmployees.jsx';
// import ReturnAsset from './components/ReturnAsset.jsx';
// import ViewReturnedAssets from './components/ViewReturnedAssets.jsx';
// import ViewEmployees from './components/ViewEmployees.jsx';
// import ViewDepartment from './components/ViewDepartment.jsx';
// import ViewTotalAssets from './components/ViewTotalAssets.jsx';
// import ViewScrappedAssets from './components/ViewScrappedAssets.jsx';

// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './components/Navbar.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// import './App.css';

// // ✅ Layout: Only Navbar
// const WithNavbar = ({ children }) => (
//   <>
//     <Navbar />
//     {children}
//   </>
// );

// // ✅ Layout: Sidebar only (NO Navbar)
// const WithSidebar = ({ children }) => (
//   <div className="app">
//     <Sidebar />
//     <div className="main-content">{children}</div>
//   </div>
// );

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes with Navbar */}
//         <Route path="/login" element={<WithNavbar><Login /></WithNavbar>} />
//         <Route path="/register" element={<WithNavbar><Register /></WithNavbar>} />

//         {/* Dashboard with Navbar + Sidebar */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <WithNavbar>
//                 <WithSidebar>
//                   <Dashboard />
//                 </WithSidebar>
//               </WithNavbar>
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected internal pages: Sidebar only (NO navbar) */}
//         <Route path="/add-asset" element={<ProtectedRoute><WithSidebar><AddAssetForm /></WithSidebar></ProtectedRoute>} />
//         <Route path="/issue-asset" element={<ProtectedRoute><WithSidebar><IssueAssetForm /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-assets" element={<ProtectedRoute><WithSidebar><ViewAssets /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-issued" element={<ProtectedRoute><WithSidebar><ViewIssuedAssets /></WithSidebar></ProtectedRoute>} />
//         <Route path="/return-asset" element={<ProtectedRoute><WithSidebar><ReturnAsset /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-returned" element={<ProtectedRoute><WithSidebar><ViewReturnedAssets /></WithSidebar></ProtectedRoute>} />
//         <Route path="/add-department" element={<ProtectedRoute><WithSidebar><AddDepartment /></WithSidebar></ProtectedRoute>} />
//         <Route path="/add-employee" element={<ProtectedRoute><WithSidebar><AddEmployee /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-employee" element={<ProtectedRoute><WithSidebar><ViewEmployees /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-department" element={<ProtectedRoute><WithSidebar><ViewDepartment /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-total" element={<ProtectedRoute><WithSidebar><ViewTotalAssets /></WithSidebar></ProtectedRoute>} />
//         <Route path="/view-scrapped" element={<ProtectedRoute><WithSidebar><ViewScrappedAssets /></WithSidebar></ProtectedRoute>} />

//         {/* Redirect unknown routes */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
