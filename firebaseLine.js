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

// Ref. https://gist.github.com/CodingDoug/44ad12f4836e79ca9fa11ba5af6955f7

function main() {
  // Get speradsheet range and sheet name
  const spreadSheetId = "Your Spread Sheet ID";
  const sheetName = "Your Sheet Name";
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  const sheet = spreadSheet.getSheetByName(sheetName);
  const range = sheet.getDataRange();
  const allValues = range.getDisplayValues();

  // Get column indexes from the names of the headers in the first row
  const headers = {}
  allValues[0].forEach(function(value, index) { 
    headers[value] = index 
  });
  
  // Collect all the data from the sheet into a object to send to the database
  const dbData = {}
  allValues.forEach(function(row, index) {
      if (index === 0) { return }  // skip header row
      dbData[row[headers.OrderNumber]] = {
          key1: row[index1],
          key2: row[index2],
          key3: row[index3]
      }
  });
  
  const RTDB_URL = "Your RTDB Link";
  const token = ScriptApp.getOAuthToken();
  const url = RTDB_URL + "/" + sheetName + ".json?access_token=" + encodeURIComponent(token); //YourDataName.json
  const response = UrlFetchApp.fetch(url, {
      method: 'PUT',
      payload: JSON.stringify(dbData)
  })
  Logger.log(response.getResponseCode());
}