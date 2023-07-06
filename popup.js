// setTimeout(() => {
//   chrome.runtime.sendMessage({ message: "Привет, background.js!" }, function(response) {
//     console.log("Ответ от background.js:", response);
//   });
//   // // chrome.extension.sendMessage({ greeting: "GetURL" },
//   // //   function (response) { tabURL = response.navURL });
//   // chrome.runtime.sendMessage({ mycontent: "from content script" })

//   // console.log(chrome.extension)
// }, 3000)
document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){

  document.querySelector("#on").addEventListener("click", function (event) {
    chrome.runtime.sendMessage({ message: "on" });
  });

  document.querySelector("#off").addEventListener("click", function (event) {
    chrome.runtime.sendMessage({ message: "off" });
  });

})