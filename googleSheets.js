var ss = SpreadsheetApp.openByUrl("ชื่อ URL แผ่นงานของเรา");
function doPost(e)
{ 
 var data = JSON.parse(e.postData.contents)
 var userMsg = data.originalDetectIntentRequest.payload.data.message.text;
 
 var userCommand = userMsg.split(“,”);
 var sheet = ss.getSheetByName(userCommand[0]);
var values = sheet.getRange(1, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
for(var i = 0;i<values.length; i++)
 { 
 var d = []
 if(values[i][1].toString() == userCommand[1])
 {
for(var j = 1 ;j<values.length; j++)
 {
var formattedDate = Utilities.formatDate(new Date(sheet.getRange(1,j).getValue().toString()),
“GMT+7”,“d-MMM-yyyy”);
 if(formattedDate == userCommand[2])
 {
 sheet.getRange(i+1,j).setValue(userCommand[3]);
var result = { “fulfillmentMessages”: [{“platform”: “line”,”type”: 4,”payload” : {“line”: {“type”: “text”,”text”: “บันทึกเรียบร้อย”}}}]}
var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
return replyJSON;
 
 }
 }
var result = { “fulfillmentMessages”: [{“platform”: “line”,”type”: 4,”payload” : {“line”: {“type”: “text”,”text”: “ไม่พบวันที่”}}}]}
var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
return replyJSON;
 
 }
 }
var result = { “fulfillmentMessages”: [{“platform”: “facebook”,”type”: 4,”payload” : {“line”: {“type”: “text”,”text”: “ไม่พบ ID สินค้า”}}}]}
var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
return replyJSON;
}