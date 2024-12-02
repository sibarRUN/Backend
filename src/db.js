const AWS = require('aws-sdk');

// RDS Proxy 엔드포인트 및 Secrets Manager ARN
const rds = new AWS.RDSDataService({
  region: 'ap-northeast-2', // AWS 리전 설정
});

// Aurora Serverless에 쿼리를 실행하는 함수 (RDS Proxy 활용)
const executeQuery = async (sql, parameters = []) => {
  const params = {
    resourceArn: 'arn:aws:rds:ap-northeast-2:533266969406:proxy:my-rds-proxy', // RDS Proxy ARN
    secretArn: 'arn:aws:secretsmanager:ap-northeast-2:339713092843:secret:rds-db-credentials/cluster-AGDFFYUSHGVUKAMFDFSC2QRDDM/admin/1732605457042-U3txAh', // Secrets Manager ARN
    database: 'testdb',
    sql, // 실행할 SQL 쿼리
    parameters, // SQL 쿼리의 파라미터
  };

  try {
    const result = await rds.executeStatement(params).promise();
    return result.records; // 결과 반환
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = executeQuery;
