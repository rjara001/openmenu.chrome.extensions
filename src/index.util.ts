import { INPUT_TEXTS, NAME_EXTENSION, URL_IFRAME, _OPENMENU_MENU_ID } from "./constants";
import { getCloseTemporary, getInputSelected, getMenu, getShadowRoot, setInputSelected } from "./globals/index";
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

    sendMessageToIframe('load', { items: getMenu().items, url: window.location.href, joined: joinedArray, activeAutoSaved: getMenu().settings.activeAutoSave });
}

function autoSave(e: any) {
    if (getMenu().settings.activeAutoSave)
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


function showMenu(e: any) {
    const __open_menu = getShadowRoot().getElementById('balloon');

    setInputSelected($(e.target));

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    if (getMenu().settings.activeMenu && !getCloseTemporary()) {
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
