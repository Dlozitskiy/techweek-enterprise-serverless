const AWS = require("aws-sdk");
const crypto = require("crypto");

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT_OVERRIDE
    ? process.env.S3_ENDPOINT_OVERRIDE
    : undefined,
  s3ForcePathStyle: true,
});

const bucketName = process.env.AWS_BUCKET_NAME;

exports.handler = async (event) => {
  console.log(event.body);
  await s3
    .upload({
      Bucket: bucketName,
      Key: crypto.randomBytes(16).toString("hex") + ".file",
      Body: event.body,
    })
    .promise();
  return {};
};
