
function localSaveValue(value) {
    _MENU_HTML.push({ title: value, page: value });
            
    chrome.storage.local.set({ 'menu': _MENU_HTML }, function() {
        
    });
}

function localRemoveValue(value) {
    _MENU_HTML = _MENU_HTML.filter(_=>_.page !== value.page);
            
    chrome.storage.local.set({ 'menu': _MENU_HTML }, function() {
        
    });
}

