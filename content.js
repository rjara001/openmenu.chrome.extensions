



let _MENU_HTML = [
    // { title: 'Add...', page: 'Add' }
];
chrome.storage.sync.get("toggleValue", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    activeExtension = data.toggleValue !== undefined ? data.toggleValue : true;

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "toggleValue") {
      chrome.runtime.sendMessage(request, function(response) {
        sendResponse(response);
      });
      return true; // Keep the message channel open for the response
    }
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    activeExtension = message.toggleValue;
    // if (message.state) {
    //     // Perform action when checkbox is checked
    //     console.log("Checkbox is checked");
    //     activeExtension = true;


    // } else {
    //     // Perform action when checkbox is unchecked
    //     console.log("Checkbox is unchecked");
    //     activeExtension = false;
    // }
});

chrome.storage.local.get('menu', function (result) {
    if (result.menu) {
        ///const list = JSON.parse(result.menu);
        _MENU_HTML = [..._MENU_HTML, ...result.menu]
    }

});

document.addEventListener('click', function (e) {

    doCloseOrAttachEvent();
});

window.addEventListener('load', function (e) {

    addMenu();
});

