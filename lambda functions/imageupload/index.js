import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});
const bucketName = "activity-image-upload";

export async function handler(event) {
  console.log("Request event", event);
  let response;
  if (event.httpMethod === "POST" && event.path === "/api/users/imageupload") {
    response = await uploadImage(event);
  }
  return response;
}

async function uploadImage(event) {
  const body = JSON.parse(event.body);
  const image = body.file;
  const date = new Date().toISOString();
  let fileName;

  if ("fileName" in body) {
    fileName = body["fileName"];
  } else {
    const fileExtension = image.substring(
      image.indexOf("/") + 1,
      image.indexOf(";base64")
    );
    fileName = `${date}.${fileExtension}`;
  }

  const imageData = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(imageData, "base64");

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: `image/${fileName.split(".").pop()}`,
  };
  const command = new PutObjectCommand(params);
  return await s3.send(command).then(
    (response) => {
      const body = {
        Operation: "Image Upload",
        Message: "Image uploaded successfully",
        filename: fileName,
        s3_url: response.Location,
      };
      return buildResponse(200, body);
    },
    (error) => {
      const body = {
        Operation: "Image Upload",
        Message: "Error uploading image",
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
