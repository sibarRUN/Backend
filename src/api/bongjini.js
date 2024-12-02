const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 본인의 키와 체중 정보 조회
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id']; // 헤더에서 Cognito 사용자 ID 가져오기

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    // 사용자 ID에 해당하는 데이터만 조회
    const records = await executeQuery('SELECT * FROM bongjini WHERE ID = :ID', [
      { name: 'ID', value: { stringValue: userId } },
    ]);

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

// PATCH: 본인의 키와 체중 정보 수정
router.patch('/', async (req, res) => {
  const userId = req.headers['x-user-id']; // 헤더에서 Cognito 사용자 ID 가져오기
  const { Height, Weight } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    await executeQuery('UPDATE bongjini SET Height = :Height, Weight = :Weight WHERE ID = :ID', [
      { name: 'Height', value: { longValue: Height } },
      { name: 'Weight', value: { longValue: Weight } },
      { name: 'ID', value: { stringValue: userId } },
    ]);

    res.status(200).json({ message: 'Height and Weight updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
