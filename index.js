const { WebhookClient } = require('dialogflow-fulfillment');
const { SheetsName } = require('./SheetsName');
const { sendLineNotify } = require('./LineNotify'); // ส่ง Line Notify

const agent = new WebhookClient({ request, response });


function AskPrice(agent) {
  const productName = agent.parameters.product_type;
  const price = ProductPrice('productName');

const facebookMessage = {
  text: {
    text: [
      `**${productName} ราคา ${price} บาท\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨`
    ]
  },
  platform: "Facebook"
};

// ปุ่ม Quick Reply
const quickReply = {
  quickReply: {
    title: "ลูกค้าสะดวกชำระแบบไหนดีค่ะ ?",
    quickReplies: [
      { title: "โอน", payload: "bank" },
      { title: "ปลายทาง", payload: "cod" }
    ]
  },
  platform: "Facebook"
};
  

  agent.add(msgAskprice);
  agent.add(msgQuikreply);
  
  agent.add(new Payload('LINE', { quickReplies }, { sendAsMessage: true }));
}

function Payment(agent) {
  const paymentType = agent.parameters.payment_type;
  var productName = agent.context.get('Askprice').parameters.product_type;
  var price = ProductPrice('productName');
  
  }

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

function Confirmorder(agent) {
var productName = agent.context.get('Askprice').parameters.product_type;
var price = ProductPrice('productName');
var paymentType = agent.context.get('paymentType').parameters.payment_type;
 
const customerName = agent.parameters.customer_name;
const address = agent.parameters.address;
const phone = agent.parameters.phone;

saveCustomerData("customerName", "adress", "phone");
saveOrderData(customerName, phone,address, productName, price, paymentType);
  
  let msgOrder = "***สรุปยอดสั่งซื้อ***\nสินค้า: ${productName}\n ${paymentType} : ${price}\n------\nชื่อลูกค้า: ${customerName}\nเบอร์โทร: ${phone}\nที่อยู่: ${address}";
  
  let msgThank = "✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆน่ะค่ะ❤️";

  agent.add(msgOrder);
  agent.add(msgThank);
  }


let intentMap = new Map();
intentMap.set('AskPrice', AskPrice);
intentMap.set('Payment', Payment);
intentMap.set('Confirmorder', Confirmorder);
intentMap.set('intentConfirm', intentConfirm); // เพิ่ม intentConfirm ลงในแผนที่
agent.handleRequest(intentMap);



function saveOrderData(customerName, address, phone, productName, paymentType, price) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Order");
  var DateAdd = new Date() ;
  sheet.appendRow([DateAdd,customerName, address, phone,productName, paymentType, price ] );
}
function saveCustomerData(customerName, address, phone) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Customers");
  var DateAdd = new Date() ;
  sheet.appendRow([DateAdd,customerName, address, phone ] );
}
