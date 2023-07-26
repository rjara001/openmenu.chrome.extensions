import { INPUT_TEXTS, NAME_EXTENSION, URL_IFRAME, _OPENMENU_MENU_ID } from "./constants";
import { getActiveAutoSave, getActiveExtension, getInputSelected, getMenu, getShadowRoot, setInputSelected } from "./globals/index";
import { startDragging } from "./move";
import { actionAdd, ClearAction, FullfillAction, ReadAllAction, getInputSaved, typeIntoElement } from "./util";

let shadowRoot: any = undefined;

export function doClose(event: any) {
    if (isMenuOpened() && clickOutOfBox(event.target))
        closeMenu();
}

export function loadEventosOnInputs() {
    const inputTexts = $(INPUT_TEXTS).toArray();

    if (inputTexts.length > 0)
        attachEventsOnAllInputs(inputTexts);
    else
        setTimeout(() => {
            // Sometimes the inputs values arent loaded on time
            const inputTexts = $(INPUT_TEXTS).toArray();

            attachEventsOnAllInputs(inputTexts);

        }, 2000);
}

function attachEventsOnAllInputs(inputTexts: HTMLElement[]) {
    inputTexts.forEach(_ => {
        _.addEventListener('click', (e) => showMenu(e));
        _.addEventListener('blur', (e) => autoSave(e));
    });

    var joinedArray = getInputSaved().map(_ => (_.xpath));

    sendMessageToIframe('load', { items: getMenu().items, url: window.location.href, joined: joinedArray, activeAutoSaved: getActiveAutoSave() });
}

function autoSave(e: any) {
    if (getActiveAutoSave())
        actionAdd($(e.target), 'AutoSave');
}

function closeMenu() {
    if (!shadowRoot) return;

    const __open_menu = getShadowRoot().getElementById('balloon');

    if (__open_menu)
        __open_menu.style.display = 'none';
}

function isMenuOpened() {
    if (!shadowRoot) return;

    const __open_menu = getShadowRoot().getElementById('balloon');
    if (__open_menu)
        return __open_menu.style.display === 'block';
}

function clickOutOfBox(obj: any) {

    if (obj == null)
        return true;

    if (obj.shadowRoot !== undefined && obj.shadowRoot !== null)
        return false;

    if (obj.nodeName === 'INPUT' && obj.type === 'password')
        return true;

    if (obj.nodeName === 'INPUT' || obj.nodeName === 'TEXTAREA')
        return false;

    if (obj.id != _OPENMENU_MENU_ID)// && obj.id != _divVeryMatch_IMAGEN)
        return clickOutOfBox(obj.parentNode);

    return false;
}

// function addEllipsis(text:string, maxLength:number) {
//     if (text.length > maxLength) {
//         return text.slice(0, maxLength) + '...';
//     } else {
//         return text;
//     }
// }

export function go(item: any, option: string) {
    // const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);
    item = (item || '').trim();
    const isAdd = option === 'add'
    const isFulfill = option === 'fulfill'
    const isReadAll = option === 'readall'
    const clearAll = option === 'clear'

    if (getInputSelected() !== undefined) {
        switch (true) {
            case clearAll:
                ClearAction();
                break;
            case isFulfill:
                FullfillAction();
                break;
            case isReadAll:
                ReadAllAction();
                break;
            case isAdd:
                actionAdd(getInputSelected(), '');
                break;
            default:
                {
                    let inputTextSelected = getInputSelected()[0];

                    typeIntoElement(inputTextSelected, item);
                }
        }
    }
}

// function setValueOnInput(inputSelected:any, item:string) {
//     // Create a new 'keydown' event
//     let element = inputSelected[0];

//     let lastValue = element.value;
//     element.value = item;
//     let event = new CustomEvent("input", {
//         bubbles: true,
//         detail: { additionalData: "" }, // You can add any additional data here
//       });

//     // React 15
//     // event.simulated = true;
//     // React 16
//     let tracker = element._valueTracker;
//     if (tracker) {
//         tracker.setValue(lastValue);
//     }
//     element.dispatchEvent(event);
// }

function showMenu(e: any) {
    const __open_menu = getShadowRoot().getElementById('balloon');

    setInputSelected($(e.target));

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    if (getActiveExtension()) {
        __open_menu.style.display = 'block';
        sendMessageToIframe('showmenu', {});
    }

}

export function sendMessageToIframe(action: string, payload: any) {
    var iframe = getShadowRoot().getElementById('imenu');
    const domain = URL_IFRAME.split('/')[0] + '//' + URL_IFRAME.split('/')[2];

    // if (!isMenuOpened())
    iframe.contentWindow.postMessage({ action, payload }, domain);
}

// function createHeader() {
//     var header = document.createElement("div");
//     var _text = document.createElement("div");
//     _text.innerText = NAME_EXTENSION;

//     header.setAttribute("class", "header");
//     header.appendChild(_text);
//     header.appendChild(createCloseBtn());

//     header.addEventListener('mousedown', startDragging);

//     return header;
// }

// function createCloseBtn() {
//     var closeBtn = document.createElement("button"); //  <button id="closeBtn">&times;</button>
//     closeBtn.id = 'closeBtn';
//     closeBtn.className = 'closeBtn'
//     closeBtn.innerText = 'X';
//     closeBtn.addEventListener('click', function () {
//         //   const __open_menu = document.getElementById(_OPENMENU_MENU_ID);
//         closeMenu();
//     });

//     return closeBtn;
// }

// function toText(item:any) {
//     let textElipsed = addEllipsis(item.text, 25);
//     let nameElipsed = addEllipsis(item.name !== undefined ? item.name : '', 15);

//     if (nameElipsed.length > 0)
//         return `${textElipsed} (${nameElipsed})`;
//     return textElipsed;
// }
