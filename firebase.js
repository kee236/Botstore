

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
  const cusName = data.queryResult.parameters.custName;
  const cusAddress = data.queryResult.parameters.cusAddress;
  const cusPhone = data.queryResult.parameters.cusPhone;
  var price = getPrice(productName);

  var orderData = {
    customer: cusName,
    phone: cusPhone,
    address: cusAddress,
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
  // Implement logic to save order data to a spreadsheet or database
  // Replace this with your actual implementation
  console.log("Saving order data:", orderData);
}




function intentConfirm(agent) {
    const productName = data.queryResult.context.get("intentPrice").parameters.productName;
    const paymentType = data.queryResult.context.get("intentPayment").parameters.paymentType;
    const customerName = data.queryResult.parameters.customerName;
    const customerAddress = data.queryResult.parameters.customerAddress;
    const customerPhone = data.queryResult.parameters.customerPhone;
    const price = getPrice(productName);

    const orderData = {
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      product: productName,
      payment: paymentType,
      price: price,
    };


    console.log(`Order data: ${JSON.stringify(orderData)}`);

    const responseMessage = `
      **สรุปยอดสั่งซื้อ**
     LIMGAR : ${productName}
      ${payment}: ${price} บาท
       ${customerName}
      ${customerPhone}
      ${customerAddress

      **ขอบคุณสำหรับการสั่งซื้อ!**
    `;

    agent.add(responseMessage);

    const responseJson = {
      fulfillmentText: responseMessage,
    };

    res.json(responseJson);
  }

  // กำหนด routing สำหรับคำขอต่างๆ
  app.post('/intent-price', intentPrice);
  app.post('/intent-confirm', intentConfirm);