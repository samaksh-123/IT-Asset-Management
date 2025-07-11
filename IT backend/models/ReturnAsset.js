const mongoose = require('mongoose');

const returnAssetSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  issuedDate: Date,
  returnTo:String,
  returnReason:String,
  remark: String,
  returnedDate: { type: Date, required:true, },
  status: { type: String, default: 'Returned' }

});

module.exports = mongoose.model('ReturnAsset', returnAssetSchema);




