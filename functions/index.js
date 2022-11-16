const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: "https://proyecto-backend-d4961.firebaseio.com",
});

const db = admin.firestore();

app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.post("/api/products", async (req, res) => {
  try {
    await db
      .collection("products")
      .doc("/" + req.body.id + "/")
      .create({ name: req.body.name });

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).send;
  }
});

app.get("/api/products/:product_id", (req, res) => {
  (async () => {
    try {
      db.collection("products").doc(req.params.id).get();

      const item = await doc.get();
      const response = item.data();

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send;
    }
  })();
});

exports.app = functions.https.onRequest(app);
