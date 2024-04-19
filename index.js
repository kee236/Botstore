const { WebhookClient } = require('dialogflow-fulfillment');
const { SheetsName } = require('./SheetsName');
const { sendLineNotify } = require('./LineNotify'); // ส่ง Line Notify

const agent = new WebhookClient({ request, response });


function intentPrice(agent) {
  const productName = agent.parameters.productType;
  const price = ProductPrice('productName');

const msgPrice = {
  text: {
    text: [
      `**${productName} ราคา ${price} บาท\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨`
    ] }, platform: "Facebook" };

// ปุ่ม Quick Reply
const msgQuickReply = {
  quickReply: {
    title: "ลูกค้าสะดวกชำระแบบไหนดีค่ะ ?",
    quickReplies: [
      { title: "โอน", payload: "bank" },
      { title: "ปลายทาง", payload: "cod" }
    ]
  },
  platform: "Facebook"
};
  

  agent.add(msgPrice);
  agent.add(msgQuikreply);
  
  agent.add(new Payload('LINE', { quickReplies }, { sendAsMessage: true }));
}

function Payment(agent) {
  const paymentType = agent.parameters.paymentType;

  const productName = agent.context.get('intentPrice').parameters.productType;
  const price = ProductPrice('productName');
  
  

  let msgCod = "แบบปลายทาง แจ้ง ชื่อ, ที่อยู่จัดส่ง, และเบอร์โทรศัพท์ เพื่อส่งมาได้เลยค่ะ 🧾";

  let msgBanknumber = "ธนาคาร : กสิกรไทย\nชื่อบัญชี : อับดุลวอฮะ มะสง\nเลขบัญชี : 1048727642";

  let msgBank = `🔹 ${product_name} แบบโอนยอดชำระ ${price} บาท ค่ะ💫\n🧾 โอนแล้ว แจ้งสลิป และ ชื่อ ที่อยู่ เบอร์โทร มาได้เลยนะค่ะ`;

  if (payment_type === 'cod') {
    agent.add(msgCod);
  } else if (payment_type === 'bank') {
    agent.add(msgBanknumber);
    agent.add(msgBank);
  }
}



  function intentConfirm(agent) {
   const productName = agent.context.get('intentPrice').parameters.productType;
   const price = ProductPrice('productName');

   const paymentType = agent.context.get('intentPayment').parameters.paymentType;
 
const cusName = agent.parameters.cusName;
const cusAddress = agent.parameters.cusAddress;
const cusPhone = agent.parameters.cusPhone;

saveCustomerData("cusName", "cusPhone", "cusAddress");

saveOrderData(cusName, cusPhone,cusAddress, productName, price, paymentType);
  
  let msgOrder = "***สรุปยอดสั่งซื้อ***\nสินค้า: ${productName}\n ${paymentType} : ${price}\n------\nชื่อลูกค้า: ${customerName}\nเบอร์โทร: ${cusPhone}\nที่อยู่: ${cusAddress}";
  
  let msgThank = "✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆน่ะค่ะ❤️";

  agent.add(msgOrder);
  agent.add(msgThank);
  }


let intentMap = new Map();
intentMap.set('intentPrice', intentPrice);
intentMap.set('intentPayment', intentPayment);
intentMap.set('intentConfirm', intentConfirm);
//intentMap.set('intentConfirm', intentConfirm); 
// เพิ่ม intentConfirm ลงในแผนที่
agent.handleRequest(intentMap);






let productName = parameters.productType;
let price = getPrice(productName);
let msgPrice = `🔹${productName} ราคา ${price} บาท (ส่งฟรี!! )ทั้งโอน และปลายทางค่ะ 💫`;



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


function saveOrderData( )
 {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Order");
  var DateAdd = new Date() ;

   const productName = agent.context.get('intentPrice').parameters.productType;
  const price = ProductPrice('productName');

   const paymentType = agent.context.get('intentPayment').parameters.paymentType;
  
sheet.appendRow([DateAdd,cusName, cusAddress, cusPhone,productName, paymentType, price ] );

}


function saveCustomerData(cusName, cusAddress,cusPhone) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Customer");

  var DateAdd = new Date() ;
  sheet.appendRow([DateAdd,cusName, cusAddress, cusPhone ] );
}
