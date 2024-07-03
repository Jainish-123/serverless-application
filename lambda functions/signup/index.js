// import { DynamoDB } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDB({});

// const dynamoDB = new client.DocumentClient();

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);
const dynamoDBTableName = "users";

export async function handler(event) {
  console.log("Request event", event);
  let response;
  if (event.httpMethod === "POST" && event.path === "/api/users/signup") {
    response = await saveUser(JSON.parse(event.body));
  }
  return response;
}

async function saveUser(requestBody) {
  const params = {
    TableName: dynamoDBTableName,
    Item: requestBody,
  };

  const command = new PutCommand(params);

  return await dynamoDB.send(command).then(
    () => {
      const body = {
        Operation: "SignUp",
        Message: "User registered successfully",
        Item: requestBody,
      };
      return buildResponse(200, body);
    },
    (error) => {
      const body = {
        Operation: "SignUp",
        Message: "Error registering user",
        Error: error.message,
      };
      return buildResponse(500, body);
    }
  );
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(body),
  };
}
