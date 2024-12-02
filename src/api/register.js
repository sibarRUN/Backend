const express = require('express');
const { getItem, putItem, deleteItem, scanTable } = require('../db/dynamo');
const router = express.Router();

const TABLE_NAME = 'register';

// GET: 본인의 회원 정보 조회
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id']; // 헤더에서 Cognito 사용자 ID 가져오기

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    const user = await getItem(TABLE_NAME, { ID: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새 회원 추가
router.post('/', async (req, res) => {
  const { ID, PW, NICKNAME } = req.body;

  if (!ID || !PW || !NICKNAME) {
    return res.status(400).json({ error: 'ID, PW, and NICKNAME are required' });
  }

  try {
    await putItem(TABLE_NAME, { ID, PW, NICKNAME });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE: 회원 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteItem(TABLE_NAME, { ID: id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
