import { getMenu } from "./globals/index";

export function localSaveValue(item:any) {
    getMenu().items.push(item);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localUpdateValue(item:any) {
    getMenu().items = getMenu().items.filter((_:any)=>_.text !== item.text);

    getMenu().items.push(item);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localRemoveValue(value:any) {
    getMenu().items = getMenu().items.filter((_:any)=>_.text !== value.text);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

