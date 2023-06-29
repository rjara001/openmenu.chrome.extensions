
function localSaveValue(value) {
    _MENU_HTML.push({ text: value, page: '' });
            
    chrome.storage.local.set({ 'menu': _MENU_HTML }, function() {
        
    });
}

function localRemoveValue(value) {
    _MENU_HTML = _MENU_HTML.filter(_=>_.text !== value.text);
            
    chrome.storage.local.set({ 'menu': _MENU_HTML }, function() {
        
    });
}

