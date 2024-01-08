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
// check if element has text
const elementHasText = element => element.textContent.trim().length > 0;
const getDomain = () => window.location.hostname.split("www.").join("");

const getClasses = classes =>
  classes
    .split(" ")
    .map(item => `body:not(.plugin-body) ${item}`)
    .join(", ");

// function to get list of elements
const getElements = () => document.querySelectorAll(getClasses("p pre span h1 h2 h3 h4 h5 h6 th td code a i input textarea button time cite"));
const getElementsForLineHeight = () => document.querySelectorAll(getClasses("p span li em a"));
const getTextElements = () => document.querySelectorAll(getClasses("p h1 h2 h3 h4 h5 h6 pre"));

// function to get element style value
const getElementStyle = (element, style) => window.getComputedStyle(element)[style];

// Large font
function handleLargeFont(payload) {
  if (payload.active || !payload.firstLoad) {
    getElements().forEach(element => {
      if (!element.getAttribute("data-isharat-font-size")) {
        const fontSize = getElementStyle(element, "fontSize");
        element.setAttribute("data-isharat-font-size", fontSize);
      }
      let oldValue = element.getAttribute("data-isharat-font-size").split("px").join("");
      if (elementHasText(element)) element.style.fontSize = `${oldValue * payload.currentValue}px`;
    });
  }
}

// Font Weight
function handleFontWeight(payload) {
  if (payload.active || !payload.firstLoad) {
    let weight = 100;
    if (payload.currentValue === 1) weight = 600;
    else if (payload.currentValue === 2) weight = 700;
    else if (payload.currentValue === 3) weight = 900;
    else weight = 100;
    getElements().forEach(element => {
      if (!element.getAttribute("data-isharat-font-weight")) {
        const fontWeight = getElementStyle(element, "fontWeight");
        element.setAttribute("data-isharat-font-weight", fontWeight);
      }
      let oldValue = element.getAttribute("data-isharat-font-weight");

      if (elementHasText(element)) element.style.fontWeight = payload.active ? `${weight}` : oldValue;
    });
  }
}

// Letter Spacing
function handleLetterSpacing(payload) {
  getElements().forEach(element => {
    if (!element.getAttribute("data-isharat-letter-spacing")) {
      const letterSpacing = getElementStyle(element, "letterSpacing");
      element.setAttribute("data-isharat-letter-spacing", letterSpacing);
    }
    if (elementHasText(element)) {
      let oldValue = element.getAttribute("data-isharat-letter-spacing").split("px").join("");
      let lastValue = "";
      if (oldValue === "normal" && payload.currentValue !== 0) lastValue = `${payload.currentValue}px`;
      else lastValue = oldValue;
      element.style.letterSpacing = `${lastValue}`;
    }
  });
}

// Line Height
function handleLineHeight(payload) {
  if (payload.active || !payload.firstLoad) {
    getElementsForLineHeight().forEach(element => {
      if (!element.getAttribute("data-isharat-line-height")) {
        const lineHeight = getElementStyle(element, "lineHeight");
        element.setAttribute("data-isharat-line-height", lineHeight);
      }
      let oldValue = element.getAttribute("data-isharat-line-height").split("px").join("");
      element.style.lineHeight = `${oldValue * payload.currentValue}px`;
    });
  }
}

// Highlight Links
function handleHighlightLinks(payload) {
  let active = payload.active;
  if (active || !payload.firstLoad) {
    document.querySelectorAll(getClasses("a")).forEach(element => {
      element.style.fontWeight = active ? `700` : "300";
      element.style.textDecoration = active ? `underline` : "none";
    });
  }
}

