`use strict`;

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.tableName;

module.exports.saveItem = async(name) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      username: name
    }
  };

  const data = await documentClient.put(params).promise();
  return name;
};

module.exports.getName = async(name) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      username: name
    }
  }

  const data = await documentClient.get(params).promise();
  if (Object.entries(data).length < 1) {
    return "NO";
  }
  return "YES"
}