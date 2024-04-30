

// edit code 

var body = request.postData.contents;
var data = JSON.parse(body);


function getPrice(productName) {
  
function intentPrice(agent) {
  var productName = data.queryResult.parameters.productName;
  var productPrice  = getPrice(productName);

  var responseMessage = " " + productName + " ราคา " + productPrice + " บาท  (ส่งฟรี!!) ราคาเท่ากัน โอน/ปลายทาง ";

  agent.add(responseMessage);

  var responseJson = {
    fulfillmentText: responseMessage,
  };

  return ContentService.createTextOutput(JSON.stringify(responseJson)).setMimeType(ContentService.MimeType.JSON);
}

function intentConfirm(agent) {
  

const productName = data.queryResult.context.get("intentPrice").parameters.productName;
    const paymentType = data.queryResult.context.get("intentPayment").parameters.paymentType;
    const customerName = data.queryResult.parameters.customerName;
    const customerAddress = data.queryResult.parameters.customerAddress;
    const customerPhone = data.queryResult.parameters.customerPhone;
    const productPrice = getPrice(productName);
const DateOrder = new Date().toISOString();

    const orderData = {
      DateOrder : DateOrder
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      product: productName,
      payment: paymentType,
      price: price,
    };

  saveOrder(orderData);
  sendLineNotify(orderData)

  var responseMessage =
    "สรุปยอดสั่งซื้อ\nสินค้า: " +
    productName +
    "\nราคา: " +
    price +
    " บาท\nชื่อลูกค้า: " +
    cusName +
    "\nเบอร์โทร: " +
    cusPhone +
    "\nที่อยู่: " +
    cusAddress;

  agent.add(responseMessage);

  var responseJson = {
    fulfillmentText: responseMessage,
  };

  //Logger.log(price);

  return ContentService.createTextOutput(JSON.stringify(responseJson)).setMimeType(ContentService.MimeType.JSON);
}

function saveOrder(orderData) {
const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // เปลี่ยนเป็น ID ของ Google Sheet ของคุณ
  const sheetName = 'Orders'; // เปลี่ยนเป็นชื่อ Sheet ของคุณ
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(Order);

  const dataRange = sheet.getLastRow() + 1;
  sheet.getRange(dataRange, 1).setValue(date);
  sheet.getRange(dataRange, 2).setValue(customerName);
  sheet.getRange(dataRange, 3).setValue(customerPhone);
  sheet.getRange(dataRange, 4).setValue(customerAddress);
  sheet.getRange(dataRange, 5).setValue(productName);
  sheet.getRange(dataRange, 6).setValue(payment);
  sheet.getRange(dataRange, 7).setValue(product Price);

}


 function getPrice
{
 "2ขวด","368"
"3ขวด","549"
"6ขวด","990"
"12ขวด","1690"

}