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

let translateButtonId = "translate";
let translateBtnText = "Translate to sign language - ترجم للغة الاشارة";
let popupSize = { width: 600, height: 900 };

function createWindow(selectionText) {
  if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
    chrome.windows.create({ url: "popup.html?text=" + selectionText, type: "popup", width: popupSize.width, height: popupSize.height });
  } else if (currentBrowser === "Firefox") {
    browser.windows.create({ url: "popup.html?text=" + selectionText, type: "popup", width: popupSize.width, height: popupSize.height });
  }
}
// Chrome & Edge Context Menu
if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
  // Create the context menu item
  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      id: translateButtonId,
      title: translateBtnText,
      contexts: ["selection"]
    });
  });

  chrome.contextMenus.onClicked.addListener(info => {
    createWindow(info.selectionText);
  });

  // Listen for messages from content scripts
  chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === "open-popup") createWindow(request.text);
  });
}

// Firefox Context Menu
if (currentBrowser === "Firefox") {
  // Create the context menu item
  browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
      id: translateButtonId,
      title: translateBtnText,
      contexts: ["selection"]
    });
  });

  browser.contextMenus.onClicked.addListener(info => {
    createWindow(info.selectionText);
  });

  // Listen for messages from content scripts
  browser.runtime.onMessage.addListener(function (request) {
    if (request.action === "open-popup") createWindow(request.text);
  });
}

// Safari Context Menu
if (currentBrowser === "Safari") {
  // Register the context menu item when the global page loads
  safari.application.addEventListener(
    "command",
    event => {
      if (event.command === translateButtonId) {
        // Create the context menu item
        var contextMenu = event.target.contextMenu;
        contextMenu.appendContextMenuItem(translateButtonId, translateBtnText, "selection");
      }
    },
    false
  );

  // Handle context menu item click event
  safari.application.addEventListener(
    "validate",
    event => {
      if (event.command === translateButtonId) {
        // Handle the click event
        console.log("Selected Text:", safari.application.activeBrowserWindow.activeTab.page.selection.toString());
        // Open a new tab or window with the desired URL
        safari.application.activeBrowserWindow.openTab("foreground").url = "popup.html";
      }
    },
    false
  );
}
