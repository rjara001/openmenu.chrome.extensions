import { getMenu } from "./globals/index.js";
export function localSaveValue(item) {
    getMenu().items.push(item);
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
    });
}
export function localUpdateValue(item) {
    getMenu().items = getMenu().items.filter(_ => _.text !== item.text);
    getMenu().items.push(item);
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
    });
}
function localRemoveValue(value) {
    getMenu().items = getMenu().items.filter(_ => _.text !== value.text);
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
    });
}
