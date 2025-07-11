const express = require('express');
const router = express.Router();
const Issue = require('../models/IssueAsset');
const Asset = require('../models/Asset');

// Get all issued assets
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('assetId')
      .populate('employeeId')
      .populate('departmentId');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Issue a new asset
router.post('/', async (req, res) => {
  try {
    const { assetId, employeeId, departmentId, issuedDate } = req.body;

    const newIssue = new Issue({
      assetId,
      employeeId,
      departmentId,
      issuedDate,
    });

    await newIssue.save();
    await Asset.findByIdAndUpdate(assetId, { issued: true });

    res.status(201).json(newIssue);
  } catch (err) {
    console.error('Error issuing asset:', err);
    res.status(500).json({ message: err.message });
  }
});


router.post('/issued', async (req, res) => {
  try {
    const { assetId, employeeId, departmentId, issuedDate } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    const issued = new Issue({
      assetInfo: {
        type: asset.type,
        name: asset.name,
        serialNumber: asset.serialNumber,
        configuration: asset.configuration
      },
      employeeId,
      departmentId,
      issuedDate
    });

    await issued.save();
    res.status(201).json(issued);
  } catch (error) {
    console.error('Issue creation error:', error);
    res.status(500).json({ error: 'Failed to issue asset' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    // console.log('Trying to delete:', req.params.id);
    const deleted = await Issue.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Issued Asset not found' });
    }
    res.json({ message: 'Asset deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { type, name, serialNumber, configuration, issuedDate } = req.body;

    // Find the issue
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issued Asset not found' });

    // Update the asset fields
    if (issue.assetId) {
      await Asset.findByIdAndUpdate(issue.assetId, {
        type,
        name,
        serialNumber,
        configuration
      });
    }

    // Update the issued date
    issue.issuedDate = issuedDate;
    await issue.save();

    const updated = await Issue.findById(req.params.id)
      .populate('assetId')
      .populate('employeeId')
      .populate('departmentId');

    res.status(200).json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Issue = require('../models/IssueAsset');
// const Asset = require('../models/Asset');

// // ✅ Get all issued assets
// router.get('/', async (req, res) => {
//   try {
//     const issues = await Issue.find()
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');
//     res.json(issues);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Issue a new asset (with populated response)
// router.post('/', async (req, res) => {
//   try {
//     const { assetId, employeeId, departmentId, issuedDate } = req.body;

//     const newIssue = new Issue({
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//     });

//     await newIssue.save();
//     await Asset.findByIdAndUpdate(assetId, { issued: true });

//     // ✅ Populate before sending response
//     const populatedIssue = await Issue.findById(newIssue._id)
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(201).json(populatedIssue);
//   } catch (err) {
//     console.error('Error issuing asset:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ❌ (Optional) This /issued route seems like an outdated version — recommend removing
// router.post('/issued', async (req, res) => {
//   try {
//     const { assetId, employeeId, departmentId, issuedDate } = req.body;

//     const asset = await Asset.findById(assetId);
//     if (!asset) return res.status(404).json({ error: 'Asset not found' });

//     const issued = new Issue({
//       assetInfo: {
//         type: asset.type,
//         name: asset.name,
//         serialNumber: asset.serialNumber,
//         configuration: asset.configuration
//       },
//       employeeId,
//       departmentId,
//       issuedDate
//     });

//     await issued.save();

//     // ✅ Optional: populate if you use this route
//     const populated = await Issue.findById(issued._id)
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(201).json(populated);
//   } catch (error) {
//     console.error('Issue creation error:', error);
//     res.status(500).json({ error: 'Failed to issue asset' });
//   }
// });

// // ✅ Delete an issued asset
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Issue.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Issued Asset not found' });
//     }
//     res.json({ message: 'Asset deleted successfully' });
//   } catch (err) {
//     console.error('Delete error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Update issued asset
// router.put('/:id', async (req, res) => {
//   try {
//     const { type, name, serialNumber, configuration, issuedDate } = req.body;

//     const issue = await Issue.findById(req.params.id);
//     if (!issue) return res.status(404).json({ error: 'Issued Asset not found' });

//     // Update related asset fields
//     if (issue.assetId) {
//       await Asset.findByIdAndUpdate(issue.assetId, {
//         type,
//         name,
//         serialNumber,
//         configuration
//       });
//     }

//     issue.issuedDate = issuedDate;
//     await issue.save();

//     const updated = await Issue.findById(req.params.id)
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(200).json(updated);
//   } catch (err) {
//     console.error('Update error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
