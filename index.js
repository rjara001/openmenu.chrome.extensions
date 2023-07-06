let shadowRoot = undefined;

function doCloseOrAttachEvent() {
    if (isMenuOpened() && clickOutOfBox(event.target))
        closeMenu();
    else {
        const inputTexts = $(INPUT_TEXTS).toArray();


        inputTexts.forEach(_ => {
            _.addEventListener('click', (e) => showMenu(e));
            _.addEventListener('blur', (e) => autoSave(e));
        });
    }
}

function autoSave(e) {
    if (activeAutoSave)
        AddAction($(e.target), 'AutoSave');
}

function closeMenu() {
    if (!shadowRoot) return;

    const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);

    if (__open_menu)
        __open_menu.style.display = 'none';
}

function isMenuOpened() {
    if (!shadowRoot) return;

    const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);
    if (__open_menu)
        return __open_menu.style.display === 'block';
}

function clickOutOfBox(obj) {

    if (obj == null)
        return true;

    if (obj.shadowRoot !== undefined && obj.shadowRoot !== null)
        return false;

    if (obj.nodeName === 'INPUT' || obj.nodeName === 'TEXTAREA')
        return false;

    if (obj.id != _OPENMENU_MENU_ID)// && obj.id != _divVeryMatch_IMAGEN)
        return clickOutOfBox(obj.parentNode);

    return false;
}

function addEllipsis(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

function go(item, option) {
    // const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);
    item = (item || '').trim();
    const isAdd = option === 'add'
    const isFulfill = option === 'fulfill'
    const isReadAll = option === 'readall'
    const clearAll = option === 'clear'

    if (inputSelected !== undefined) {
        switch (true) {
            case clearAll:
                ClearAction();
                break;
            case isFulfill:
                FullfillAction();
                break;
            case isReadAll:
                ReadAllAction();
                break;
            case isAdd:
                AddAction(inputSelected);
                break;
            default:
                {
                    // inputSelected.target.value = item;
                    // inputSelected.target.focus();
                    // Set the cursor position to the end of the input element
                    // setTimeout(() => {
                        // setValueOnInput(inputSelected, item);
                        typeIntoElement(inputSelected[0], item);

                    // }, 100);

                }
        }
    }
}

function setValueOnInput(inputSelected, item) {
    // Create a new 'keydown' event
    let element = inputSelected[0];

    let lastValue = element.value;
    element.value = item;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
    
    // inputSelected.focus();
    // // inputSelected.val(item).trigger('change');

    // $(inputSelected).prop('value', item);

    // // Trigger a keydown event for the Backspace key
    // inputSelected.trigger($.Event('keydown', { key: 'Backspace', keyCode: 8 }));

    // // Trigger a keyup event for the Backspace key
    // inputSelected.trigger($.Event('keyup', { key: 'Backspace', keyCode: 8 }));

}

function showMenu(e) {
    const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);

    inputSelected = $(e.target);

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    if (activeExtension)
        __open_menu.style.display = 'block';
    // _OPENMENU_MENU_ID.style.display = 'none';

}

function addMenu() {

    const menuList = document.createElement('div');

    menuList.className = 'list'

    var containerMenu = document.createElement("div");

    var parentElement = document.createElement("div");

    parentElement.setAttribute("id", _OPENMENU_MENU_ID);

    // linkElem.onload = () => {
    const linkElem = document.createElement('style');

    linkElem.innerHTML = _STYLE_AS_STRING;
    shadowRoot = containerMenu.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(linkElem);

    shadowRoot.appendChild(parentElement);
    parentElement.appendChild(createHeader());
    parentElement.appendChild(menuList);

    document.body.appendChild(containerMenu);

    loadCategories(menuList);
}

function loadCategories(menuList) {

    menuList.appendChild(newMenuOptionsItem());

    let categories = getUniqueCategories(_MENU_HTML);
    const categoriesFiltered = categories.filter(_ => _ !== undefined);

    categoriesFiltered.forEach(item => {

        newMenuCategory(item, menuList);
    });
    // if (categoriesFiltered.length === 0)
    showMenusItems(undefined, menuList);

}

function newMenuCategory(category, menuList) {

    const menuItem = document.createElement('div');
    menuItem.classList.add('item');
    menuItem.textContent = '-> ' + category;

    menuItem.classList.add("category");

    menuItem.addEventListener('click', function () {

        cleanChildElement(menuList);

        newMenuItem({ text: '<- ' + category }, menuList, 'category');
        showMenusItems(category, menuList);

    });
    menuList.appendChild(menuItem);
}

function showMenusItems(category, menuList) {
    _MENU_HTML.filter(_ => _.category === category).forEach(_ => {

        newMenuItem(_, menuList);
    });
}

function cleanChildElement(menuList) {
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }
}

function createHeader() {
    var header = document.createElement("div");
    var _text = document.createElement("div");
    _text.innerText = NAME_EXTENSION;

    header.setAttribute("class", "header");
    header.appendChild(_text);
    header.appendChild(createCloseBtn());

    header.addEventListener('mousedown', startDragging);

    return header;
}

function createCloseBtn() {
    var closeBtn = document.createElement("button"); //  <button id="closeBtn">&times;</button>
    closeBtn.id = 'closeBtn';
    closeBtn.className = 'closeBtn'
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click', function () {
        //   const __open_menu = document.getElementById(_OPENMENU_MENU_ID);
        closeMenu();
    });

    return closeBtn;
}

function toText(item) {
    let textElipsed = addEllipsis(item.text, 25);
    let nameElipsed = addEllipsis(item.name !== undefined ? item.name : '', 15);

    if (nameElipsed.length > 0)
        return `${textElipsed} (${nameElipsed})`;
    return textElipsed;
}

function newMenuItem(item, menuList, type) {
    const isCategory = type === 'category'
    const isAdd = type === 'add'

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
            let elemnt = shadowRoot.querySelector('.list');

            cleanChildElement(elemnt);
            loadCategories(elemnt);
        });
    else
        link.addEventListener('click', function () {
            go(item.text, isAdd);
        });
    // Append the "remove" and "item" <div> elements to the first nested <div> element
    if (!isAdd && !isCategory)
        firstDiv.appendChild(removeDiv);

    firstDiv.appendChild(link);

    // Append the first nested <div> element to the outermost <div> element
    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);

    menuList.appendChild(menuItem);
}