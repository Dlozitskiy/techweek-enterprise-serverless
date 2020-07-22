process.env.DDB_ENDPOINT_OVERRIDE = "http://localhost:4566";
process.env.SQSMessageTable = "local-testing-table";

const lambda = require("../index");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB({
  endpoint: "http://localhost:4566",
});

const event = require("./sqs-event.json");

beforeAll(async () => {
  console.log("creating test table");
  try {
    await dynamodb
      .createTable({
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S",
          },
        ],
        KeySchema: [
          {
            AttributeName: "id",
            KeyType: "HASH",
          },
        ],
        TableName: "local-testing-table",
        BillingMode: "PAY_PER_REQUEST",
      })
      .promise();
  } catch (error) {
    console.log("Failed to create", error);
  }
});

afterAll(async () => {
  try {
    console.log("destroying test table");
    await dynamodb
      .deleteTable({
        TableName: "local-testing-table",
      })
      .promise();
  } catch (error) {
    console.log("Failed to destroy the table", error);
  }
});

test("Memo has been recorder to DynamoDB table", async () => {
  await lambda.handler(event).then((response) => {
    expect(response.statusCode).toBe(200);
  });
});
