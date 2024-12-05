const AWS = require('aws-sdk');

// DynamoDB Document Client 설정
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

/**
 * 데이터 가져오기 (키 기반 조회)
 */
const getItem = async (TableName, Key) => {
  try {
    const params = { TableName, Key };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('DynamoDB Get Error:', error);
    throw error;
  }
};

/**
 * 데이터 추가 또는 업데이트
 */
const putItem = async (TableName, Item) => {
  try {
    const params = { TableName, Item };
    await dynamoDb.put(params).promise();
    return true;
  } catch (error) {
    console.error('DynamoDB Put Error:', error);
    throw error;
  }
};

/**
 * 데이터 삭제
 */
const deleteItem = async (TableName, Key) => {
  try {
    const params = { TableName, Key };
    await dynamoDb.delete(params).promise();
    return true;
  } catch (error) {
    console.error('DynamoDB Delete Error:', error);
    throw error;
  }
};

/**
 * 데이터 전체 스캔
 */
const scanTable = async (TableName) => {
  try {
    const params = { TableName };
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
  } catch (error) {
    console.error('DynamoDB Scan Error:', error);
    throw error;
  }
};

/**
 * 데이터 업데이트
 */
const updateItem = async (params) => {
  try {
    const result = await dynamoDb.update(params).promise();
    return result;
  } catch (error) {
    console.error('DynamoDB Update Error:', error);
    throw error;
  }
};

module.exports = {
  getItem,
  putItem,
  deleteItem,
  scanTable,
  updateItem, // 추가된 부분
};
