import { getMenu } from "./globals/index";

export function localSaveValue(item:any) {
    getMenu().items.push(item);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localUpdateValue(item:any) {
    let _items = getMenu().items;
    _items = _items.filter(_=>_.text !== item.text);

    getMenu().items = _items;

    getMenu().items.push(item);

    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localRemoveValue(value:any) {
    getMenu().items = getMenu().items.filter(_=>_.text !== value.text);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

