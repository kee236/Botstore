function fulfillment(agent) {
  // ตรวจสอบ intent
  var intent = agent.getIntent();
  switch (intent) {
      case "Welcome":
      welcome(agent);
      break;
    case "intentPrice":
      askPrice(agent);
      break;
    case "intentPayment":
      payment(agent);
      break;

    case "intentConfirm":
      confirmOrder(agent);
      break;
      
    case "intentThank":
      thank(agent);
      break;
    default:
      agent.add("ฉันไม่เข้าใจ");
  }
}


//////

function welcome(agent) {
  agent.add("ยินดีต้อนรับสู่ร้านค้าของเรา ");
  agent.add("ต้องการทราบข้อมูลสินค้าหรือสั่งซื้อสินค้าอะไร?");
}

function intentPrice(agent) {
  // รับค่า parameter product_type
  var productType = agent.parameters.product_type;
  
 
  var product = findProduct(productType);
  
  // ตอบกลับ
  if (product) {
    agent.add(
      "**${product.name}** ราคา ${product.price} บาท\n (ส่งฟรี!!) ราค
าเท่ากัน โอน/ปลายทาง "
    );
  } else {
    agent.add("ไม่พบสินค้า " + productType);
  }
}

// ฟังก์ชันค้นหาสินค้า
function findProduct(productType) {
 "3","549"

}

function intentPayment(agent) {
  // ...
}

function confirmOrder(agent) {
  // รับค่า parameter
  var customerName = agent.parameters.cusName;
  var customerPhone = agent.parameters.cusPhone;
  var customerAddress = agent.parameters.cusAddress;
  
  // ดึงข้อมูลสินค้า
var paymentType = agent.context.get("intentPayment").parameters.paymentType;
  var productName = agent.context.get("intentPrice").parameters.productType;
  var productPrice = findProduct(productName);
  
  // บันทึกข้อมูล
  saveOrder(customerName, customerPhone, customerAddress, productPrice);
  
  // แสดงผล
  agent.add(
    "***สรุปยอดสั่งซื้อ**\n" +
      product.productName +
      "\n" +paymentType+":"+
      product.productPrice +
      " บาท\n" +
      "------\n" +
      "ชื่อลูกค้า: " +
      customerName +
      "\n" +
      "เบอร์โทร: " +
      customerPhone +
      "\n" +

      "ที่อยู่: " +
      customerAddress
  );
}

// ฟังก์ชันบันทึกข้อมูล
function saveOrder(customerName, customerPhone, customerAddress, productPrice) {
  // ...
}





var intentMap = new Map([
  ["Askprice", "intentPrice"],
  ["ConfirmOrder", "ยืนยันสั่งซื้อ"],
  ["Welcome", "ต้อนรับ"],
  ["Payment", "ชำระเงิน"],
  ["Thank", "ขอบคุณ"],
]);

