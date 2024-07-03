const functions = require('@google-cloud/functions-framework');
const {Storage} = require('@google-cloud/storage');
const projectId = 'regal-habitat-428115-b8';
const bucketName = 'serverless-activity-2';
const storage = new Storage({projectId});

functions.http('UploadImage', async(req, res) => {
  try{
    const body = req.body;
    const image = body.file;
    const date = new Date().toISOString();
    let fileName;

    if ("fileName" in body) {
      fileName = body["fileName"];
    } 
    else {
      const fileExtension = image.substring(
        image.indexOf("/") + 1,
        image.indexOf(";base64")
      );
      fileName = `${date}.${fileExtension}`;
    }

    const imageData = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(imageData, "base64");

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    // const ret = await bucket.upload(buffer,{
    //   destination : fileName
    // })

    console.log(`Image url : ${publicUrl}`);
    res.status(200).json({url:publicUrl});
  } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving documents: ' + error.message);
  }
});
