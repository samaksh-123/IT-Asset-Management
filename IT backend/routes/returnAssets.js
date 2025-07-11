// const express = require('express');
// const router = express.Router();
// const ReturnAsset = require('../models/ReturnAsset');
// const IssueAsset = require('../models/IssueAsset');

// // POST: Return an asset
// router.post('/', async (req, res) => {
//   try {
//     const {
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnDate,
//       returnTo,
//       returnReason,
//       remark,
//     } = req.body;

//     // Validation
//     if (!assetId || !employeeId || !returnDate || !returnTo || !returnReason) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const issuedRecord = await IssueAsset.findOne({ assetId, employeeId });
//     if (!issuedRecord) {
//       return res.status(404).json({ error: 'Issued asset not found' });
//     }

//     const returned = new ReturnAsset({
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnedDate: returnDate,
//       returnTo,
//       returnReason
//     });

//     await returned.save();
//     await IssueAsset.findByIdAndDelete(issuedRecord._id);

//     res.status(201).json(returned);
//   } catch (error) {
//     console.error('Error returning asset:', error);
//     res.status(500).json({ error: 'Failed to return asset' });
//   }
// });

// // GET: View returned assets
// router.get('/', async (req, res) => {
//   try {
//     const data = await ReturnAsset.find()
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching returned assets:', error);
//     res.status(500).json({ error: 'Failed to fetch returned assets' });
//   }
// });

// // DELETE: Delete a returned asset by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAsset = await ReturnAsset.findByIdAndDelete(id);

//     if (!deletedAsset) {
//       return res.status(404).json({ error: 'Returned asset not found' });
//     }

//     res.status(200).json({ message: 'Returned asset deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting returned asset:', error);
//     res.status(500).json({ error: 'Failed to delete returned asset' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const ReturnAsset = require('../models/ReturnAsset');
// const IssueAsset = require('../models/IssueAsset');

// // POST: Return an asset
// router.post('/', async (req, res) => {
//   try {
//     const {
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnDate,
//       returnTo,
//       returnReason,
//       remark, // ✅ included here
//     } = req.body;

//     // Validation
//     if (!assetId || !employeeId || !returnDate || !returnTo || !returnReason) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const issuedRecord = await IssueAsset.findOne({ assetId, employeeId });
//     if (!issuedRecord) {
//       return res.status(404).json({ error: 'Issued asset not found' });
//     }

//     const returned = new ReturnAsset({
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnedDate: returnDate,
//       returnTo,
//       returnReason,
//       remark, // ✅ saving remark
//     });

//     await returned.save();
//     await IssueAsset.findByIdAndDelete(issuedRecord._id);

//     res.status(201).json(returned);
//   } catch (error) {
//     console.error('Error returning asset:', error);
//     res.status(500).json({ error: 'Failed to return asset' });
//   }
// });

// // GET: View returned assets
// router.get('/', async (req, res) => {
//   try {
//     const data = await ReturnAsset.find()
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching returned assets:', error);
//     res.status(500).json({ error: 'Failed to fetch returned assets' });
//   }
// });

// // DELETE: Delete a returned asset by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAsset = await ReturnAsset.findByIdAndDelete(id);

//     if (!deletedAsset) {
//       return res.status(404).json({ error: 'Returned asset not found' });
//     }

//     res.status(200).json({ message: 'Returned asset deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting returned asset:', error);
//     res.status(500).json({ error: 'Failed to delete returned asset' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const ReturnAsset = require('../models/ReturnAsset');
// const IssueAsset = require('../models/IssueAsset');
// const Asset = require('../models/Asset'); // ✅ Imported for restoring

// // POST: Return an asset
// router.post('/', async (req, res) => {
//   try {
//     const {
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnDate,
//       returnTo,
//       returnReason,
//       remark,
//     } = req.body;

//     if (!assetId || !employeeId || !returnDate || !returnTo || !returnReason) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const issuedRecord = await IssueAsset.findOne({ assetId, employeeId });
//     if (!issuedRecord) {
//       return res.status(404).json({ error: 'Issued asset not found' });
//     }

//     const returned = new ReturnAsset({
//       assetId,
//       employeeId,
//       departmentId,
//       issuedDate,
//       returnedDate: returnDate,
//       returnTo,
//       returnReason,
//       remark,
//     });

//     await returned.save();
//     await IssueAsset.findByIdAndDelete(issuedRecord._id);

//     res.status(201).json(returned);
//   } catch (error) {
//     console.error('Error returning asset:', error);
//     res.status(500).json({ error: 'Failed to return asset' });
//   }
// });

// // GET: View returned assets
// router.get('/', async (req, res) => {
//   try {
//     const data = await ReturnAsset.find()
//       .populate('assetId')
//       .populate('employeeId')
//       .populate('departmentId');

//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching returned assets:', error);
//     res.status(500).json({ error: 'Failed to fetch returned assets' });
//   }
// });

// // DELETE: Delete a returned asset by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAsset = await ReturnAsset.findByIdAndDelete(id);

