let shadowRoot = undefined;

function doCloseOrAttachEvent() {
    if (isMenuOpened() && clickOutOfBox(event.target))
        closeMenu();
    else {
        const inputTexts = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]');

        inputTexts.forEach(_ => {
                _.addEventListener('dblclick', (e) => showMenu(e));
        });
    }
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
        
    if (obj.nodeName === 'INPUT')
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

function go(item) {
    // const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);
    item = (item || '').trim();

    if (inputSelected) {
        if (item === 'Add') {
            let newValue = (inputSelected.target.value || '').trim();
            if (newValue.length > 0 && newValue.length < 80 && !_MENU_HTML.find(_=>_.page===item)) {
                newMenuItem({ title: newValue, page: newValue }, shadowRoot.querySelector('.list'));
                localSaveValue(newValue);
            }
        }
        else
            inputSelected.target.value = item;
    }

    // __open_menu.style.display = 'none';
}

function showMenu(e) {
    const __open_menu = shadowRoot.getElementById(_OPENMENU_MENU_ID);

    inputSelected = e;

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    __open_menu.style.display = 'block';
    // _OPENMENU_MENU_ID.style.display = 'none';
}

function addMenu() {

    const menuList = document.createElement('div');
    menuList.className = 'list'

    var containerMenu = document.createElement("div");

   // containerMenu.setAttribute("id", _OPENMENU_MENU_ID + '_container');

    var parentElement = document.createElement("div");

    parentElement.setAttribute("id", _OPENMENU_MENU_ID);

    // linkElem.onload = () => {
        const linkElem = document.createElement('style');
        // linkElem.setAttribute('rel', 'stylesheet');
        // linkElem.setAttribute('href', 'style-shadow.css');
        linkElem.innerHTML = _STYLE_AS_STRING;
        shadowRoot = containerMenu.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(linkElem);

        shadowRoot.appendChild(parentElement);
        parentElement.appendChild(createHeader());
        parentElement.appendChild(menuList);

    //   };
    //   document.head.appendChild(linkElem);

    document.body.appendChild(containerMenu);

    newMenuItem({ title: 'Add...', page: 'Add' }, menuList);

    _MENU_HTML.forEach(item => {
        newMenuItem(item, menuList);
    });

    
}

function createHeader() {
    var _div = document.createElement("div");
    var _title = document.createElement("div");
    _title.innerText = NAME_EXTENSION;

    _div.setAttribute("class", "header");
    _div.appendChild(_title);
    _div.appendChild(createCloseBtn());

    return _div;
}

function createCloseBtn() {
    var closeBtn = document.createElement("button"); //  <button id="closeBtn">&times;</button>
    closeBtn.id = 'closeBtn';
    closeBtn.className = 'closeBtn'
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', function () {
        //   const __open_menu = document.getElementById(_OPENMENU_MENU_ID);
        closeMenu();
    });

    return closeBtn;
}

function newMenuItem(item, menuList) {
    
    const menuItem = document.createElement('div');

    // Create the outermost <div> element
    const outerDiv = document.createElement('div');

    // Create the first nested <div> element
    const firstDiv = document.createElement('div');

    // Create the "remove" <div> element
    const removeDiv = document.createElement('div');
    removeDiv.textContent = 'X';
    removeDiv.classList.add('remove');
    removeDiv.addEventListener('click', function () {
        // remove(menuItem);
        menuItem.remove();
        localRemoveValue(item);
    });
    // Create the "item" <div> element
    const link = document.createElement('div');
    link.className = 'item';
    link.textContent = addEllipsis(item.title, 15);
    link.addEventListener('click', function () {
        go(item.page);
    });

    // Append the "remove" and "item" <div> elements to the first nested <div> element
    if (item.page !== 'Add')
        firstDiv.appendChild(removeDiv);
    firstDiv.appendChild(link);

    // Append the first nested <div> element to the outermost <div> element
    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);

    menuList.appendChild(menuItem);
}

