

import { getActiveAutoSave, getMenu, setActiveAutoSave, setJoinedArray, setMenu, setURL } from "./globals/index";
import { _addAction, loadCategories, toText, removeLastItemByCategory, showMenusItems } from "./util.html";
import { LIMIT_LEN } from './constants'

$(document).ready(function () {

    window.addEventListener('message', function (event) {
        switch (event.data.action) {
            case 'showmenu': {
                let menuList = document.getElementsByClassName('items')[0] as HTMLElement;
                let maxHeight = (menuList.parentNode?.parentNode as HTMLElement).offsetHeight;
                window.parent.postMessage({ maxHeight: maxHeight }, "*");

                let add = document.getElementById('add') as HTMLInputElement;

                if (!getActiveAutoSave())
                    add.addEventListener('click', (e) => {
                        window.parent.postMessage({ action: 'add' }, "*"); // send a message to iframe for stop autosave and save the new value

                        // showMenusItems('', menuList);
                    });
            }
                break;
            case 'resize': {
                let menuList = document.getElementsByClassName('items')[0] as HTMLElement;
                let maxHeight = (menuList.parentNode?.parentNode as HTMLElement).offsetHeight;
                window.parent.postMessage({ maxHeight: maxHeight }, "*");
            }
                break;
            case 'load':
                {
                    // debugger;
                    setMenu(event.data.payload.menu);
                    setURL(event.data.payload.url);
                    setActiveAutoSave(event.data.payload.activeAutoSaved);
                    setJoinedArray(event.data.payload.joined);

                    loadCategories();
                }
                break;
            case 'add':
                {
                    // debugger;
                    const category = event.data.payload.category?.toLowerCase();
                    if (!getMenu())
                        return;

                    const lenMenu = getMenu().items.length;

                    if (lenMenu < LIMIT_LEN) {
                        _addAction(event.data);
                    }
                    else if (category === 'autosave') {
                        removeLastItemByCategory(getMenu().items, 'autosave');
                        // _addAction(input);
                    }
                }
        }

    });
});