//     if (!deletedAsset) {
//       return res.status(404).json({ error: 'Returned asset not found' });
//     }

//     res.status(200).json({ message: 'Returned asset deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting returned asset:', error);
//     res.status(500).json({ error: 'Failed to delete returned asset' });
//   }
// });

// // PATCH: Repair action (restore to stock or mark as scrap)
// router.patch('/repair-status/:id', async (req, res) => {
//   try {
//     const { action } = req.body;
//     const returnAsset = await ReturnAsset.findById(req.params.id).populate('assetId');

//     if (!returnAsset) {
//       return res.status(404).json({ error: 'Returned asset not found' });
//     }

//     if (action === 'restore') {
//       const restoredAsset = new Asset({
//         type: returnAsset.assetId.type,
//         name: returnAsset.assetId.name,
//         serialNumber: returnAsset.assetId.serialNumber,
//         configuration: returnAsset.assetId.configuration,
//         manufacturer: returnAsset.assetId.manufacturer,
//         modelNumber: returnAsset.assetId.modelNumber,
//         supportLink: returnAsset.assetId.supportLink,
//         dateAdded: new Date(),
//         status: 'Available',
//       });

//       await restoredAsset.save();
//       await ReturnAsset.findByIdAndDelete(req.params.id);

//       return res.status(200).json({ message: 'Asset restored to stock' });
//     } else if (action === 'scrap') {
//       await ReturnAsset.findByIdAndUpdate(req.params.id, { status: 'Scrapped' });
//       return res.status(200).json({ message: 'Asset marked as scrapped' });
//     } else {
//       return res.status(400).json({ error: 'Invalid action' });
//     }
//   } catch (error) {
//     console.error('Error updating repair status:', error);
//     res.status(500).json({ error: 'Failed to update repair status' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const ReturnAsset = require('../models/ReturnAsset');
const IssueAsset = require('../models/IssueAsset');
const Asset = require('../models/Asset');

// POST: Return an asset
router.post('/', async (req, res) => {
  try {
    const {
      assetId,
      employeeId,
      departmentId,
      issuedDate,
      returnDate,
      returnTo,
      returnReason,
      remark,
    } = req.body;

    if (!assetId || !employeeId || !returnDate || !returnTo || !returnReason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const issuedRecord = await IssueAsset.findOne({ assetId, employeeId });
    if (!issuedRecord) {
      return res.status(404).json({ error: 'Issued asset not found' });
    }

    const returned = new ReturnAsset({
      assetId,
      employeeId,
      departmentId,
      issuedDate,
      returnedDate: returnDate,
      returnTo,
      returnReason,
      remark,
      status: 'Returned' // default status
    });

    await returned.save();
    await IssueAsset.findByIdAndDelete(issuedRecord._id);

    res.status(201).json(returned);
  } catch (error) {
    console.error('Error returning asset:', error);
    res.status(500).json({ error: 'Failed to return asset' });
  }
});

// GET: View returned assets
router.get('/', async (req, res) => {
  try {
    const data = await ReturnAsset.find()
      .populate('assetId')
      .populate('employeeId')
      .populate('departmentId');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching returned assets:', error);
    res.status(500).json({ error: 'Failed to fetch returned assets' });
  }
});

// DELETE: Delete a returned asset
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAsset = await ReturnAsset.findByIdAndDelete(id);
    if (!deletedAsset) {
      return res.status(404).json({ error: 'Returned asset not found' });
    }

    res.status(200).json({ message: 'Returned asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting returned asset:', error);
    res.status(500).json({ error: 'Failed to delete returned asset' });
  }
});

// PATCH: Repair action - restore or scrap
router.patch('/repair-status/:id', async (req, res) => {
  try {
    const { action } = req.body;
    const returnAsset = await ReturnAsset.findById(req.params.id).populate('assetId');

    if (!returnAsset) {
      return res.status(404).json({ error: 'Returned asset not found' });
    }

    if (action === 'restore') {
      const restoredAsset = new Asset({
        type: returnAsset.assetId.type,
        name: returnAsset.assetId.name,
        manufacturer: returnAsset.assetId.manufacturer,
        configuration: returnAsset.assetId.configuration,
        serialNumber: returnAsset.assetId.serialNumber,
        invoiceNumber: returnAsset.assetId.invoiceNumber,
        location: returnAsset.assetId.location,
        status: 'Available',
        dateAdded: new Date(),
        warranty: returnAsset.assetId.warranty,
        price: returnAsset.assetId.price,
        partyName: returnAsset.assetId.partyName,
        issued: false
      });

      await restoredAsset.save();

      // ✅ Update return status instead of deleting
      returnAsset.status = 'Restored';
      await returnAsset.save();

      return res.status(200).json({ message: 'Asset restored to stock and retained in return log' });

    } else if (action === 'scrap') {
      returnAsset.status = 'Scrapped';
      await returnAsset.save();

      return res.status(200).json({ message: 'Asset marked as scrapped and retained in return log' });

    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error updating repair status:', error);
    res.status(500).json({ error: 'Failed to update repair status' });
  }
});

module.exports = router;



















