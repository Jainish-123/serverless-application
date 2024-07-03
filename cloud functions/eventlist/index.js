const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'regal-habitat-428115-b8'
});

const db = admin.firestore();

functions.http('GetEvents', async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Methods", " GET");
    res.set("Access-Control-Max-Age", "3600");

    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    } else {
        try {
            let collectionRef = db.collection('events');
            console.log("CollectionRef : ", collectionRef);
            let snapshot = await collectionRef.get();
            // console.log("snapshot : ", snapshot);

            if (snapshot.empty) {
                res.status(404).send('No documents found.');
                return;
            }

            let documents = [];
            snapshot.forEach(doc => {
                documents.push({
                    eventId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    date: doc.data().date,
                    time: doc.data().time,
                    image: doc.data().image
                });
            });

            // console.log(documents);
            res.status(200).json(documents);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error retrieving documents: ' + error.message);
        }
    }
});