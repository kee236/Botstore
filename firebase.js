

// edit code 

var body = request.postData.contents;
var data = JSON.parse(body);

function getPrice(productName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Product"); // แก้ไขชื่อแผ่นข้อมูลตามที่คุณตั้งชื่อ
  var values = sheet.getRange(2, 1, sheet.getLastRow(), 2).getValues(); // ค้นหาข้อมูลจากแถวที่ 2 เป็นต้นไป

  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === productName) {
      return values[i][1]; // คืนค่าราคาเมื่อพบชื่อสินค้าที่ตรงกัน
    }
  }

  // ถ้าไม่พบชื่อสินค้าที่ตรงกัน
  return "Product not found"; // คืนค่าข้อความแสดงว่าไม่พบสินค้า
}

function intentPrice(agent) {
  var productName = data.queryResult.parameters.productName;
  var price = getPrice(productName);

  var responseMessage = " " + productName + " ราคา " + price + " บาท  (ส่งฟรี!!) ราคาเท่ากัน โอน/ปลายทาง ";

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
    const price = getPrice(productName);
const timestamp = new Date().toISOString();

    const orderData = {
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      product: productName,
      payment: paymentType,
      price: price,
    };

  saveOrder(orderData);


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
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  const dataRange = sheet.getLastRow() + 1;
  sheet.getRange(dataRange, 1).setValue(date);
  sheet.getRange(dataRange, 2).setValue(customerName);
  sheet.getRange(dataRange, 3).setValue(customerPhone);
  sheet.getRange(dataRange, 4).setValue(customerAddress);
  sheet.getRange(dataRange, 5).setValue(productName);
  sheet.getRange(dataRange, 6).setValue(payment);

  // Implement logic to save order data to a spreadsheet or database
  // Replace this with your actual implementation
  console.log("Saving order data:", orderData);
}


 function getPrice
{
 "2ขวด","368"
"3ขวด","549"
"6ขวด","990"
"12ขวด","1690"


}