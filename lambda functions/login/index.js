import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);
const dynamoDBTableName = "users";

export async function handler(event) {
  console.log("Request event", event);
  let response;
  if (event.httpMethod === "POST" && event.path === "/api/users/login") {
    response = await login(JSON.parse(event.body));
  }
  return response;
}

async function login(requestBody) {
  const params = {
    TableName: dynamoDBTableName,
    KeyConditionExpression: "email = :emailVal AND password = :passwordVal",
    ExpressionAttributeValues: {
      ":emailVal": requestBody.email,
      ":passwordVal": requestBody.password,
    },
  };

  const command = new QueryCommand(params);

  return await dynamoDB.send(command).then(
    (response) => {
      let body;
      let statuscode;
      if (response.Items.length === 0) {
        statuscode = 400;
        body = {
          Operation: "Login",
          Message: "Login unsuccessful, Invalid Username/Password",
        };
      } else {
        statuscode = 200;
        body = {
          Operation: "Login",
          Message: "Login successful",
        };
      }

      return buildResponse(statuscode, body);
    },
    (error) => {
      const body = {
        Operation: "Login",
        Message: "Error in login",
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
