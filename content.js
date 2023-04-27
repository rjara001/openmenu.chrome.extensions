


let inputSelected = undefined;

let _MENU_HTML = [
    // { title: 'Add...', page: 'Add' }
];


chrome.storage.local.get('menu', function (result) {
    if (result.menu) {
        ///const list = JSON.parse(result.menu);
        _MENU_HTML = [..._MENU_HTML, ...result.menu]
    }

});

document.addEventListener('click', function (e) {

    doCloseOrAttachEvent();
});

window.addEventListener('load', function (e) {

    addMenu();
});

