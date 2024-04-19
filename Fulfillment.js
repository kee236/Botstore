// ดึงข้อมูลสินค้าจาก Google Sheets (สมมติว่าอยู่ใน Sheet ชื่อ "Products")
const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("A2:B"); // A2:B คือช่วงข้อมูลสินค้า (ชื่อสินค้า, ราคา)
const values = range.getValues();
const products = [];

for (const row of values) {
  const productName = row[0];
  const productPrice = row[1];
  products.push({ productName, productPrice });
}

// ฟังก์ชันสำหรับตอบคำถามเกี่ยวกับราคาสินค้า
async function AskPrice(agent) {
  // ดึงชื่อสินค้าจากพารามิเตอร์ของตัวแทน
  const productName = agent.parameters.productType;

  // ค้นหาสินค้าจากข้อมูลที่ดึงมาจาก Google Sheets
  const product = products.find(product => product.productName === productName);

  // ตรวจสอบว่ามีสินค้าหรือไม่
  if (!product) {
    agent.add(`ขออภัยค่ะ สินค้า "${productName}" ยังไม่มีราคาในระบบ`);
    return;
  }

  // สร้างข้อความแจ้งราคาสินค้า
  const priceMessage = { productName, productPrice: product.productPrice };

  // สร้างข้อความ
  const message = { priceMessage, platform: "Facebook" };
// สร้างข้อความแจ้งราคาสินค้า
const priceMessage = { 
  productName: agent.parameters.productType, 
  productPrice: getprice(agent.parameters.productType) // ดึงราคาสินค้าจากฟังก์ชัน getprice() 
};

// สร้างข้อความ
const message = {
  text: `**${priceMessage.productName} ราคา ${priceMessage.productPrice} บาท\n🫴(ส่งฟรี!!) ทั้งโอนและปลายทาง✨**`,
  platform: "Facebook"
};

// แสดงข้อความบนแพลตฟอร์ม Facebook
agent.add(message);

}

// ฟังก์ชันสำหรับบันทึกข้อมูลลูกค้า
async function SaveCustomer(agent) {
  // ดึงข้อมูลลูกค้าจากพารามิเตอร์ของตัวแทน
  const customerName = agent.parameters.customerName;
  const customerEmail = agent.parameters.customerEmail;

  // บันทึกข้อมูลลูกค้าลงใน Google Sheets (สมมติว่าอยู่ใน Sheet ชื่อ "Customers")
  const customerSheet = SpreadsheetApp.openById("Spreadsheet ID").getSheetByName("Customers");
  const lastRow = customerSheet.getLastRow();
  customerSheet.getRange(lastRow + 1, 1).setValue(customerName);
  customerSheet.getRange(lastRow + 1, 2).setValue(customerEmail);

  // แจ้งผลการบันทึกข้อมูล
  agent.add(`บันทึกข้อมูลลูกค้าเรียบร้อยแล้วค่ะ`);
}

// ฟังก์ชันสำหรับบันทึกข้อมูลคำสั่งซื้อ
async function SaveOrder(agent) {
  // ดึงข้อมูลคำสั่งซื้อจากพารามิเตอร์ของตัวแทน
  const productName = agent.parameters.productType;
  const productQuantity = agent.parameters.productQuantity;

  // บันทึกข้อมูลคำสั่งซื้อลงใน Google Sheets (สมมติว่าอยู่ใน Sheet ชื่อ "Orders")
  const orderSheet = SpreadsheetApp.openById("Spreadsheet ID").getSheetByName("Orders");
  const lastRow = orderSheet.getLastRow();
  orderSheet.getRange(lastRow + 1, 1).setValue(productName);
  orderSheet.getRange(lastRow + 1, 2).setValue(productQuantity);

  // แจ้งผลการบันทึกข้อมูล
  agent.add(`ข้อมูลคำสั่งซื้อเรียบร้อยแล้วค่ะ`);
}

// ฟังก์ชันสำหรับจัดการการตอบกลับ
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  //ตรวจสอบ request ว่ามีข้อมูลที่ต้องการไหม
  if (!data.queryResult) {
    return responseJSON({ fulfillmentText: 'หนูว่ามีปัญหาแล้วอันนี้' });
  }
  const { parameters, intent } = data.queryResult;
  //ตรวจสอบว่า intent เป็นการถามราคาหรือเปล่า (เผื่อมีหลาย intent)
  if (intent.displayName === 'Askprice') {
    AskPrice(agent);
  } else if (intent.displayName === 'Confirm Order') {
    SaveOrder();
    SaveCustomer();
    agent.add('✨อิงซาอัลลอฮ ✨ทานแล้วขอให้อาการต่างๆของลูกค้าหายไวๆน่ะค่ะ❤️');
  } else {
    //ในการณีที่ไม่เจอ Intent ที่เขียนเอาไว้้
    return responseJSON({ fulfillmentText: 'ขอบคุณค่ะ' });
  }
}

// ฟังก์ชันสำหรับสร้าง JSON Response
function responseJSON(response) {
  return {
    statusCode: 200,
    contentType: 'application/json',
    payload
