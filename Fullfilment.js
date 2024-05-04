


//////
var ss = SpreadsheetApp.openByUrl("YOUR_SPREADSHEET_URL");

function saveOrder(customerName, customerPhone, customerAddress, productPrice) {
  var ws = ss.getSheetByName("Order");
  ws.appendRow([new Date(), customerName, customerPhone, customerAddress, productPrice]);
}

function saveCustomer(customerName, customerPhone, customerAddress) {  
  var ws = ss.getSheetByName("Customer");
  ws.appendRow([new Date(), customerName, customerPhone, customerAddress]);
}

const productPrices = {
  "2ขวด": 368,
  "3ขวด": 549,
  "6ขวด": 990,
  "12ขวด": 1690
};


function doPost(e) {
   
  var data = JSON.parse(e.postData.contents)
  }
function welcome(agent) {
  agent.add("ยินดีต้อนรับสู่ร้านค้าของเรา ");
  agent.add("ต้องการทราบข้อมูลสินค้าหรือสั่งซื้อสินค้าอะไร?");
}

function intentPrice(agent) {
  // รับค่า parameter product_type
  var productName = agent.parameters.product_type;

  var productPrice = productPrices(productName);
  

const answer_price = "🔹**"+productName+"** ราคา"+productPrice+"บาท" \n
"👉 พิเศษ ส่งฟรี!! ราคานี้ทั้งแบบโอน และ ปลายทาง";

}

function intentPayment(agent) {
  var paymentType = agent.context.get("intentPayment").parameters.paymentType;
  let answer_MsgPay = ''; // กำหนดตัวแปร answer_MsgPay เป็นตัวแปรโลคอลในฟังก์ชัน

  if (paymentType === "โอน") {
    const imgBank = "URL image Back";
    const msgBank = "กสิกรไทย";
    const msgBankName = "น.ส.นัสรียา มะสง";
    const msgBankNumber = "123456778";

    const bankMessage = `ธนาคาร: ${msgBank} ชื่อบัญชี: ${msgBankName} เลขที่บัญชี: ${msgBankNumber}`;
    const slipMessage = 'แจ้งสลิปพร้อมชื่อ ที่อยู่ เบอร์โทร มาด้วยนะคะ';
    answer_MsgPay = `${imgBank}, ${bankMessage}, ${slipMessage}`;
  } else if (paymentType === "ปลายทาง") {
    answer_MsgPay = 'แบบปลายทาง แจ้งชื่อ ที่อยู่ และเบอร์โทร ได้เลยค่ะ';
  } else {
    answer_MsgPay = 'No massage'; // คำอธิบายในกรณีที่ไม่มีการเลือกวิธีการชำระเงิน
  }

  // ส่งข้อความกลับไปยังผู้ใช้
  agent.add(answer_MsgPay);
}




function confirmOrder(agent) {
  // รับค่า parameter
  var customerName = agent.parameters.cusName;
  var customerPhone = agent.parameters.cusPhone;
  var customerAddress = agent.parameters.cusAddress;
  
  // ดึงข้อมูลสินค้า
var paymentType = agent.context.get("intentPayment").parameters.paymentType;
  var productName = agent.context.get("intentPrice").parameters.productType;
 
  var productPrice = productPrices(productName);

  // บันทึกข้อมูล
  saveOrder(customerName, customerPhone, customerAddress,productName,paymentType,productPrice);
  
const anws_order = "***สรุปยอดสั่งซื้อ***\n" +
      product.productName +
      "\n" + paymentType + ":" +
      product.productPrice + " บาท\n" +
      "------\n" +
      "ชื่อลูกค้า: " + customerName + "\n" +
      "เบอร์โทร: " + customerPhone + "\n" +
      "ที่อยู่: " + customerAddress;

const anws_thank = '✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆนะคะ❤️';

const anws_intentconfirm = `${anws_order}\n${anws_thank}`;

  agent.add(anws_intentconfirm) ;
}





var intentMap = new Map([
  ["Askprice", "intentPrice"],
  ["ConfirmOrder", "intentConfirm"],
  ["Welcome", "welcome"],
  ["Payment", "intentPayment"],
  ["getAskGimini", "fallback"],
]);

var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    return replyJSON;
}