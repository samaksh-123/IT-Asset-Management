const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: String,
  name: String,
  manufacturer: String,
  configuration: String,
  serialNumber: String,
  invoiceNumber: String,
  location:String,
  status: String,
  dateAdded: { type: Date, 
    required: true },
   issued: {
    type: Boolean,
    default: false, // ✅ important!
  }
});

module.exports = mongoose.model('Asset', assetSchema);
