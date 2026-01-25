import { INPUT_TEXTS, LIMIT_LEN, LIMIT_LEN_TEXT, PLUS_SVG, SRC_IMG_MINIMIZE, SRC_IMG_MAXIMIZE, _BOX_ID, _HTML_BOX, _HTML_IMG, _OPENMENU_MENU_ID, _STYLE_AS_STRING } from "./constants";
import { getCloseTemporary, getInputSelected, getMenu, getShadowRoot, setCloseTemporary, setMenu, setShadowRoot } from "./globals/index";
// import { removeLastItemByCategory } from "../html/util.html";
import { localSaveValue, localUpdateValue } from "../src/store";
import { addEllipsis, barMessage, hideBalloon, resizeIframe } from "./box.util";
import { go, loadEventosOnInputs, sendMessageToIframe } from "./index.util";
import { startDragging } from "./move";
import { PageRestricted } from "./types/PageRestricted";

export function removeLastItemByCategory(arr: any[], category: string) {
    var index = arr.findIndex(function (item) {
        return item.category === category;
    });

    if (index !== -1) {
        arr.splice(index, 1);
    }

    return arr;
}

const removeHTMLElements = (htmlString: string) => {

    // Create a temporary container element
    var tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Remove the desired element
    var elementToRemove = tempContainer.querySelector('p'); // Select the element to remove
    if (elementToRemove) {
        elementToRemove.parentNode?.removeChild(elementToRemove);
    }

    // Get the modified HTML string
    var modifiedHtmlString = tempContainer.innerText;

    return modifiedHtmlString;
}

export const getCurrentURL = () => {
    var url = window.location.href;
    var index = url.indexOf('?');

    if (index !== -1) {
        var part = url.substring(0, index);
        return part;
    }

    return url;

}

function findLastOccurrence(arr: any[], key: string, value: string) {
    return arr.reduceRight((acc, obj) => {
        if (obj && obj.hasOwnProperty(key))
            if ((obj[key] === value) && !acc) {
                return obj;
            }
        return acc;
    }, null);
}


