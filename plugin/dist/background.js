window.chrome.runtime.onStartup.addListener( () => {
    console.log(`onStartup()`);
});

let contextMenuItem = {
  id: "workTime",
  title: "WorkTime",
  contexts: ["selection"],
};
window.chrome.contextMenus.create(contextMenuItem);
console.log(window.chrome.contextMenus);

window.chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    window.chrome.tabs.executeScript(tabs[0].id, {
      code: `
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
          const currentSize = window.getComputedStyle(paragraph).fontSize;
          const newSize = parseInt(currentSize) + 2 + 'px';
          paragraph.style.fontSize = newSize;
        });
      `
    });
  });
