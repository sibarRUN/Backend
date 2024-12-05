const express = require('express');
const { getItem, putItem, updateItem } = require('../db/dynamo'); // 필요한 부분만 가져옴
const router = express.Router();

const TABLE_NAME = 'bongjini';

// GET: 본인의 키와 체중 정보 조회
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id'];

  console.log("Received GET request. User ID:", userId);

  if (!userId) {
    console.log("User ID is missing in header");
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  try {
    const data = await getItem(TABLE_NAME, { ID: userId });
    console.log("Get item result:", data);

    if (!data) {
      console.log("No data found for user ID:", userId);
      return res.status(404).json({ error: 'No data found for the user' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Database error on GET request:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새로운 키와 체중 정보 추가
router.post('/', async (req, res) => {
  const { ID, Height, Weight } = req.body;

  console.log("Received POST request. Body:", req.body);

  if (!ID || !Height || !Weight) {
    console.log("Missing required fields in POST request");
    return res.status(400).json({ error: 'ID, Height, and Weight are required' });
  }

  try {
    await putItem(TABLE_NAME, { ID, Height, Weight });
    console.log("Successfully added Height and Weight for ID:", ID);
    res.status(201).json({ message: 'Height and Weight added successfully' });
  } catch (error) {
    console.error("Database error on POST request:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH: 키와 체중 정보 수정
router.patch('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const { Height, Weight } = req.body;

  console.log("Received PATCH request. User ID:", userId, "Body:", req.body);

  if (!userId) {
    console.log("User ID is missing in header for PATCH request");
    return res.status(400).json({ error: 'User ID is required in the header' });
  }

  if (!Height && !Weight) {
    console.log("Neither Height nor Weight provided in PATCH request");
    return res.status(400).json({ error: 'At least one of Height or Weight is required' });
  }

  try {
    const updateExpression = [];
    const expressionAttributeValues = {};

    if (Height) {
      updateExpression.push('Height = :height');
      expressionAttributeValues[':height'] = Height;
    }

    if (Weight) {
      updateExpression.push('Weight = :weight');
      expressionAttributeValues[':weight'] = Weight;
    }

    if (updateExpression.length === 0) {
      console.log("No update parameters found");
      return res.status(400).json({ error: 'At least one of Height or Weight must be provided for update' });
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { ID: userId },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    console.log("Update parameters:", params);

    const updatedData = await updateItem(params);
    console.log("Successfully updated data:", updatedData);
    res.status(200).json({ message: 'Height and/or Weight updated successfully', data: updatedData });
  } catch (error) {
    console.error("Database error on PATCH request:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
