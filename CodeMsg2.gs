
// 1. ฟังก์ชันแสดง ราคา intentPrice
function intentPrice(agent) {
  const productName = agent.parameters.productName;
  const productPrice = getPrice(productName); // ตัวอย่างการเรียกใช้ฟังก์ชันหาค่าราคาสินค้า
  const massangPrice = {
    text: {
      text: [
        `**${productName} ราคา ${productPrice} บาท\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨`
      ]
    },
    platform: "FACEBOOK"
  };
  agent.add(massangPrice);
}





// 2. ฟังก์ชัน intentConfirm
function intentConfirm(agent) {
  const productName = agent.context.get('intentPrice').parameters.productName;
  const paymentType = agent.context.get('intentPayment').parameters.paymentType;
  const customerName = agent.parameters.customerName;
  const customerPhone = agent.parameters.customerPhone;
  const customerAddress = agent.parameters.customerAddress;
  const price = getPrice(productName); // ตัวอย่างการเรียกใช้ฟังก์ชันหาค่าราคาสินค้า

  // บันทึกข้อมูลลูกค้าลงใน Google Sheets
  recordCustomerData(customerName, customerPhone, customerAddress);
  // บันทึกข้อมูลคำสั่งซื้อลงใน Google Sheets
  recordOrderData(productName, paymentType, price, customerName, customerPhone, customerAddress);

  const massangOrder = `***สรุปยอดสั่งซื้อ***\nสินค้า: ${productName}\n${paymentType} : ${productPrice}\n------\nชื่อลูกค้า: ${customerName}\nเบอร์โทร: ${customerPhone}\nที่อยู่: ${customerAddress}`;
  agent.add(massangOrder);
}

function getPrice(productName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Product");
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === productName) {
      return data[i][2]; // ราคาอยู่ในคอลัมน์ที่ 2 (index 1)
    }
  }
  
  return "ไม่พบข้อมูลสินค้า"; // หากไม่พบสินค้า
}

// 3. ออกแบบการบันทึกข้อมูล
function recordCustomerData(customerName, customerPhone, customerAddress) {
  // ตัวอย่างการบันทึกข้อมูลลูกค้าลงใน Google Sheets ในชีทชื่อ Customer
}

function recordOrderData(productName, paymentType, price, customerName, customerPhone, customerAddress) {
  // ตัวอย่างการบันทึกข้อมูลคำสั่งซื้อลงใน Google Sheets ในชีทชื่อ Order
}

// 4. สร้างการส่งข้อความแจ้งเตือนผ่าน Line Notify
function sendLineNotify() {
  // ตัวอย่างการส่งข้อความแจ้งเตือนผ่าน Line Notify
}

// 5. ออกแบบข้อความตอบกลับสำหรับ Dialogflow Fulfillment แพลต