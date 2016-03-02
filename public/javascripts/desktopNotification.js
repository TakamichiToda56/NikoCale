if (Notification.permission === 'granted') {
  console.log('通知許可されています');
} else {
  Notification.requestPermission(function(result) {
    if (result === 'denied') {
      alert('リクエスト結果：通知許可されませんでした');
    } else if (result === 'default') {
      alert('リクエスト結果：通知可能か不明です');
    } else if (result === 'granted') {
      alert('リクエスト結果：通知許可されました！！');
    }
  })
}

desktopNotification = function(name,tweet,iconPath){
  var notification = new Notification(name, {
      body: tweet,
      icon: iconPath
  });
}

var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':3000');

ws.onmessage = function (event) {
    var jsonData = JSON.parse(event.data);
    var obj = (new Function("return " + jsonData))();
    desktopNotification(obj.name,obj.feeling,obj.tweet);
};

function send(name,feeling,tweet) {
    var jsonData = '{name:"' + name + '",feeling:"' + feeling + '",tweet:"' + tweet + '"}';
    console.log(jsonData);
    ws.send(jsonData);
}
