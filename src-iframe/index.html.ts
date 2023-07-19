

import { getMenu, setJoinedArray, setMenu, setURL } from "./globals/index";
import { _addAction, loadCategories, toText, removeLastItemByCategory } from "./util.html";
import {LIMIT_LEN} from './constants'

function cleanChildElement(menuList:HTMLElement) {
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }
}

$(document).ready(function () {

    window.addEventListener('message', function (event) {

        switch (event.data.action) {
            case 'resize':{
                let menuList = document.getElementsByClassName('items')[0] as HTMLElement;
                let maxHeight = (menuList.parentNode?.parentNode as HTMLElement).offsetHeight;
                window.parent.postMessage({ maxHeight: maxHeight }, "*");
            }
            break;
            case 'load':
                {
                    setMenu(event.data.payload.items);
                    setURL(event.data.payload.url);
                    setJoinedArray(event.data.payload.joined);

                    loadCategories();
                }
                break;
            case 'add':
                {
                    const category = event.data.payload.category;
                    if (!getMenu())
                        return;

                    const lenMenu = getMenu().length;
                    if (lenMenu < LIMIT_LEN) {
                        _addAction(event.data);
                    }
                    else if (category === 'autosave') {
                        removeLastItemByCategory(getMenu(), 'autosave');
                        // _addAction(input);
                    }
                }
        }

    });
});