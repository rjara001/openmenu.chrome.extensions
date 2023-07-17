


const removeHTMLElements = (htmlString) => {

    // Create a temporary container element
    var tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Remove the desired element
    var elementToRemove = tempContainer.querySelector('p'); // Select the element to remove
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }

    // Get the modified HTML string
    var modifiedHtmlString = tempContainer.innerText;

    return modifiedHtmlString;
}

const getCurrentURL = () => {
    var url = window.location.href;
    var index = url.indexOf('?');

    if (index !== -1) {
        var part = url.substring(0, index);
        return part;
    }

    return url;

}
const showOptions = () => {

}

function createFulfillOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoFill';

    var joinedArray = getInputSaved();
    if (joinedArray.length > 0) {
        link.textContent += '(' + joinedArray.length + ')';
        link.classList.add('fulfill');
    }
    else {
        link.classList.add('disabled');
        link.title = 'Fulfill will be activated when you have data saved for these input texts'
    }
    link.addEventListener('click', function () {
        go(link.innerText, 'fulfill');
    });

    return link;
}

function createReadAllOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoAdd';

    link.addEventListener('click', function () {
        go(link.innerText, 'readall');
    });

    return link;
}

function findLastOccurrence(arr, key, value) {
    return arr.reduceRight((acc, obj) => {
        if ((obj[key] === value) && !acc) {
            return obj;
        }
        return acc;
    }, null);
}

function innerJoin2(inputs, values, key1, key2) {
    var result = [];
    var currentUrl = window.location.href;

    for (var i = 0; i < inputs.length; i++) {
        var obj1 = inputs[i];
        var obj2 = findLastOccurrence(values, key1, obj1[key1], key2, obj1[key2]);

        if (obj2) {
            var mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}

function innerJoin(inputs, values, key) {
    var result = [];
    var currentUrl = window.location.href;

    for (var i = 0; i < inputs.length; i++) {
        var obj1 = inputs[i];
        var obj2 = findLastOccurrence(values, key, obj1[key]);

        if (obj2) {
            var mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}

function chkval(value) {
    if (value === undefined)
        return '';
    return value;
}
function getPosition(input) {
    let inputOffset = $(input).offset();
    return `t:${chkval(inputOffset.top)};l:${chkval(inputOffset.left)};b:${chkval(inputOffset.bottom)};r:${chkval(inputOffset.right)}`;
}

function AddAction(input, category) {
    const value = input.val();
    const position = getPosition(input);
    const xpath = getFullXPath(input);

    sendMessageToIframe('add', { value, position, xpath, category });

    // if (!_MENU || !_MENU.items)
    //     return;

    // const lenMenu = _MENU.items.length;
    // if (lenMenu < LIMIT_LEN) {
    //     _addAction(input, category);
    // }
    // else if (category === 'autosave') {
    //     removeLastItemByCategory(_MENU.items, 'autosave');
    //     _addAction(input, category);
    // }

}

function getHost(url) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}

function hostExist() {
    const currentHost = window.location.host;

    return _MENU.items.filter(_ => getHost(_.page) === currentHost).length > 0;
}
function FullfillAction() {
    const currentHost = window.location.host;

    const inputTexts = $(INPUT_TEXTS).toArray();

    const inputSaved = _MENU.items.filter(_ => getHost(_.page) === currentHost);

    var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), xpath: getFullXPath(element) })), _MENU.items, 'xpath');

    // var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), position: getPosition(element), xpath:getFullXPath(element) })), _MENU, 'position', 'xpath');

    joinedArray.forEach(_ => {
        $(_).val(_.text);
    });
}

function getInputSaved() {
    if (hostExist(_MENU.items)) {
        {
            const inputTexts = $(INPUT_TEXTS).toArray();

            return innerJoin($(inputTexts).map((index, element) => ({ ...$(element), xpath: getFullXPath(element) })), _MENU.items, 'xpath');
        }
    }

    return [];
}

function ClearAction() {

    var joinedArray = getInputSaved();

    joinedArray.forEach(_ => {
        $(_).val('');
    })

}

function ReadAllAction() {
    const inputTexts = $(INPUT_TEXTS).toArray();

    inputTexts.forEach(_ => {
        AddAction($(_));
    });
}

function CreateSVG() {
    // Create the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('id', 'my-svg');
    // svg.classList.add('svg')
    const $svg = $(svg);

    $svg.html(PLUS_SVG);

    return $svg.get(0);

}

function typeIntoElement(element, text) {
    // Set focus on the element
    element.focus();

    // Iterate over each character in the text
    for (let i = 0; i < text.length; i++) {
        // Create a new KeyboardEvent for each character
        const keyEvent = new KeyboardEvent('keydown', {
            key: text[i],
            bubbles: true,
            cancelable: true,
        });

        // Dispatch the keyboard event
        element.dispatchEvent(keyEvent);

        // Update the value of the element with the current character
        element.value += text[i];

        // Create and dispatch an input event
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        element.dispatchEvent(inputEvent);

        // Create and dispatch a keyup event
        const keyupEvent = new KeyboardEvent('keyup', {
            key: text[i],
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(keyupEvent);
    }
}

function getFullXPath(element) {
    var xpath = '';
    var $element = $(element);

    while ($element.length) {
        var tagName = $element.prop('tagName')?.toLowerCase() || '';
        var parent = $element.parent();
        var siblings = parent.children(tagName);

        if (siblings.length > 1) {
            var index = siblings.index($element) + 1;
            xpath = '/' + tagName + '[' + index + ']' + xpath;
        } else {
            xpath = '/' + tagName + xpath;
        }

        $element = parent;
    }

    return xpath;
}

const load = () => {

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

    var iframe = shadowRoot.getElementById('imenu');

    iframe.addEventListener('load', ()=>{
        loadEventosOnInputs();
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

}