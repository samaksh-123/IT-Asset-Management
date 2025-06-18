const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
router.post('/add', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add department' });
  }
});

// GET /api/departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating department', error: err });
  }
});
// DELETE department by ID
router.delete('/:id', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: 'Error deleting department', error: err });
  }
});



module.exports = router;