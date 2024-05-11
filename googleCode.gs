function getPrice(productName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Product");
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === productName) {
      return data[i][2]; // Assuming price is in the third column (index 2)
    }
  }

  return "Price not found"; // If product not found
}

function massagePrice(agent) {
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


//////
// Intent: AskPrice
function AskPrice(agent) {
  const productType = agent.parameters.product_type;
  const price = getPrice(productType);

  if (price !== "Price not found") {
    agent.add(`The price of ${productType} is ${price} baht.`);
  } else {
    agent.add(`Sorry, the price of ${productType} is not available.`);
  }
}

// Intent: GetAddress
function GetAddress(agent) {
  const productName = agent.parameters.product_type;
  const customerName = agent.parameters.CustomerName;
  const customerPhone = agent.parameters.CustomerPhone;
  const customerAddress = agent.parameters.CustomerAddress;
  
  const price = getPrice(productName);

  const orderData = {
    productName: productName,
    customerName: customerName,
    customerPhone: customerPhone,
    customerAddress: customerAddress,
    price: price
  };

  saveOrder(orderData);
  agent.add(`Thank you, ${customerName}. Your order has been placed successfully.`);
}


/////





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
  const paymentType = agent.context.get('intentPayment').parameters.paymentType;

  const cusName = agent.parameters.cusName;
  const cusAddress = agent.parameters.cusAddress;
  const cusPhone = agent.parameters.cusPhone;

  saveOrderData(cusName, cusAddress, cusPhone, productName, price, paymentType);

  let msgOrder = `***สรุปยอดสั่งซื้อ***\nสินค้า: ${productName}\n ${paymentType} : ${price}\n------\nชื่อลูกค้า: ${cusName}\nเบอร์โทร: ${cusPhone}\nที่อยู่: ${cusAddress}`;
  let msgThank = "✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆน่ะค่ะ❤️";

  agent.add(msgOrder);
  agent.add(msgThank);
}

function saveOrderData(cusName, cusAddress, cusPhone, productName, price, paymentType) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Order");
  var dateAdd = new Date();

  sheet.appendRow([dateAdd, cusName, cusAddress, cusPhone, productName, paymentType, price]);
}

function saveCustomerData(cusName, cusAddress, cusPhone) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Customer");
  var dateAdd = new Date();

  sheet.appendRow([dateAdd, cusName, cusAddress, cusPhone]);
}