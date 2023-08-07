import { _MENU_DEFAULT } from "./constants";
import { getMenu, getVariablesLoaded, setMenu, setVariablesLoaded } from "./globals/index";
import { doClose } from "./index.util";
import { load } from "./util";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "autoSave") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "menuActive") {
        chrome.runtime.sendMessage(request, function (response) {
            sendResponse(response);
        });
        return true; // Keep the message channel open for the response
    }
});


chrome.storage.local.get('menu', function (result) {
    setMenu(result.menu);
   
    $(document).ready(function () {
        load();
     });

});

document.addEventListener('click', function (e) {
    doClose(e);
});

