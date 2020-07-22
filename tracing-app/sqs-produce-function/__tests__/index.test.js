const lambda = require("../index");
const SQS = require("aws-sdk/clients/sqs");
const sqs = new SQS({
  endpoint: "http://localhost:4566",
});

let QueueUrl;

beforeAll(async () => {
  console.log("creating test queue");

  try {
    await sqs.createQueue({ QueueName: "local-testing-queue" }).promise();
    QueueUrl = (
      await sqs.getQueueUrl({ QueueName: "local-testing-queue" }).promise()
    ).QueueUrl;
  } catch (error) {
    console.log("Failed to create", error);
  }
});

afterAll(async () => {
  console.log("deleting test queue");

  try {
    await sqs
      .deleteQueue({
        QueueUrl: QueueUrl,
      })
      .promise();
  } catch (error) {
    console.log("Failed to create", error);
  }
});

test("Event has been published to SQS queue", async () => {
  process.env.Queue = QueueUrl;
  await lambda
    .handler({
      body: '{ "memo": "Hello world!"}',
    })
    .then((response) => {
      expect(response.statusCode).toBe(200);
    });
});
