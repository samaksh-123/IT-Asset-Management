import React, { useEffect, useState } from 'react';
import avatar from '../assets/avtar.png';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF5E7E'];

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [assetStats, setAssetStats] = useState([]);

  useEffect(() => {
    // Fetch employee count
    axios.get('https://it-asset-management-u60k.onrender.com/api/employees')
      .then(res => {
        if (Array.isArray(res.data)) {
          setTotalEmployees(res.data.length);
        }
      })
      .catch(err => console.error("Failed to fetch employees:", err));

    // Fetch available assets and generate stats
    axios.get('https://it-asset-management-u60k.onrender.com/api/assets')
      .then(res => {
        generateAssetStats(res.data);
      })
      .catch(err => console.error("Failed to fetch assets:", err));
  }, []);

  const generateAssetStats = (assetList) => {
    const counts = {};
    assetList.forEach(asset => {
      const type = asset.type || 'Unknown';
      counts[type] = (counts[type] || 0) + 1;
    });

    const stats = Object.entries(counts).map(([type, count]) => ({
      name: type,
      value: count
    }));

    setAssetStats(stats);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Welcome Card */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#e0ffe0',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <img src={avatar} alt="Avatar" style={{ width: '80px', borderRadius: '50%', marginRight: '20px' }} />
          <div>
            <h3>Welcome, IT Admin</h3>
            <p>Email: itadmin@oswalcables.com</p>
          </div>
        </div>

        {/* Total Employees Card */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#e0ffe0',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Total Employees</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalEmployees}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ marginTop: '40px', width: '100%', height: '400px' }}>
        <h3>Total Assets by Type</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={assetStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {assetStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;


