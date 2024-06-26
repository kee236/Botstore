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



///////// Gemini/////


var channelToken = ""; //Token Line
var apiKey = ""; //Key Gemini

function replyMsg(replyToken, mess, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': mess
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
        var value = JSON.parse(e.postData.contents);
        var events = value.events;
        var event = events[0];
        var type = event.type;
        var replyToken = event.replyToken;
        
switch (intent) {
          case 'follow':
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'message':
            var messageType = event.message.type;
            if(messageType == "text"){
              gemini_pro(event);
            }
            else if(messageType == "image"){
              gemini_provision(event);
            }
            else{
            var mess = [{"type":"text","text":"Hello world"}];
            replyMsg(replyToken, mess, channelToken);
            }
            break;
          default:
            break;
        }
}

function gemini_pro(event) {
var userMessage = event.message.text;
var replyToken = event.replyToken;
var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;
var requestBody = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": userMessage
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.9,
      "topK": 1,
      "topP": 1,
      "maxOutputTokens": 2048,
      "stopSequences": []
    }
  };
  
   var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(requestBody)
  };

 // เลือกเฉพาะข้อมูลที่คุณต้องการ
  var response = UrlFetchApp.fetch(apiUrl, options);
  var responseData = JSON.parse(response.getContentText());
  var textResult = responseData.candidates[0].content.parts[0].text;
  var mess = [{"type":"text","text": textResult.toString()}];
  replyMsg(replyToken, mess, channelToken);

}


function gemini_provision(event) {
  var messageId = event.message.id;
  var replyToken = event.replyToken;
  var url = "https://api-data.line.me/v2/bot/message/"+messageId+"/content";
  var headers = {
    "headers":{"Authorization": "Bearer "+channelToken}
  };
  var getcontent = UrlFetchApp.fetch(url, headers);
  var imageBlob = getcontent.getBlob();
  var encodedImage = Utilities.base64Encode(imageBlob.getBytes());
  var apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey;
  var payload = {
    "contents": [
      {
        "parts": [
          {
            "text": "ช่วยบรรยายภาพนี้ให้หน่อย"
          },
          {
            "inlineData": {
              "mimeType": "image/jpeg",
              "data": encodedImage
            }
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.4,
      "topK": 32,
      "topP": 1,
      "maxOutputTokens": 4096,
      "stopSequences": []
    },
    "safetySettings": [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var responseData = JSON.parse(response.getContentText());
  var textResult = responseData.candidates[0].content.parts[0].text;
  var mess = [{"type":"text","text": textResult.toString()}];
  replyMsg(replyToken, mess, channelToken);
}