function innerJoin(inputs: any[], itemsMenu: any[], key: string) {
    var result: any[] = [];

    for (var i = 0; i < inputs.length; i++) {
        var inputElement = inputs[i];

        var obj2 = findLastOccurrence(itemsMenu, key, inputElement[key]);

        if (obj2) {
            var mergedObj = { ...inputElement, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}

function chkval(value: string | undefined) {
    if (value === undefined)
        return '';
    return value;
}

function _actionAdd(input: any, category: string) {

    const newitem = extractDataFromInput(category, input);

    if (newitem.text && newitem.text.length > 0 && newitem.text.length < LIMIT_LEN_TEXT) {
        let _item = getMenu().items.find(_ => _.text === newitem.text);

        if (_item)
            localUpdateValue(newitem);
        else {
            localSaveValue(newitem);
            sendMessageToIframe('add', extractDataFromInput(category, input));
        }
    }
}

function extractDataFromInput(category: string, input: JQuery) {

    return {
        category,
        text: removeHTMLElements((input.val() || '').toString().trim()),
        page: getCurrentURL(),
        date: (new Date()).toISOString(),
        type: input.prop("type"),
        name: input.prop("name"),
        xpath: getFullXPath(input)
    };
}

export function actionAdd(input: JQuery, category: string) {

    const lenMenu = getMenu().items.length;
    if (lenMenu < LIMIT_LEN) {
        _actionAdd(input, category);
    }
    else if (category.toLowerCase() === 'autosave') {
        removeLastItemByCategory(getMenu().items, 'autosave');
        _actionAdd(input, category);
    }

}

export function getHost(url: string) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}

function hostExist() {
    const currentHost = window.location.host;

    return getMenu().items.filter(_ => getHost(_?.page) === currentHost).length > 0;
}
export function FullfillAction() {
    const currentHost = window.location.host;

    const inputTexts = $(INPUT_TEXTS).toArray();

    const inputSaved = getMenu().items.filter(_ => getHost(_.page) === currentHost);
    var inputs: any[] = [];
    inputTexts.forEach(element => {
        inputs.push({ element, xpath: getFullXPath(element) });
    });

    var joinedArray = innerJoin(inputs, getMenu().items, 'xpath');

    joinedArray.forEach(_ => {
        typeIntoElement(_.element, _.text);
    });
}

export const getUniqueCategories = (htmlMenu: any[]) => {
    try {
        return htmlMenu.reduce(function (acc, item) {
            if (!acc.includes(item.category)) {
                acc.push(item.category);
            }
            return acc;
        }, []);

    } catch (error) {
        console.log('error');
    }
}

export function getInputSaved() {
    if (hostExist()) {
        {
            const inputTexts = $(INPUT_TEXTS).toArray();

            var inputs: any[] = [];
            inputTexts.forEach(element => {
                inputs.push({ element, xpath: getFullXPath(element) });
            });
            var joinedArray = innerJoin(inputs, getMenu().items, 'xpath');

            return joinedArray;
        }
    }

    return [];
}

export function ClearAction() {

    var joinedArray = getInputSaved();

    joinedArray.forEach(_ => {
        $(_.element).val('');
    })

}

export function ReadAllAction() {
    const inputTexts = $(INPUT_TEXTS).toArray();

    inputTexts.forEach(_ => {
        actionAdd($(_), '');
    });
}

export function typeIntoElement(element: any, text: string) {
    // Set focus on the element
    element.focus();

    // Create and dispatch a delete event to clear existing text
    element.value = '';
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

function getFullXPath(element: any) {
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

const hideIconRecording = () => {
    const divRecorderImg = getShadowRoot().querySelector('.div-img-menu') as HTMLElement;
    $(divRecorderImg).css('display', 'none');

    const arrowImg = $(getShadowRoot().querySelector('#img-arrow'));
    arrowImg.attr('src', SRC_IMG_MINIMIZE);
}

const showIconRecording = () => {

    const divRecorderImg = getShadowRoot().querySelector('.div-img-menu') as HTMLElement;
    $(divRecorderImg).css('display', 'block');

    const arrowImg = $(getShadowRoot().querySelector('#img-arrow'));

    arrowImg.attr('src', SRC_IMG_MAXIMIZE);

    $(divRecorderImg).on('click', function () {

        const box = $(getShadowRoot().getElementById('balloon')) as JQuery;

        box.css('display', 'block');
        box.css('left', '10px');
        box.css('top', '10px');

        sendMessageToIframe('resize', {});
    });
}


export const load = () => {

    var container = document.createElement("div");

    container.setAttribute("id", _BOX_ID);

    document.body.appendChild(container);

    setShadowRoot(container.attachShadow({ mode: 'open' }));

    let divImg = document.createElement("div");
    divImg.id = "img";
    divImg.classList.add("div-img-menu");
    divImg.innerHTML = _HTML_IMG;

    getShadowRoot().appendChild(divImg);

    // Create a new HTML element
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.id = "balloon";
    balloon.innerHTML = _HTML_BOX;

    // Append the created element to the document body
    getShadowRoot().appendChild(balloon);
    const linkElem = document.createElement('style');

    linkElem.innerHTML = _STYLE_AS_STRING;

    getShadowRoot().appendChild(linkElem);

    // // Example close button functionality
    var closeButton = balloon.querySelector(".close-btn");
    var minimizeButton = balloon.querySelector(".minimize-btn");

    var header = balloon.querySelector(".balloon-header");

    header?.addEventListener('mousedown', startDragging);

    minimizeButton?.addEventListener('click', () => {
        setMinimizeIcons();
    });

    closeButton?.addEventListener("click", function () {
        hideBalloon();
    });

    const settingsBtn = balloon.querySelector(".settings");
    settingsBtn?.addEventListener('click', (e) => {
        chrome.runtime.sendMessage({
            action: "openSettings",
            popUrl: `../pop_v1.html?from=${encodeURIComponent(location.href)}`
        });
    });

    // const disabledPageBtn = balloon.querySelector(".left-section");
    // disabledPageBtn?.addEventListener('click', (e) => {
    //     const currentUrl = getCurrentURL();

    //     chrome.runtime.sendMessage({
    //     action: "openSettings",
    //     currentUrl
    //     });

    // });

    loadALLInputs();

    window.addEventListener('message', function (event) {
        // Log the message received from the iframe
        // console.log('Message received from iframe:', event.data);
        if (event.data.action && event.data.action === 'add') {
            actionAdd(getInputSelected(), '');
        }
        if (event.data.action === 'addPage') {
            let host = getHost(getCurrentURL()) as string;

            getMenu().settings.pages.push(new PageRestricted(host));

            setMenu(getMenu());

            localSaveValue(getMenu());
        }

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

function setMinimizeIcons() {
    if (getCloseTemporary() === false) {
        hideBalloon();
        showIconRecording();
        setCloseTemporary(true);
    }
    else {
        hideBalloon();
        hideIconRecording();
        setCloseTemporary(false);
    }
}

function loadALLInputs() {
    var iframe = getShadowRoot().getElementById('imenu');

    iframe.addEventListener('load', () => {
        loadEventosOnInputs();
    });
}
