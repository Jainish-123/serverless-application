const functions = require("@google-cloud/functions-framework");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "regal-habitat-428115-b8",
});

const db = admin.firestore();

functions.http("RegisterEvent", async (req, res) => {
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
      const data = req.body;

      const eventRegRef = db.collection("event-registration").doc();

      const newRegistration = {
        eventId: data.eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      await eventRegRef.set(newRegistration, { merge: true });

      res.send(`Event Registered with ID: ${eventRegRef.id}`);
    } catch (error) {
      console.error("Error registering event:", error);
      res.send("Internal Server Error");
    }
  }
});