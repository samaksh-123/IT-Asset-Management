
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  issuedDate: { type: Date, required: true },
});

module.exports = mongoose.model('Issue', issueSchema);

