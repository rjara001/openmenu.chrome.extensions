import { setActiveAutoSave, setActiveExtension, setMenu, setVariablesLoaded } from "./globals/index.js";
import { doClose } from "./js/index.util.js";
import { load } from "./js/util.js";

const _variables_loaded: boolean = false;

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

chrome.storage.sync.get("autoSave", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    setActiveAutoSave(data.autoSave !== undefined ? data.autoSave : true);

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
    setActiveAutoSave(message.autoSave);
});

chrome.storage.sync.get("menuActive", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    setActiveExtension(data.menuActive !== undefined ? data.menuActive : true);

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
    setActiveExtension(message.menuActive);
});

chrome.storage.local.get('menu', function (result) {
    if (result.menu) {
        if (Array.isArray(result.menu)) // old fashion
            setMenu({ items: [...result.menu], settings: {pages:[]} });
        else
            setMenu(result.menu);
        ///const list = JSON.parse(result.menu);
        // _MENU = [..._MENU, items: ...result.menu];

        setVariablesLoaded(true);
    }
});

document.addEventListener('click', function (e) {

    doClose(e);

});

window.addEventListener('load', function (e) {
    waitForMENUisLoaded(load);
    //loadEventosOnInputs();
});