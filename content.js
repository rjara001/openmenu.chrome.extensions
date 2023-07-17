

function waitForMENUisLoaded(callback) {
    if (_variables_loaded === true) {
        // Variable is already loaded
        callback();
    } else {
        // Variable is not yet loaded, wait and check again
        setTimeout(function () {
            waitForMENUisLoaded(callback);
        }, 100); // Adjust the interval as needed (e.g., 100 milliseconds)
    }
}
_variables_loaded = false;

var _CURRENT_URL = '';

chrome.storage.sync.get("autoSave", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    activeAutoSave = data.autoSave !== undefined ? data.autoSave : true;

});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "autoSave") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    activeAutoSave = message.autoSave;
});

chrome.storage.sync.get("menuActive", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    activeExtension = data.menuActive !== undefined ? data.menuActive : true;

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "menuActive") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    activeExtension = message.menuActive;

});

chrome.storage.local.get('menu', function (result) {
    if (result.menu) {
        if (Array.isArray(result.menu)) // old fashion
            _MENU.items = result.menu;
            else
            _MENU = result.menu;
        ///const list = JSON.parse(result.menu);
        // _MENU = [..._MENU, items: ...result.menu];

        _variables_loaded = true;
    }
});

document.addEventListener('click', function (e) {

   doClose();

});

window.addEventListener('load', function (e) {
    waitForMENUisLoaded(load);
    //loadEventosOnInputs();
});