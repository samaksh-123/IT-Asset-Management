// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   name: String,
//   departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
// });

// module.exports = mongoose.model('Employee', employeeSchema);


const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
