
function localSaveValue(item) {
    _MENU.items.push(item);
            
    chrome.storage.local.set({ 'menu': _MENU }, function() {
        
    });
}

function localUpdateValue(item) {
    _MENU = _MENU.items.filter(_=>_.text !== item.text);

    _MENU.items.push(item);
            
    chrome.storage.local.set({ 'menu': _MENU }, function() {
        
    });
}

function localRemoveValue(value) {
    _MENU = _MENU.items.filter(_=>_.text !== value.text);
            
    chrome.storage.local.set({ 'menu': _MENU }, function() {
        
    });
}

