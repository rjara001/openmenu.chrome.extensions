

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "pop_v1.html" });
});