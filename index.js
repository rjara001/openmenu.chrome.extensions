
$(document).ready(function () {

    var container = document.createElement("div");

    container.setAttribute("id", _BOX_ID);

    document.body.appendChild(container);

    shadowRoot = container.attachShadow({ mode: 'open' });

    // Create a new HTML element
    balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.id = "balloon";
    balloon.innerHTML = _HTML_BOX;

    // Append the created element to the document body
    shadowRoot.appendChild(balloon);
    const linkElem = document.createElement('style');

    linkElem.innerHTML = _STYLE_AS_STRING;

    shadowRoot.appendChild(linkElem);

    // // Example close button functionality
    var closeButton = balloon.querySelector(".close-btn");
 
    var header = balloon.querySelector(".balloon-header");
   
    header.addEventListener('mousedown', startDragging);

    closeButton.addEventListener("click", function () {
        hideBalloon();
    });

    window.addEventListener('message', function (event) {
        // Log the message received from the iframe
        console.log('Message received from iframe:', event.data);

        if (event.data.go)
            go(event.data.go.text, event.data.go.action);

        if (event.data.bar)
            barMessage(event.data.bar);
        if (event.data.maxHeight) {
            resizeIframe(event.data.maxHeight);
        }
        if (event.data.url) {
            barMessage(`Moving to the selected URL: ${addEllipsis(event.data.url, 40)}`);

            if (event.data.action === 'createNewTab')
                chrome.runtime.sendMessage({ action: "createNewTab", url: event.data.url });
            else
                window.location.href = event.data.url;
        }
    });

    hideBalloon();
});
