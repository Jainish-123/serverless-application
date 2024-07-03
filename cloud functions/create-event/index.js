const functions = require("@google-cloud/functions-framework");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "regal-habitat-428115-b8",
});

const db = admin.firestore();

functions.http("createEvent", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", " POST");
  res.set("Access-Control-Max-Age", "3600");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  } else {
    console.log("Function triggered");
    try {
      const eventData = req.body;

      const uploadResponse = await axios.post(
        `https://us-east1-regal-habitat-428115-b8.cloudfunctions.net/EventImageUpload`,
        {
          file: eventData.file,
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error("Failed to upload image");
      }

      const eventRef = db.collection("events").doc();

      const newEvent = {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        image: uploadResponse.data.url,
      };

      await eventRef.set(newEvent, { merge: true });

      res.send(`Event created with ID: ${eventRef.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
      res.send("Internal Server Error");
    }
  }
});