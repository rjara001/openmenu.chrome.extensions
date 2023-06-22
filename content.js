

function waitForMENUisLoaded(callback) {
    if (_MENU_HTML) {
        // Variable is already loaded
        callback();
    } else {
        // Variable is not yet loaded, wait and check again
        setTimeout(function () {
            waitForVariable(callback);
        }, 100); // Adjust the interval as needed (e.g., 100 milliseconds)
    }
}

let _MENU_HTML = [
    // { title: 'Add...', page: 'Add' }
];

chrome.storage.sync.get("toggleValue", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    activeExtension = data.toggleValue !== undefined ? data.toggleValue : true;

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "toggleValue") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    activeExtension = message.toggleValue;

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
    waitForMENUisLoaded(addMenu);
});

