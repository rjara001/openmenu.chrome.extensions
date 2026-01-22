


import { getJoinedArray, getMenu, getURL } from './globals/index';
import { localRemoveValue } from './store'
import { LIMIT_LEN_TEXT } from './constants'

function cleanChildElement(menuList: HTMLElement) {
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }
}
export function showMenusItems(category: string, menuList: HTMLElement) {

    getMenu().items.filter((_: any) => _?.category === category).forEach((_: any) => {

        newMenuItem(_, menuList, '');
    });
    let maxHeight = (menuList.parentNode?.parentNode as HTMLElement).offsetHeight;
    window.parent.postMessage({ maxHeight: maxHeight }, "*");
}
function getHost(url: string) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}
function newMenuCategory(category: string, menuList: HTMLElement) {

    const menuItem = document.createElement('div');
    menuItem.classList.add('item');
    menuItem.textContent = '-> ' + category;

    menuItem.classList.add("category");

    menuItem.addEventListener('click', function () {

        cleanChildElement(menuList);

        newMenuItem({ text: '<- ' + category }, menuList, 'category');

        const menuScroll = document.createElement('div');
        menuScroll.classList.add('scroll');
        menuList.appendChild(menuScroll);

        showMenusItems(category, menuScroll);

    });
    menuList.appendChild(menuItem);
}

export function _addAction(obj: any) {

    if (obj.payload.text.length > 0 && obj.payload.text.length < LIMIT_LEN_TEXT) {
        let _item = getMenu().items.find((_: any) => _.text === obj.payload.text);

        const newitem = obj.payload;

        if (!_item) {
            newMenuItem(newitem, document.getElementsByClassName('items')[0] as HTMLElement, '');
        }
    }
}

export function loadCategories() {
    // debugger;
    let menuList = document.getElementsByClassName('items')[0] as HTMLElement;
    let fulfill = document.getElementById('fulfill') as HTMLInputElement;
    let clear = document.getElementById('clear') as HTMLInputElement;


    clear.addEventListener('click', (e) => {
        go('clear', 'clear');
    });

    fulfill.addEventListener('click', (e) => {
        go('fulfill', 'fulfill');
    });

    clean(menuList);

    var joinedArray = getJoinedArray();
    if (joinedArray.length > 0) {
        fulfill.innerHTML = 'Fulfill&nbsp;(' + joinedArray.length + ')';
        fulfill.classList.add('fulfill');
    } else {
        fulfill.classList.add('disabled');
        fulfill.title = 'Fulfill will be activated when you have data saved for these input texts'
    }

    let categories = getUniqueCategories(getMenu().items);
    const categoriesFiltered = categories.filter((_: string) => _ !== null);

    categoriesFiltered.forEach((item: string) => {

        newMenuCategory(item, menuList);
    });
    // if (categoriesFiltered.length === 0)
    showMenusItems('', menuList);
}

function newMenuItem(item: any, menuList: HTMLElement, type: string) {
    const isCategory: boolean = type === 'category'
    const isAdd: boolean = type === 'add'

    const menuItem = document.createElement('div');

    // Create the outermost <div> element
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('item');
    // Create the first nested <div> element
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('itemline')
    // Create the "remove" <div> element
    const removeDiv = document.createElement('div');
    removeDiv.textContent = 'X';
    removeDiv.classList.add('remove');
    removeDiv.addEventListener('click', function () {
        // remove(menuItem);
        menuItem.remove();
        localRemoveValue(item);
    });

    const link = document.createElement('div');
    link.className = 'item';
    link.textContent = toText(item);
    if (isCategory)
        link.addEventListener('click', function () {
            //let menuList = shadowRoot.getElementById(_OPENMENU_MENU_ID);
            let elemnt = document.getElementsByClassName('items')[0] as HTMLElement;

            cleanChildElement(elemnt);
            loadCategories();
        });
    else
        link.addEventListener('click', function () {
            go(item.text, 'isAdd');
        });
    // Append the "remove" and "item" <div> elements to the first nested <div> element
    if (!isAdd && !isCategory)
        firstDiv.appendChild(removeDiv);

    firstDiv.appendChild(link);

    // Append the first nested <div> element to the outermost <div> element
    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);

    menuList.appendChild(menuItem);

    // resizeIframe(menuList.parentNode.parentNode.offsetHeight);
    let maxHeight = (menuList.parentNode?.parentNode as HTMLElement).offsetHeight;
    window.parent.postMessage({ maxHeight: maxHeight }, "*");
}

function go(text: string, isAdd: string) {
    window.parent.postMessage({ go: { text, action: isAdd } }, "*");
}

function addEllipsis(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

export function toText(item: any) {

    let textElipsed = item.type === 'password' ? 'xxxxxxxx (password)' : addEllipsis(item.text, 25);
    let nameElipsed = addEllipsis(item.name !== undefined ? item.name : '', 15);

    if (nameElipsed.length > 0)
        return `${textElipsed} (${nameElipsed})`;
    return textElipsed;
}

function customFindIndex<T>(array: T[], callback: (element: T) => boolean): number {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return i;
        }
    }
    return -1;
}
export function removeLastItemByCategory(arr: string[], category: string) {
    var index = customFindIndex(arr, function (item: any) {
        return item.category?.toLowerCase() === category;
    });

    if (index !== -1) {
        arr.splice(index, 1);
    }

    return arr;
}

function clean(menuList: HTMLElement) {
    // const parentElement = document.getElementById('parent');
    const childNodes = menuList.childNodes;

    // Remove each child node
    childNodes.forEach(node => menuList.removeChild(node));
}

// function getHost(url: string) {
//     if (url) {
//         const parsedURL = new URL(url);
//         return parsedURL.host;
//     }
//     return false;
// }

export const getUniqueCategories = (htmlMenu: any[]) => {

    return htmlMenu.reduce(function (acc, item) {
        if (item && item.category != undefined && item.category.length > 0 && !acc.includes(item.category)) {
            acc.push(item.category);
        }

        return acc;
    }, []);

}
