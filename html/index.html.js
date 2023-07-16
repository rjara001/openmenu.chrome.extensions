


function cleanChildElement(menuList) {
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }
}


function newMenuCategory(category, menuList) {

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
            let elemnt = document.getElementsByClassName('list');

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

function showMenusItems(category, menuList) {
    _MENU.filter(_ => _.category === category).forEach(_ => {

        newMenuItem(_, menuList);
    });

    let maxHeight = (menuList.offsetHeight>0?menuList.offsetHeight + 22: menuList.offsetHeight);
    // if (maxHeight>300)
    //     maxHeight = 300;
    window.parent.postMessage({ maxHeight: maxHeight }, "*");
}

function loadCategories() {

    let menuList = document.getElementsByClassName('items')[0];
    let fulfill = document.getElementById('fulfill');

    clean(menuList);

    var joinedArray = getInputSaved();
    if (joinedArray.length > 0) {
        fulfill.textContent += '(' + joinedArray.length + ')';
        fulfill.classList.add('fulfill');
    } else {
        fulfill.classList.add('disabled');
        fulfill.title = 'Fulfill will be activated when you have data saved for these input texts'
    }

    let categories = getUniqueCategories(_MENU);
    const categoriesFiltered = categories.filter(_ => _ !== undefined);

    categoriesFiltered.forEach(item => {

        newMenuCategory(item, menuList);
    });
    // if (categoriesFiltered.length === 0)
    showMenusItems(undefined, menuList);

}


$(document).ready(function () {

    window.addEventListener('message', function (event) {
        // Check the origin of the message for security purposes
        _MENU = event.data.items;

        loadCategories();
    });
});