// detect browser
function getBrowserType() {
  let browser;
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
    browser = "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    browser = "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    browser = "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    browser = "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browser = "Firefox";
  } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
    //IF IE > 10
    browser = "IE";
  } else {
    browser = "unknown";
  }
  return browser;
}
// current used browser
let currentBrowser = getBrowserType();

// Chrome
if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
  chrome.runtime.onInstalled.addListener(() => {
    // Create the context menu item
    chrome.contextMenus.create({
      id: "translate",
      title: "ترجمة بلغة الاشارة",
      contexts: ["selection"]
    });
  });

  chrome.contextMenus.onClicked.addListener(info => {
    // Send a message to the background script to open the popup
    console.log("Selected Text:", info.selectionText);
    chrome.windows.create({ url: "https://www.google.com", type: "popup" });
  });
}

// Firefox
if (currentBrowser === "Firefox") {
  browser.runtime.onInstalled.addListener(() => {
    // Create the context menu item
    browser.contextMenus.create({
      id: "translate",
      title: "ترجمة بلغة الاشارة",
      contexts: ["selection"]
    });
  });

  browser.contextMenus.onClicked.addListener(info => {
    // Send a message to the background script to open the popup
    console.log("Selected Text:", info.selectionText);
    browser.windows.create({ url: "https://www.google.com", type: "popup" });
  });
}
