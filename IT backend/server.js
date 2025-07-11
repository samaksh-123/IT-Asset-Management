const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 


const assetRoutes = require('./routes/assetRoutes');
const issueRoutes = require('./routes/issuesRoutes.js');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth');

const returnAssetRoutes = require('./routes/returnAssets');
const connectDB = require('./config/db.js')
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://itadmin:1234@cluster0.5ysgjyp.mongodb.net/?retryWrites=true')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
  

app.use('/api/assets', assetRoutes);
app.use('/api/issued', issueRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/returns', returnAssetRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

