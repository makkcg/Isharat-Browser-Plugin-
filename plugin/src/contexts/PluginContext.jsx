import { createContext, useEffect, useState } from "react";
import contentControls from "../data/contentControls";
export const PluginContext = createContext();

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

export default function PluginContextProvider(props) {
  const chrome = window.chrome || {};
  let currentBrowser = getBrowserType();

  const [currentWebsite, setCurrentWebsite] = useState("");
  useEffect(() => {
    sendMessage("get-current-domain", "", setCurrentWebsite);
  }, []);

  function sendMessage(action, payload, setResponse) {
    // Chrome
    if ((currentBrowser === "Chrome" || currentBrowser === "Edge") && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action, payload }, function (response) {
          if (setResponse) setResponse(response);
        });
      });
    }
    // Firefox
    if (currentBrowser === "Firefox" && browser.tabs) {
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send a message to the active tab's content script
        browser.tabs.sendMessage(tabs[0].id, { action, payload });
      });
    }
    // Safari
    if (currentBrowser === "Safari") {
      safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(action, { action, payload });
    }
  }
  const value = { sendMessage, currentWebsite };
  return <PluginContext.Provider value={value}>{props.children}</PluginContext.Provider>;
}
