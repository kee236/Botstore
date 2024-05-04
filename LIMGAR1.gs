const getprice = (productName) => {
        const mockPriceList = {
        '1ขวด': 199,
        '2ขวด': 368,
        '3ขวด': 549,
        '4ขวด' : 699,
        '5ขวด' : 840,
        '6ขวด' : 990,
        '7ขวด' : 1190,
        '8ขวด' : 1320,
        '9ขวด' : 1450,
        '12ขวด' : 1690,
        '1ลัง' : 1690,
    };
    return mockPriceList[productName] || 0;
};




function processIntent(agent) {
    let intentName = agent.intent;
    
    switch (intentName) {
        case 'wellcome':
           handle_wellcome(agent);
            // agent.add('สวัสดีค่ะ! ยินดีต้อนรับเข้าสู่บริการของเรา');
            break;
        case 'intent_fallback':
           handle_fallback(agent);
            //agent.add('ขอโทษนะคะ ฉันไม่เข้าใจคำถามของคุณ คุณสามารถพูดใหม่อีกครั้งได้ไหมคะ?');
            break;
        case 'intentPrice':
            handlePrice(agent);
            //agent.add('ราคาของสินค้าคือ 100 บาท');
            break;
        case 'intentPayment':
            handlePayment(agent);
            break;
        case 'intentOrder':
            handleOrder(agent);
            break;
        case 'intent_Thank':
            agent.add('ยินดีค่ะ! หากมีคำถามเพิ่มเติม ไม่ลังการที่จะช่วยเสมอค่ะ');
            break;
        default:
            agent.add('ขอโทษค่ะ ฉันไม่สามารถตอบคำถามนี้ได้ในขณะนี้');
    }
}




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

function handleIntentPrice(agent) {
    const productName = agent.parameters['productName'];
    const price = getprice(productName);
    
    const messagePrice = `Limgar ${productName} ราคา ${price} บาท (ส่งฟรี!!) แบบโอนและปลายทาง`;
    
    agent.add(messagePrice);
}


function handlePayment(agent) {
    let paymentType = agent.parameters['paymentType'];

    switch (paymentType) {
        case 'cod':
            agent.add('คุณเลือกชำระเงินปลายทาง');
            break;
        case 'bank':
                      
            agent.add('คุณเลือกชำระเงินผ่านธนาคาร');
            break;
        case 'walkin':
            agent.add('คุณเลือกมาชำระเงินเองที่ร้าน');
            break;
        default:
            agent.add('กรุณาเลือกวิธีการชำระเงิน');
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