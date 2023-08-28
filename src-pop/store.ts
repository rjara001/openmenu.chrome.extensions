import { getMenu } from "./globals/index";

export function localSaveValueSettings(key:string, value:any) {
    // getMenu().items.push(item);
    let menu = getMenu();
    menu.settings[key] = value;

    chrome.storage.local.set({ 'menu': menu }, function() {
        
    });
}
export function localUpdateValueSettings(items:any[]) {
    // only new items

    getMenu().settings.pages = items;
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localUpdateValueMenuItems(items:any[]) {
    // only new items

    getMenu().items = items;
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

export function localRemoveValueItems(value:any) {
    getMenu().items = getMenu().items.filter((_:any)=>_.text !== value.text);
            
    chrome.storage.local.set({ 'menu': getMenu() }, function() {
        
    });
}

