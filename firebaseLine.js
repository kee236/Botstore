"use strict";

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const request = require("request-promise");

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Set region for cloud function
const REGION = "asia-east2";

// Set access token for notify
const ACCESS_TOKEN = "Your LINE Notify Access Token";

// Send new record to LINE Notify
const notifyLine = (notifyMessage) => {
  return request({
    method: `POST`,
    uri: `https://notify-api.line.me/api/notify`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    form: {
      message: notifyMessage,
    },
  });
};

// Listen for new record in all documents in Your collection
exports.newRecord = functions
  .region(REGION)
  .firestore.document("<YourCollectionName>/{dataID}")
  .onCreate((snap, context) => {
    // Get an boject representing the document
    const newRecord = snap.data();
    let notifyMessage = "";

    // Access a particular field and make notify message
    // You must make notify message with your data in newRecord object
    notifyMessage = "BlaBlaBla";

    return notifyLine(notifyMessage).then(() => {
      console.log(`New Record : ${notifyMessage}`);
    });
  });

