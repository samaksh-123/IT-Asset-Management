const express = require('express');
const router = express.Router();
const ReturnAsset = require('../models/ReturnAsset');
const IssueAsset = require('../models/IssueAsset');

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
      returnReason
    } = req.body;

    // Validation
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
      returnReason
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

// DELETE: Delete a returned asset by ID
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

module.exports = router;





























