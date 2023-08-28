import { INPUT_TEXTS, NAME_EXTENSION, URL_IFRAME, _OPENMENU_MENU_ID } from "./constants";
import { getCloseTemporary, getInputSelected, getMenu, getShadowRoot, setInputSelected } from "./globals/index";
import { startDragging } from "./move";
import { actionAdd, ClearAction, FullfillAction, ReadAllAction, getInputSaved, typeIntoElement, getCurrentURL, getHost } from "./util";

export function doClose(event: any) {
    if (isMenuOpened() && clickOutOfBox(event.target))
        closeMenu();
}

function enableToShowMenu() {
    let host = getHost(getCurrentURL()) as string;
    let listPagesRestricted = getMenu().settings.pages;

    return listPagesRestricted.filter(_=>_.host === host).length>0;
}

export function loadEventosOnInputs() {
    const inputTexts = $(INPUT_TEXTS).toArray();

    if (inputTexts.length > 0)
        attachEventsOnAllInputs(inputTexts);
    else
        setTimeout(() => {
            // Sometimes the inputs values arent loaded on time
            const inputTexts = $(INPUT_TEXTS).toArray();

            if (enableToShowMenu())
                attachEventsOnAllInputs(inputTexts);

        }, 2000);
}

function attachEventsOnAllInputs(inputTexts: HTMLElement[]) {
    
    inputTexts.forEach(_ => {
        _.addEventListener('click', (e) => showMenu(e));
        _.addEventListener('blur', (e) => autoSave(e));
    });

    var joinedArray = getInputSaved().map(_ => (_.xpath));

    sendMessageToIframe('load', { menu: getMenu(), url: window.location.href, joined: joinedArray });
}

function autoSave(e: any) {
    if (getMenu().settings.activeAutoSave)
        actionAdd($(e.target), 'AutoSave');
}

function closeMenu() {
    if (!getShadowRoot()) return;

    const __open_menu = getShadowRoot().getElementById('balloon');

    if (__open_menu)
        __open_menu.style.display = 'none';
}

function isMenuOpened() {
    if (!getShadowRoot()) return;

    const __open_menu = getShadowRoot().getElementById('balloon');
    if (__open_menu)
        return __open_menu.style.display === 'block';
}

function clickOutOfBox(obj: any) {

    if (obj == null)
        return true;

    if (getShadowRoot() === undefined || getShadowRoot() === null)
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
    // const __open_menu = getShadowRoot().getElementById(_OPENMENU_MENU_ID);
    item = (item || '').trim();
    const isAdd = option === 'add'
    const isFulfill = option === 'fulfill'
    const isReadAll = option === 'readall'
    const clearAll = option === 'clear'

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

            if (getInputSelected() !== undefined)
                actionAdd(getInputSelected(), '');
            break;
        default:
            {
                if (getInputSelected() !== undefined) {
                    let inputTextSelected = getInputSelected()[0];

                    typeIntoElement(inputTextSelected, item);
                }
            }

    }
}

function isPageAllowed() {
    let _settings = getMenu().settings.pages;
    let _host = getHost(getCurrentURL());

    return _settings.filter(_=>_.host === _host).length === 0;
}

function showMenu(e: any) {
    const __open_menu = getShadowRoot().getElementById('balloon');

    setInputSelected($(e.target));

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    if (getMenu().settings.activeMenu 
        && isPageAllowed()
        && !getCloseTemporary()) {
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