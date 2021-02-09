const wsUri = "wss://echo.websocket.org/";

const output = document.getElementById("output");
const btnGeo = document.querySelector(".j-btn-geo");
const btnSend = document.querySelector(".j-btn-send");
const message = document.querySelector("#msg");

let websocket;
let socketTimeOut;
let messageLimbo = "";
let waitingMessage = "";
let waitingOnScreen = "";

function writeToScreen(message) {
  output.innerHTML = output.innerHTML + message;
}

function open_connection() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) {
    socketTimeOut = setTimeout(closeConnection, 10000);
    if (messageLimbo) {
      writeToScreen(waitingOnScreen);
      websocket.send(waitingMessage);
    }
  };
  websocket.onclose = function (evt) {
    if (socketTimeOut) {
      clearTimeout(socketTimeOut);
      socketTimeOut = "";
    }
  };
  websocket.onmessage = function (evt) {
    if (!evt.data.startsWith("techdata")) {
      writeToScreen(
        '<div class="chat-response chat-item">' + evt.data + "</div>"
      );
    }
    clearTimeout(socketTimeOut);
    socketTimeOut = setTimeout(closeConnection, 10000);
  };
  websocket.onerror = function (evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  };
}

function closeConnection() {
  websocket.close();
  websocket = null;
}

btnSend.addEventListener("click", () => {
  let msg = message.value;
  if (msg) {
    if (websocket) {
      clearTimeout(socketTimeOut);
      socketTimeOut = setTimeout(closeConnection, 10000);
      writeToScreen('<div class="chat-msg chat-item">' + msg + "</div>");
      websocket.send(msg);
      message.value = null;
    } else {
      messageLimbo = "text";
      waitingMessage = msg;
      waitingOnScreen = '<div class="chat-msg chat-item">' + msg + "</div>";
      message.value = null;
      open_connection();
    }
  }
});

//Геолокация

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen(
    '<div class="chat-response chat-item">Невозможно получить ваше местоположение</div>'
  );
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log("position", position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let snd = `techdata: ${latitude} : ${longitude}`;
  let msg =
    '<div class="chat-msg chat-item">' +
    `<a href ="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a>` +
    "</div>";
  if (websocket) {
    clearTimeout(socketTimeOut);
    socketTimeOut = setTimeout(closeConnection, 10000);
    writeToScreen(msg);
    websocket.send(snd);
  } else {
    messageLimbo = "geoloc";
    waitingMessage = snd;
    waitingOnScreen = msg;
    open_connection();
  }
};

btnGeo.addEventListener("click", () => {
  if (!navigator.geolocation) {
    writeToScreen(
      '<div class="chat-response chat-item">' +
        "Geolocation не поддерживается вашим браузером" +
        "</div>"
    );
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
