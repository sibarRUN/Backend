const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 본인의 회원 정보 조회
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id']; // 헤더에서 Cognito 사용자 ID 가져오기

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    // 사용자 ID에 해당하는 데이터만 조회
    const records = await executeQuery('SELECT * FROM register WHERE ID = :ID', [
      { name: 'ID', value: { stringValue: userId } },
    ]);

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새 회원 추가
router.post('/', async (req, res) => {
  const { ID, PW, NICKNAME } = req.body;
  try {
    await executeQuery('INSERT INTO register (ID, PW, NICKNAME) VALUES (:ID, :PW, :NICKNAME)', [
      { name: 'ID', value: { stringValue: ID } },
      { name: 'PW', value: { stringValue: PW } },
      { name: 'NICKNAME', value: { stringValue: NICKNAME } },
    ]);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE: 회원 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 트랜잭션으로 회원 데이터와 관련 데이터 삭제
    await executeQuery('DELETE FROM bongjini WHERE ID = :ID', [
      { name: 'ID', value: { stringValue: id } },
    ]);

    await executeQuery('DELETE FROM register WHERE ID = :ID', [
      { name: 'ID', value: { stringValue: id } },
    ]);

    res.status(200).json({ message: 'User and related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
