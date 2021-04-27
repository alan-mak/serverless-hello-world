'use strict';

const helloName = require('./helloName');

const createResponse = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.hello = async(event) => {
  let message = "Hello ";
  if (!event.queryStringParameters || !event.queryStringParameters.name) {
    message += "World";
  } else {
    const newName = await helloName.saveItem(event.queryStringParameters.name);
    message += newName;
  }

  return createResponse(200, message);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.wasGreeted = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.name) {
    return createResponse(404, "No");
  }
  const getName = await helloName.getName(event.queryStringParameters.name);
  return createResponse(200, getName)
}