// Text Align
function handleTextAlign(payload) {
  let elements = getElements();
  elements = [...elements, ...document.querySelectorAll(getClasses("div"))];
  elements.forEach(element => {
    if (!element.getAttribute("data-isharat-text-align")) {
      const textAlign = getElementStyle(element, "textAlign");
      element.setAttribute("data-isharat-text-align", textAlign);
    }
    if (!element.getAttribute("data-isharat-justify-content")) {
      const justifyContent = getElementStyle(element, "justifyContent");
      element.setAttribute("data-isharat-justify-content", justifyContent);
    }
    let flexDirection = getElementStyle(element, "flexDirection");
    if (elementHasText(element)) {
      let oldTextAlign = element.getAttribute("data-isharat-text-align");
      let oldJustifyContent = element.getAttribute("data-isharat-justify-content");
      element.style.textAlign = payload.currentValue;
      if (flexDirection !== "column") element.style.justifyContent = payload.currentValue;
      if (payload.currentValue === "default") {
        element.style.textAlign = oldTextAlign;
        if (flexDirection !== "column") element.style.justifyContent = oldJustifyContent;
      }
    }
  });
}

// Hide Images
function handleHideImages(payload) {
  let active = payload.active;
  if (active || !payload.firstLoad) {
    document.querySelectorAll(getClasses("img:not(.isharat-translate-img) svg")).forEach(element => {
      if (!element.getAttribute("data-isharat-display")) {
        const display = getElementStyle(element, "display");
        element.setAttribute("data-isharat-display", display);
      }
      let oldValue = element.getAttribute("data-isharat-display");
      element.style.display = payload.active ? "none" : oldValue;
    });
    let elements = getElements();
    elements = [...elements, ...document.querySelectorAll(getClasses("div"))];

    elements.forEach(element => {
      if (!element.getAttribute("data-isharat-background-size")) {
        const backgroundSize = getElementStyle(element, "backgroundSize");
        element.setAttribute("data-isharat-background-size", backgroundSize);
      }
      let oldValue = element.getAttribute("data-isharat-background-size");
      element.style.backgroundSize = payload.active ? "0" : oldValue;
    });
  }
}

// Saturation & Contrast

// Saturation
function handleSaturation(payload) {
  if (payload.active || !payload.firstLoad) {
    [...getElements(), ...document.querySelectorAll(getClasses("img i svg"))].forEach(element => {
      element.style.filter = `saturate(${payload.currentValue})`;
    });
    document.querySelectorAll("div").forEach(element => {
      const backgroundImage = getElementStyle(element, "backgroundImage");
      if (backgroundImage.includes("url")) element.style.filter = `saturate(${payload.currentValue})`;
    });
  }
}

// Contrast
function handleContrast(payload) {
  let active = payload.active;
  if (active || !payload.firstLoad) {
    [...getElements(), ...document.querySelectorAll(getClasses("div section header footer aside nav"))].forEach(element => {
      if (!element.getAttribute("data-isharat-background-color")) {
        const backgroundColor = getElementStyle(element, "backgroundColor");
        element.setAttribute("data-isharat-background-color", backgroundColor);
      }
      if (!element.getAttribute("data-isharat-color")) {
        const color = getElementStyle(element, "color");
        element.setAttribute("data-isharat-color", color);
      }
      if (!element.getAttribute("data-isharat-opacity")) {
        const opacity = getElementStyle(element, "opacity");
        element.setAttribute("data-isharat-opacity", opacity);
      }
      let oldBg = element.getAttribute("data-isharat-background-color");
      let oldColor = element.getAttribute("data-isharat-color");
      let oldOpacity = element.getAttribute("data-isharat-opacity");

      if (oldBg !== "rgba(0, 0, 0, 0)") element.style.backgroundColor = active ? "#fff" : oldBg;
      element.style.color = active ? "#000" : oldColor;
      element.style.opacity = active ? 1 : oldOpacity;
    });
  }
}

// listen to message from popup
function onMessage(request, sendResponse, action, callback) {
  if (request.action === action) {
    callback(request.payload);
    sendResponse({ msg: "success" });

    // Chrome & Edge
    if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
      chrome.storage.local.set({ [request.action]: request.payload });
    }

    // Firefox
    if (currentBrowser === "Firefox") {
      browser.storage.local.set({ [request.action]: request.payload });
    }

    // Safari
    if (currentBrowser === "Safari") {
      safari.extension.settings.setItem(request.action, JSON.stringify(request.payload));
    }
  }
}

