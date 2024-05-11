function getPrice(productName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PRODUCT");
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === productName) {
      return data[i][2]; // Assuming price is in the third column (index 2)
    }
  }

  return "Price not found"; // If product not found
}




const getPrices = {
  "2": 368,
  "3": 549,
  "6": 990,
  "12": 1690
};



function AskPrice(agent) {
  const productName = agent.parameters.productName;
  const price = getPrice(productName);

  const message = {
    text: {
      text: [
        `**${productName} ราคา ${price} บาท\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨`
      ]
    },
    platform: "Facebook"
  };

  // Add message to agent's response
 
  agent.add(message);
}


function intentPayment(agent) {
  const paymentType = agent.parameters.paymentType;

  // You can access productName from the context set in the massagePrice intent
  const productName = agent.context.get('contextName').parameters.productName; // Update 'contextName' with the actual context name

  // Assuming you have a function getPrice similar to the previous example
  const price = getPrice(productName);

  let message = "";

  if (paymentType === 'cod') {
    message = "แบบปลายทาง แจ้ง ชื่อ, ที่อยู่จัดส่ง, และเบอร์โทรศัพท์ เพื่อส่งมาได้เลยค่ะ 🧾";
  } else if (paymentType === 'โอน') {
    message = `🔹 ${productName} แบบโอนยอดชำระ ${price} บาท ค่ะ💫\n🧾 โอนแล้ว แจ้งสลิป และ ชื่อ ที่อยู่ เบอร์โทร มาได้เลยนะค่ะ`;
  }

  agent.add(message);
}


function intentConfirm(agent) {
  const productName = agent.context.get('contextName').parameters.productName; // Update 'contextName' with the actual context name
  const price = getPrice(productName);
  const paymentType = agent.context.get('intentPayment').parameters.payment_type;

  const customerName = agent.parameters.Name;
  const customerAddress = agent.parameters.Address;
  const customerPhone = agent.parameters.Phone;

  saveOrderData(customerName, customerAddress, customerPhone, productName, price, paymentType);

  let msgOrder = `***สรุปยอดสั่งซื้อ***\nLIMGAR : ${productName}\n ${paymentType} : ${price}\n------\n ${customerName}\n ${customerPhone}\n ${customerAddress}`;
  let msgThank = "✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆน่ะค่ะ❤️";

  agent.add(msgOrder);
  agent.add(msgThank);
}

function saveOrderData(customerName, customerAddress, customerPhone, productName, price, paymentType) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ORDER");
  var dateAdd = new Date();

  sheet.appendRow([dateAdd, customerName, customerAddress, customerPhone, productName, paymentType, price]);
}

function saveCustomerData(cusName, cusAddress, cusPhone) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CUSTOMER");
  var dateAdd = new Date();

  sheet.appendRow([dateAdd, customerName, customerAddress, customerPhone]);
}