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

// Chrome & Edge Context Menu
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

// Firefox Context Menu
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

// Safari Context Menu
if (currentBrowser === "Safari") {
  // Register the context menu item when the global page loads
  safari.application.addEventListener(
    "command",
    event => {
      if (event.command === "translate") {
        // Create the context menu item
        var contextMenu = event.target.contextMenu;
        contextMenu.appendContextMenuItem("translate", "ترجمة بلغة الاشارة", "selection");
      }
    },
    false
  );

  // Handle context menu item click event
  safari.application.addEventListener(
    "validate",
    event => {
      if (event.command === "translate") {
        // Handle the click event
        console.log("Selected Text:", safari.application.activeBrowserWindow.activeTab.page.selection.toString());
        // Open a new tab or window with the desired URL
        safari.application.activeBrowserWindow.openTab("foreground").url = "https://www.google.com";
      }
    },
    false
  );
}