// get data from local storage & Apply on content
function getFromStorageAndEnable(key, callback) {
  // Chrome & Edge
  if ((currentBrowser === "Chrome" || currentBrowser === "Edge") && chrome.storage) {
    chrome.storage.local.get([key]).then(result => {
      callback(result[key]);
    });
  }
  // Firefox
  if (currentBrowser === "Firefox" && browser.storage) {
    browser.storage.local.get([key]).then(result => {
      callback(result[key]);
    });
  }
  // Safari
  if (currentBrowser === "Safari") {
    var storedDataString = safari.extension.settings.getItem(key);
    if (storedDataString) callback(JSON.parse(storedDataString)[key]);
  }
}

function enableTranslationIcon(payload) {
  let active = payload.active;
  document.querySelectorAll(".isharat-translate-btn").forEach(button => {
    button.style.display = active ? "inline" : "none";
  });
}

function listenToMsgsActions(request, sendResponse) {
  onMessage(request, sendResponse, "large_font", handleLargeFont);
  onMessage(request, sendResponse, "font_weight", handleFontWeight);
  onMessage(request, sendResponse, "text_spacing", handleLetterSpacing);
  onMessage(request, sendResponse, "line_height", handleLineHeight);
  onMessage(request, sendResponse, "highlight_links", handleHighlightLinks);
  onMessage(request, sendResponse, "text_align", handleTextAlign);
  onMessage(request, sendResponse, "saturation", handleSaturation);
  onMessage(request, sendResponse, "contrast", handleContrast);
  onMessage(request, sendResponse, "hide_images", handleHideImages);

  onMessage(request, sendResponse, "enable_translate_icon", enableTranslationIcon);

  if (request.action === "get-current-domain") sendResponse(getDomain());
}

setTimeout(() => {
  getFromStorageAndEnable("large_font", payload => handleLargeFont({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("font_weight", payload => handleFontWeight({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("text_spacing", payload => handleLetterSpacing({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("line_height", payload => handleLineHeight({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("highlight_links", payload => handleHighlightLinks({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("text_align", payload => handleTextAlign({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("saturation", payload => handleSaturation({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("contrast", payload => handleContrast({ ...payload, firstLoad: true }));
  getFromStorageAndEnable("hide_images", payload => handleHideImages({ ...payload, firstLoad: true }));

  getFromStorageAndEnable("enable_translate_icon", payload => enableTranslationIcon({ ...payload, firstLoad: true }));
}, 500);

// Chrome & Edge
if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
  if (chrome.runtime) {
    chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
      listenToMsgsActions(request, sendResponse);
    });
  }
}

// Firefox
if (currentBrowser === "Firefox") {
  if (browser.runtime) {
    browser.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
      listenToMsgsActions(request, sendResponse);
    });
  }
}

// Safari
if (currentBrowser === "Safari") {
  // Receiving a message in a content script
  safari.self.addEventListener("message", function (event) {
    listenToMsgsActions({ ...event, action: event.name });
  });
}

getTextElements().forEach(element => {
  if (element.innerText && element.innerText.length > 20) {
    let button = document.createElement("button");
    button.title = `ترجم الى لغة الاشارة (${element.innerText})`;
    button.classList.add("isharat-translate-btn");
    button.onclick = () => {
      window.open("https://google.com");
    };
    let img = document.createElement("img");
    img.classList.add("isharat-translate-img");
    img.src = "https://kcgwebservices.net/isharat/isharat/storage/app/public/hand_pointer/hand_point.png";
    button.appendChild(img);
    element.appendChild(button);
  }
});

document.querySelectorAll(".isharat-translate-btn").forEach(button => {
  button.style.cssText = `
    position: relative;
    border-radius: 30px;
    width: 25px;
    height: 25px;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
    background-color: transparent;
    display:none;
  `;
});
document.querySelectorAll(".isharat-translate-btn img").forEach(img => {
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
});
