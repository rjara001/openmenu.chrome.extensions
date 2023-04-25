
function go(item) {
    const __open_menu = document.getElementById(_OPENMENU_MENU_ID);

    if (inputSelected)
    {
        if (item==='Add')
        {
            let newValue = inputSelected.target.value;

            newMenuItem({ title: newValue, page: newValue }, __open_menu.querySelector('ul'));
            localSaveValue(newValue);
        }
    else
        inputSelected.target.value = item;
    }

    __open_menu.style.display = 'none';
}

function localSaveValue(value) {
    _MENU_HTML.push({ title: value, page: value });
            
    chrome.storage.local.set({ 'menu': _MENU_HTML }, function() {
        
    });
}


function showMenu(e) {
    const __open_menu = document.getElementById(_OPENMENU_MENU_ID);

    inputSelected = e;

    __open_menu.style.top = (e.clientY + 20) + 'px';
    __open_menu.style.left = (e.clientX + 20) + 'px';

    __open_menu.style.display = 'block';
    // _OPENMENU_MENU_ID.style.display = 'none';
}

function addMenu() {

    const menuList = document.createElement('ul');

    _MENU_HTML.forEach(item => {
        newMenuItem(item, menuList);
    });


    var _div = document.createElement("div");
 
    _div.setAttribute("id", _OPENMENU_MENU_ID);
    _div.appendChild(createHeader());
    _div.appendChild(menuList);

    document.body.appendChild(_div);
}

function createHeader() {
    var _div = document.createElement("div");
    var _title = document.createElement("div");
    _title.innerText = 'OpenMenu';

    _div.setAttribute("class", "header");
    _div.appendChild(_title);
    _div.appendChild(createCloseBtn());

    return _div;
}

function createCloseBtn(){ 
    var closeBtn = document.createElement("button"); //  <button id="closeBtn">&times;</button>
    closeBtn.id = 'closeBtn';
    closeBtn.className = 'closeBtn'
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', function(){
        const __open_menu = document.getElementById(_OPENMENU_MENU_ID);
        __open_menu.style.display = 'none';
    });

    return closeBtn;
}

function newMenuItem(item, menuList) {
    const menuItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = item.title;
    link.addEventListener('click', function () {
        go(item.page);
    });
    menuItem.appendChild(link);
    menuList.appendChild(menuItem);
}

