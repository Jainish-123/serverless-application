import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({});
const bucketName = "activity-image-upload";

export async function handler(event) {
  console.log("Request event", event);
  let response;
  if (event.httpMethod === "GET" && event.path === "/api/users/image-list") {
    response = await listImages(event);
  }
  return response;
}

async function listImages(event) {
  const params = {
    Bucket: bucketName,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const response = await s3.send(command);
    const objectUrls = await Promise.all(
      response.Contents.map(async (item) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: item.Key,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 900 });
        return url;
      })
    );

    const body = {
      Operation: "Image List Fetch",
      Message: "Images Fetched successfully",
      s3_urls: JSON.stringify(objectUrls),
    };

    return buildResponse(200, body);
  } catch (error) {
    const body = {
      Operation: "Image List Fetch",
      Message: "Error in Fetching Images",
      Error: error.message,
    };

    return buildResponse(500, body);
  }
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
