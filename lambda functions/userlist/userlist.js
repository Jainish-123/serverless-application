import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ExecuteStatementCommand,
} from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);
const dynamoDBTableName = "users";

export async function handler(event) {
  console.log("Request event", event);
  let response;
  if (event.httpMethod === "GET" && event.path === "/api/users/user-list") {
    response = await fetchUserList();
  }
  return response;
}

async function fetchUserList() {
  const params = {
    Statement: "SELECT * FROM users",
    ConsistentRead: true,
  };

  const command = new ExecuteStatementCommand(params);

  return await dynamoDB.send(command).then(
    (response) => {
      let body;
      if (response.Items.length === 0) {
        body = {
          Operation: "Fetch users",
          Message: "No User present",
          List: response.Items,
        };
      } else {
        body = {
          Operation: "Fetch users",
          Message: "User list fetched successfully",
          Users: response.Items,
        };
      }
      return buildResponse(200, body);
    },
    (error) => {
      const body = {
        Operation: "Fetch users",
        Message: "Error in fetching users",
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
