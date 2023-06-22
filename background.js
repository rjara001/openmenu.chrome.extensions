

// chrome.storage.sync.get("toggleValue", function(data) {
//     // If toggle value is present in storage, use it
//     // Otherwise, use the default value
//     toggleValue = data.toggleValue !== undefined ? data.toggleValue : true;
    
//     // Update the toggle element based on the value
//     activeExtension = toggleValue;
//   });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("Received message:", request);

//     activeExtension = request.toggleValue;

//     // if (request.message==='toggleValue') {
//     //     // Perform action when checkbox is checked
//     //     console.log("Checkbox is checked");
//     //     activeExtension = message.toggle;


//     // } else {
//     //     // Perform action when checkbox is unchecked
//     //     console.log("Checkbox is unchecked");
//     //     activeExtension = message.toggle;
//     // }
//   });