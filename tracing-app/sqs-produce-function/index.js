const AWSXRay = require("aws-xray-sdk-core");
const epsagon = require("epsagon");

const SQS = require("aws-sdk/clients/sqs");
const sqs = new SQS();

AWSXRay.captureAWSClient(sqs);

AWSXRay.setContextMissingStrategy("LOG_ERROR");

epsagon.init({
  token: process.env.EpsagonToken,
  appName: process.env.AppName,
  metadataOnly: false,
});

module.exports.handler = epsagon.lambdaWrapper(async (event) => {
  console.log(event.body);
  const params = {
    QueueUrl: process.env.Queue,
    MessageBody: event.body,
  };
  await sqs.sendMessage(params).promise();
  return { statusCode: 200 };
});
