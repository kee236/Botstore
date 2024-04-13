const { WebhookClient } = require('dialogflow-fulfillment');
const { SheetsName } = require('./SheetsName');
const { sendLineNotify } = require('./LineNotify'); // ส่ง Line Notify

const agent = new WebhookClient({ request, response });


function AskPrice(agent) {
  const product_name = agent.parameters.product_type;
  let price;
  let msgPrice = "";

  switch (product_name) {
    case '2ขวด': 
      price = 368; 
      break;
    case 'เซต 3ขวด': 
      price = 549; 
      break;
    case 'เซต 6ขวด': 
      price = 990; 
      break;
    case '12 ขวด': 
      price = 1690; 
      break;
    default:
      price = 0; // ใส่ราคาเริ่มต้นเป็น 0 เมื่อไม่พบชนิดสินค้า
  }

  if (price > 0) {
    msgPrice = `🔸**${product_name} ราคา ${price} บาท🔆\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨`;
  } else {
    msgPrice = "ขออภัย ไม่พบราคาสำหรับสินค้านี้";
  }

  const quickReplies = [
    { "title": "โอน", "payload": "bank" },
    { "title": "ปลายทาง", "payload": "cod" }
  ];

  agent.add(msgPrice);
  agent.add(new Payload('LINE', { quickReplies }, { sendAsMessage: true }));
}

function Payment(agent) {
  const payment_type = agent.parameters.payment_type;
  let product_name = agent.context.get('context-name').parameters.product_type;
  let price;

  switch (product_name) {
    case '2ขวด': 
      price = 368; 
      break;
    case 'เซต 3ขวด': 
      price = 549; 
      break;
    case 'เซต 6ขวด': 
      price = 990; 
      break;
    case '12 ขวด': 
      price = 1690; 
      break;
    default:
      price = 0; // ใส่ราคาเริ่มต้นเป็น 0 เมื่อไม่พบชนิดสินค้า
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
  const payment_type = agent.parameters.payment_type;
  const product_name = agent.parameters.product_name;
  const customer_name = agent.parameters.customer_name;
  const address = agent.parameters.address;
  const phone = agent.parameters.phone;

  let msgOrder = `***สรุปยอดสั่งซื้อ***\nสินค้า: ${product_name}\nวิธีการชำระเงิน: ${payment_type}\n------\nชื่อลูกค้า: ${customer_name}\nเบอร์โทร: ${phone}\nที่อยู่: ${address}`;

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
