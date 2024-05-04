



function processIntent(agent) {
  const intentName = agent.intent;
  
  switch (intentName) {
    case 'welcoome':
      saveUserDataInFirebase(agent);
      break;
    case 'intentOrder':
      handleOrder(agent);
      break;
    default:
      agent.add('ขอโทษค่ะ ฉันไม่สามารถตอบคำถามนี้ได้ในขณะนี้');
  }
}

function handleOrder(agent) {
  const customerName = agent.parameters['customerName'];
  const customerPhone = agent.parameters['customerPhone'];
  const customerAddress = agent.parameters['customerAddress'];
  const productName = agent.parameters['productName'];
  const paymentType = agent.parameters['payment'];

  const price = getPrice(productName);

  saveOrderData(customerName, customerPhone, customerAddress, productName, paymentType, price);

  const message = `***สรุปยอดสั่งซื้อ***\n LIMGAR: ${productName}\n ${paymentType} ${price}\n------\n ${customerName}\n${customerPhone}\n ${customerAdress}`;

}




function saveOrderData(customerName, customerPhone, customerAddress, productName, paymentType, price) {
  sheets.spreadsheets.values.append({
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    range: 'Order',
    valueInputOption: 'RAW',
    resource: {
      values: [[customerName, customerPhone, customerAddress, productName, paymentType, price]]
    }
  });

  db.collection('orders').doc().set({
    customerName: customerName,
    customerPhone: customerPhone,
    customerAddress: customerAddress,
    productName: productName,
    paymentType: paymentType,
    price: price
  });
}