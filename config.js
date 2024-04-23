function replyMsg(replyToken, messages, platform) {
  var url;
  var headers;
  switch (platform) {
    case "Line":
      url = 'https://api.line.me/v2/bot/message/reply';
      headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + channelToken,
      };
      break;
    case "Facebook":
      url = 'https://graph.facebook.com/v12.0/me/messages';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + channelToken,
      };
      break;
    case "Gemini":
      url = 'https://gemini.example.com/api/messages';
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      };
      break;
    case "Dialogflow":
      url = 'https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/SESSION_ID:detectIntent';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + channelToken,
      };
      break;
    default:
      return; // ไม่ระบุแพลตฟอร์มที่ถูกต้อง
  }

  var options = {
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages
    }),
    'headers': headers
  };
  UrlFetchApp.fetch(url, options);
}