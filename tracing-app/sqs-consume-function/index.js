const AWSXRay = require("aws-xray-sdk-core");
const epsagon = require("epsagon");

const DynamoDB = require("aws-sdk/clients/dynamodb");

const dynamodb = new DynamoDB({
  endpoint: process.env.DDB_ENDPOINT_OVERRIDE
    ? process.env.DDB_ENDPOINT_OVERRIDE
    : undefined,
});

const ddbclient = new DynamoDB.DocumentClient({ service: dynamodb });

AWSXRay.captureAWSClient(ddbclient.service);

AWSXRay.setContextMissingStrategy("LOG_ERROR");

epsagon.init({
  token: process.env.EpsagonToken,
  appName: process.env.AppName,
  metadataOnly: false,
});

const crypto = require("crypto");

module.exports.handler = epsagon.lambdaWrapper(async (event) => {
  for (let record of event.Records) {
    let payload = JSON.parse(record.body);
    payload.id = crypto.randomBytes(16).toString("hex");
    let params = {
      TableName: process.env.SQSMessageTable,
      Item: payload,
    };
    await ddbclient.put(params).promise();
  }
  return { statusCode: 200 };
});
