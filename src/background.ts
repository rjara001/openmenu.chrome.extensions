
if (chrome.action && chrome.action.onClicked) {
  chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "../pop_v1.html" });
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openSettings") {
    chrome.tabs.create({ url: request.popUrl || "../pop_v1.html" });
  }
});

