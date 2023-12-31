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

// function to get list of elements
const getElements = () => document.querySelectorAll("p, pre, span, h1, h2, h3, h4, h5, h6, th, td, code, a, input, textarea, button");

// function to get element style value
const getElementStyle = (element, style) => window.getComputedStyle(element)[style];

// Large font
function handleLargeFont(payload) {
  if (payload.active || !payload.firstLoad) {
    getElements().forEach(element => {
      if (!element.getAttribute("data-font-size")) {
        const fontSize = getElementStyle(element, "fontSize");
        element.setAttribute("data-font-size", fontSize);
      }
      let oldValue = element.getAttribute("data-font-size").split("px").join("");
      if (elementHasText(element)) element.style.fontSize = `${oldValue * payload.currentValue}px`;
    });
  }
}

// Letter Spacing
function handleLetterSpacing(payload) {
  getElements().forEach(element => {
    if (!element.getAttribute("data-letter-spacing")) {
      const letterSpacing = getElementStyle(element, "letterSpacing");
      element.setAttribute("data-letter-spacing", letterSpacing);
    }
    if (elementHasText(element)) {
      let oldValue = element.getAttribute("data-letter-spacing").split("px").join("");
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
    document.querySelectorAll("p, span, li, em, a").forEach(element => {
      if (!element.getAttribute("data-line-height")) {
        const lineHeight = getElementStyle(element, "lineHeight");
        element.setAttribute("data-line-height", lineHeight);
      }
      let oldValue = element.getAttribute("data-line-height").split("px").join("");
      element.style.lineHeight = `${oldValue * payload.currentValue}px`;
    });
  }
}

// Highlight Links
function handleHighlightLinks(payload) {
  let active = payload.active;
  if (active || !payload.firstLoad) {
    document.querySelectorAll("a").forEach(element => {
      element.style.fontWeight = active ? `700` : "300";
      element.style.textDecoration = active ? `underline` : "none";
    });
  }
}

// Text Align
function handleTextAlign(payload) {
  let elements = getElements();
  elements = [...elements, ...document.querySelectorAll("div")];
  elements.forEach(element => {
    if (!element.getAttribute("data-text-align")) {
      const textAlign = getElementStyle(element, "textAlign");
      element.setAttribute("data-text-align", textAlign);
    }

    if (elementHasText(element)) {
      let oldValue = element.getAttribute("data-text-align").split("px").join("");
      element.style.textAlign = payload.currentValue;
      if (payload.currentValue === "default") element.style.textAlign = oldValue;
    }
  });
}

// Hide Images
function handleHideImages(payload) {
  document.querySelectorAll("img, svg").forEach(element => (element.style.display = payload.active ? "none" : "unset"));
  let elements = getElements();
  elements = [...elements, ...document.querySelectorAll("div")];
  elements.forEach(element => (element.style.backgroundSize = payload.active ? "0" : "unset"));
}

// Saturation & Contrast
let saturate = 1;
let contrast = 100;

// Saturation
function handleSaturation(payload) {
  document.body.style.filter = `saturate(${payload.currentValue}) contrast(${contrast}%)`;
  saturate = payload.currentValue;
}

// Contrast
function handleContrast(payload) {
  document.body.style.filter = `contrast(${payload.currentValue}%) saturate(${saturate})`;
  contrast = payload.currentValue;
}

function onMessage(request, action, callback) {
  if (request.action === action) callback(request.payload);
}

function listenToContentControlMsgs(request) {
  onMessage(request, "large_font", handleLargeFont);
  onMessage(request, "text_spacing", handleLetterSpacing);
  onMessage(request, "line_height", handleLineHeight);
  onMessage(request, "highlight_links", handleHighlightLinks);
  onMessage(request, "text_align", handleTextAlign);
  onMessage(request, "saturation", handleSaturation);
  onMessage(request, "contrast", handleContrast);
  onMessage(request, "hide_images", handleHideImages);
}

// Chrome
if (currentBrowser === "Chrome" || currentBrowser === "Edge") {
  if (chrome.runtime) {
    chrome.runtime.onMessage.addListener(function (request) {
      listenToContentControlMsgs(request);
    });
  }
}

// Firefox
if (currentBrowser === "Firefox") {
  if (browser.runtime) {
    browser.runtime.onMessage.addListener(function (request) {
      listenToContentControlMsgs(request);
    });
  }
}
