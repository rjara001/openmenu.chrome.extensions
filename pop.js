var divMenuActive = document.getElementById("menu-active");
var divAutoButton = document.getElementById("auto-save");

divAutoButton.addEventListener("change", function () {

    autoSave = this.checked;
    chrome.storage.sync.set({ autoSave });

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(tabs[0].id,
            { "autoSave": divAutoButton.checked }, function (response) {

            });

    });
});

divMenuActive.addEventListener("change", function () {

    menuActive = this.checked;
    chrome.storage.sync.set({ menuActive });

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(tabs[0].id,
            { "menuActive": divMenuActive.checked }, function (response) {

            });
    });
});

if (chrome.storage) {
    chrome.storage.sync.get("menuActive", function (data) {
        // If toggle value is present in storage, use it
        // Otherwise, use the default value 
        menuActive = data.menuActive !== undefined ? data.menuActive : true;

        // Update the toggle element based on the value
        document.getElementById("menu-active").checked = menuActive;
    });
}
if (chrome.storage) {
    chrome.storage.sync.get("autoSave", function (data) {
        // If toggle value is present in storage, use it
        // Otherwise, use the default value 
        autoSave = data.autoSave !== undefined ? data.autoSave : true;

        // Update the toggle element based on the value
        document.getElementById("auto-save").checked = autoSave;
    });
}