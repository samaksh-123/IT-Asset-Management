


import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddAssetForm from './components/AddAssetForm.jsx';
import IssueAssetForm from './components/IssueAssetForm.jsx';
import ViewAssets from './components/ViewAssets.jsx';
import ViewIssuedAssets from './components/ViewIssuedAssets.jsx';
import AddDepartment from './components/AddDepartment.jsx';
import AddEmployee from './components/AddEmployees.jsx';
import ReturnAsset from './components/ReturnAsset.jsx';             // ✅ NEW
import ViewReturnedAssets from './components/ViewReturnedAssets.jsx'; // ✅ NEW
import ViewEmployees from './components/ViewEmployees.jsx';

import './App.css';
import ViewDepartment from './components/ViewDepartment.jsx';
import ViewTotalAssets from './components/ViewTotalAssets.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'add-asset': return <AddAssetForm />;
      case 'issue-asset': return <IssueAssetForm />;
      case 'view-assets': return <ViewAssets />;
      case 'view-issued': return <ViewIssuedAssets />;
      case 'return-asset': return <ReturnAsset />; // ✅ NEW
      case 'view-returned': return <ViewReturnedAssets />; // ✅ NEW
      case 'add-department': return <AddDepartment />;
      case 'add-employee': return <AddEmployee />;
      case 'view-employee':return<ViewEmployees/>;
      case 'view-department':return<ViewDepartment/>;
      case 'view-total':return<ViewTotalAssets/>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="main-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default App;
