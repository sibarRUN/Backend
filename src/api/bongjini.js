const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 키와 체중 정보 조회
router.get('/', async (req, res) => {
  try {
    const records = await executeQuery('SELECT * FROM bongjini');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새로운 키와 체중 정보 추가
router.post('/', async (req, res) => {
  const { ID, Height, Weight } = req.body;
  try {
    if (!ID || !Height || !Weight) {
      return res.status(400).json({ error: 'ID, Height, and Weight are required' });
    }

    await executeQuery('INSERT INTO bongjini (ID, Height, Weight) VALUES (:ID, :Height, :Weight)', [
      { name: 'ID', value: { stringValue: ID } },
      { name: 'Height', value: { longValue: Height } },
      { name: 'Weight', value: { longValue: Weight } },
    ]);

    res.status(201).json({ message: 'Height and Weight added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH: 키와 체중 정보 수정
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { Height, Weight } = req.body;
  try {
    await executeQuery('UPDATE bongjini SET Height = :Height, Weight = :Weight WHERE ID = :ID', [
      { name: 'Height', value: { longValue: Height } },
      { name: 'Weight', value: { longValue: Weight } },
      { name: 'ID', value: { stringValue: id } },
    ]);

    res.status(200).json({ message: 'Height and Weight updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
