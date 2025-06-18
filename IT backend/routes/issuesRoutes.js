

// const express = require('express');
// const router = express.Router();
// const Issue = require('../models/IssueAsset');
// const Asset = require('../models/Asset');

// // Get all issued assets
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

// // Issue a new asset
// router.post('/', async (req, res) => {
//   try {
//     const { assetId, employeeId, departmentId, issuedDate } = req.body;

//     const newIssue = new Issue({
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//     });

//     // Save the issue
//     await newIssue.save();

//     // ❌ Delete the asset from Asset collection after issuing
//     await Asset.findByIdAndUpdate(assetId,{issued:true});

//     res.status(201).json(newIssue);
//   } catch (err) {
//     console.error('Error issuing asset:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // DELETE issued asset
// router.delete('/:id', async (req, res) => {
//   await Issue.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // PUT update issued asset
// router.put('/:id', async (req, res) => {
//   const updated = await IssueAsset.findByIdAndUpdate(req.params.id, {
//     $set: {
//       'assetId.type': req.body.type,
//       'assetId.name': req.body.name,
//       'assetId.serialNumber': req.body.serialNumber,
//       issuedDate: req.body.issuedDate,
//     }
//   }, { new: true });

//   res.json(updated);
// });

// // server/routes/issuedAssets.js or similar
// // router.put('/issued-assets/:id', async (req, res) => {
// //   const updated = await IssueAsset.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //   if (!updated) return res.status(404).json({ message: 'Issued asset not found' });
// //   res.json(updated);
// // });

// // router.delete('/issued-assets/:id', async (req, res) => {
// //   const deleted = await IssueAsset.findByIdAndDelete(req.params.id);
// //   if (!deleted) return res.status(404).json({ message: 'Issued asset not found' });
// //   res.json({ message: 'Deleted successfully' });
// // });




// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Issue = require('../models/IssueAsset');
// const Asset = require('../models/Asset');

// // Get all issued assets
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

// // Issue a new asset
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

//     res.status(201).json(newIssue);
//   } catch (err) {
//     console.error('Error issuing asset:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Corrected Update Route
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Issued asset not found' });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Corrected Delete Route
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Issue.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Issued asset not found' });
//     res.json({ message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;




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
