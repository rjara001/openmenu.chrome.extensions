import { _MENU_DEFAULT } from "./constants";
import { getMenu, getVariablesLoaded, setMenu, setVariablesLoaded } from "./globals/index";
import { doClose } from "./index.util";
import { load } from "./util";

function waitForMENUisLoaded(callback: ()=>void) {
    if (getVariablesLoaded() === true) {
        // Variable is already loaded
        callback();
    } else {
        // Variable is not yet loaded, wait and check again
        setTimeout(function () {
            waitForMENUisLoaded(callback);
        }, 100); // Adjust the interval as needed (e.g., 100 milliseconds)
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "autoSave") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     setActiveAutoSave(message.autoSave);
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "menuActive") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     setActiveExtension(message.menuActive);
// });

chrome.storage.local.get('menu', function (result) {
    setMenu(result.menu);
   
    $(document).ready(function () {
        load();
     });

});

document.addEventListener('click', function (e) {
    doClose(e);
});

