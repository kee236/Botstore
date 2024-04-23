function dailyEventMessage() {
  var googleCalendarId = "Your google calendar id";
  
  var calendar = CalendarApp.getCalendarById(googleCalendarId);
  var today = new Date();
  var dailyEventList = calendar.getEventsForDay(today);
  
  //Logger.log(dailyEventList);
  
  
var massageOrder " ";
var Title = "***สรุปยอดสั่งซื้อ***";

var Order = \n"order id :"+orderId+"\n"LIMGAR : "productName"\n"+ paymentType+":"+ProductPrice+"\n";

  var customer = "cusName+"\n"+ cusPhone+"\n"+cusAddress ;
 massageOrder+="\n"+Title+"\n"+Order+"\n"+customer ;


var message = "";
  for (var i = 0; i < dailyEventList.length; i++) {
  
    var eventTitle = "Title: " + "\n" + dailyEventList[i].getTitle();
    var eventTime = "Start Time: " + "\n" + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
    var eventDescription = "Description: " + "\n" + dailyEventList[i].getDescription();
    
    message += "\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    
  }
  
  if (message !== "") {
    
    Logger.log(message);
    sendMessage(message);
    
  }
}


function sendMessage(message) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = "Your line notify access token";
  
  var formData = {
    "message": message
  };
  
  var options = {
    "headers" : {"Authorization" : "Bearer " + accessToken},
    "method" : 'post',
    "payload" : formData
  };

  try {
    var response = UrlFetchApp.fetch(lineNotifyEndPoint, options);
  }
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
    
  if (response.getResponseCode() !== 200) {
    Logger.log("Sending message failed.");
  } 
}