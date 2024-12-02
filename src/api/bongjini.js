const express = require('express');
const { getItem, putItem, scanTable, deleteItem } = require('../db/dynamo');
const router = express.Router();

const TABLE_NAME = 'bongjini';

// GET: 본인의 키와 체중 정보 조회
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    const data = await getItem(TABLE_NAME, { ID: userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found for the user' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새로운 키와 체중 정보 추가
router.post('/', async (req, res) => {
  const { ID, Height, Weight } = req.body;

  if (!ID || !Height || !Weight) {
    return res.status(400).json({ error: 'ID, Height, and Weight are required' });
  }

  try {
    await putItem(TABLE_NAME, { ID, Height, Weight });
    res.status(201).json({ message: 'Height and Weight added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
