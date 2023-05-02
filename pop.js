var toggleButton = document.getElementById("toggle");


toggleButton.addEventListener("change", function () {

    toggleValue = this.checked;
    chrome.storage.sync.set({ toggleValue: toggleValue });

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(tabs[0].id,
            { "toggleValue": toggleButton.checked }, function (response) {
                   
                });
            // ...also specifying a callback to be called 
            //    from the receiving end (content script).
             } );

    // chrome.runtime.sendMessage({ message: { "toggleValue": toggleButton.checked } }, function (response) {
    //     chrome.storage.sync.set({ toggleValue: toggleButton.checked });
    //     console.log("Received response:", toggleButton.checked);
    // });
});

chrome.storage.sync.get("toggleValue", function (data) {
    // If toggle value is present in storage, use it
    // Otherwise, use the default value 
    toggleValue = data.toggleValue !== undefined ? data.toggleValue : true;

    // Update the toggle element based on the value
    document.getElementById("toggle").checked = toggleValue;
});