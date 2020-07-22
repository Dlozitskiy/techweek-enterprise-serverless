# Simple serverless app to demonstrate local development approach using localstack

- [Simple serverless app to demonstrate local development approach using localstack](#simple-serverless-app-to-demonstrate-local-development-approach-using-localstack)
  - [Run locally](#run-locally)
  - [Deploy to the cloud](#deploy-to-the-cloud)

## Run locally

1. Install and start localstack

```
$ pip install localstack
$ localstack start
```

2. Create S3 bucket using localstack edge endpoint:

```
$ aws s3 mb s3://localstack-app-bucket --endpoint-url http://localhost:4566
```

3. Start your API locally using SAM CLI:

```
$ sam local start-api --skip-pull-image --env-vars sam-local.env.json
```

4. Send POST request to local API HTTP endpoint:

```
$ curl -X POST http://localhost:3000/upload -d '{"message": "localstack bucket upload"}'
```

5. Validate that message content was saved in the bucket created by localstack:

```
$ aws s3 ls s3://localstack-app-bucket --endpoint-url http://localhost:4566
```

## Deploy to the cloud

1. Prepare SAM template for deployment

```
$ sam build
```

2. Deploy into AWS account (use `--guided` options first time to create configuration file)

```
$ sam deploy --guided
```
