// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "Привет, background.js!") {
//     console.log("Получено сообщение от popup.js:", request);

//     // Делайте что-то с сообщением

//     // Отправьте ответ обратно в popup.js
//     sendResponse({ response: "Привет, popup.js!" });
//   }
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (request.message === "Привет, background.js!") {
  //   console.log("Получено сообщение от popup.js:", request);

  //   // Выполните нужные операции асинхронно, если необходимо
  //   // Например, отправка запроса к серверу или выполнение других асинхронных операций

  //   // Отправьте ответ обратно в popup.js
  //   // Проверьте, что порт сообщения не закрыт перед отправкой ответа
  //   // if (chrome.runtime.lastError) {
  //   //   console.error(chrome.runtime.lastError);
  //   //   return;
  //   // }

  //   // sendResponse({ response: "Привет, popup.js!" });
  // }
  if (request.message === "on") {
    console.log("1")
    var config = {
      mode: "pac_script",
      pacScript: {
        data: `
        function FindProxyForURL(url, host) {
          if (url.includes("ru") || url.includes("vk.com") || url.includes(".onion")) {
            return "SOCKS5 129.153.213.94:9050"; 
          } else {
            return "DIRECT";
          }
        }
        `
      }
    };

    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      function () { }
    );

  } else {
    console.log("2")

    var config = {
      mode: "pac_script",
      pacScript: {
        data: `
        function FindProxyForURL(url, host) {
          return "DIRECT";
        }
        `
      }
    };

    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      function () { }
    );
  }

});


// chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.greeting == "GetURL") {
//     var tabURL = "Not set yet";
//     chrome.tabs.getCurrent(function (tab) {
//       tabURL = tab.url;
//     });

//     sendResponse({ navURL: tabURL });
//   }
// })

