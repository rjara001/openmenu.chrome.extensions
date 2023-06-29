let shadowRoot = undefined;

function doCloseOrAttachEvent() {
    if (isMenuOpened() && clickOutOfBox(event.target))
        closeMenu();
    else {
        const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();


        inputTexts.forEach(_ => {
            _.addEventListener('click', (e) => showMenu(e));
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

    console.log(inputSelected.val());

    if (inputSelected !== undefined) {
        if (item === 'Add') {
            let newValue = (inputSelected.val() || '').trim();
            if (newValue.length > 0 && newValue.length < 80 && !_MENU_HTML.find(_ => _.text === item)) {
                newMenuItem({ text: newValue, page: '' }, shadowRoot.querySelector('.list'));
                localSaveValue(newValue);
            }
        }
        else {
            // inputSelected.target.value = item;
            // inputSelected.target.focus();
            // Set the cursor position to the end of the input element

            inputSelected.focus();
            inputSelected.val(item);

            inputSelected.trigger('keydown');
            inputSelected.trigger('keyup');
            inputSelected.trigger('change');
            inputSelected.focus();
        }
    }

    // __open_menu.style.display = 'none';
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

    newMenuItem({ text: 'Add...', page: '' }, menuList);

    // _MENU_HTML.forEach(item => {

    //     newMenuItem(item, menuList);
    // });

    let categories = _MENU_HTML.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);

    categories.forEach(item => {

        newMenuCategory(item, menuList);
    });
}

function newMenuCategory(category, menuList) {

    const menuItem = document.createElement('div');

    menuItem.textContent = category;
    menuItem.addEventListener('click', function () {
        // remove(menuItem);


        while (menuList.firstChild) {
            menuList.removeChild(menuList.firstChild);
          }
        // menuList.children.forEach(_=>{
        //     _.removeChild();
        // })
        _MENU_HTML.filter(_=>_.category === category).forEach(_=>{
            newMenuItem(_, menuList);
        })
        
    });
    menuList.appendChild(menuItem);
}

function createHeader() {
    var _div = document.createElement("div");
    var _text = document.createElement("div");
    _text.innerText = NAME_EXTENSION;

    _div.setAttribute("class", "header");
    _div.appendChild(_text);
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
    link.textContent = addEllipsis(item.text, 15);
    link.addEventListener('click', function () {
        go(item.text);
    });

    // Append the "remove" and "item" <div> elements to the first nested <div> element
    if (item.text !== 'Add')
        firstDiv.appendChild(removeDiv);
    firstDiv.appendChild(link);

    // Append the first nested <div> element to the outermost <div> element
    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);

    menuList.appendChild(menuItem);
}

