const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 모든 회원 조회
router.get('/', async (req, res) => {
  try {
    const records = await executeQuery('SELECT * FROM register');
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

// DELETE: 회원 삭제 (bongjini 데이터 포함)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 트랜잭션으로 회원 데이터와 관련 키/체중 데이터 삭제
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
