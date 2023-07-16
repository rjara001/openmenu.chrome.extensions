

function go(text, isAdd) {
    window.parent.postMessage({ go: {text, action: isAdd} }, "*");
}

function addEllipsis(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

function toText(item) {
    let textElipsed = addEllipsis(item.text, 25);
    let nameElipsed = addEllipsis(item.name !== undefined ? item.name : '', 15);

    if (nameElipsed.length > 0)
        return `${textElipsed} (${nameElipsed})`;
    return textElipsed;
}

function clean(menuList) {
    // const parentElement = document.getElementById('parent');
    const childNodes = Array.from(menuList.childNodes);

    // Remove each child node
    childNodes.forEach(node => menuList.removeChild(node));
}

function getHost(url) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}

const getUniqueCategories = (htmlMenu) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
}
function getInputSaved() {
    if (hostExist(_MENU)) {
        {
            const inputTexts = $(INPUT_TEXTS).toArray();

            return innerJoin($(inputTexts).map((index, element) => ({ ...$(element), xpath: getFullXPath(element) })), _MENU, 'xpath');
        }
    }

    return [];
}

function hostExist() {
    const currentHost = window.location.host;

    return _MENU.filter(_ => getHost(_.page) === currentHost).length > 0;
}

function createFulfillOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoFill';

    var joinedArray = getInputSaved();
    if (joinedArray.length > 0) {
        link.textContent += '(' + joinedArray.length + ')';
        link.classList.add('fulfill');
    }
    else {
        link.classList.add('disabled');
        link.title = 'Fulfill will be activated when you have data saved for these input texts'
    }
    link.addEventListener('click', function () {
        go(link.innerText, 'fulfill');
    });

    return link;
}


function groupAll() {
    const div = document.createElement('div');
    div.classList.add('submenu');
    return div;
}

function createAddOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item');

    link.innerText = 'Add'
    // link.appendChild(CreateSVG());

    link.addEventListener('click', function () {
        go(link.innerText, 'add');
    });

    return link;
}

function createSeparator() {
    const div = document.createElement('div');

    div.textContent = ' ';

    return div;
}
function createClearOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item');
    link.textContent = 'Clear';

    link.addEventListener('click', function () {
        go(link.innerText, 'clear');
    });

    return link;
}

function newMenuOptionsItem() {
    
    // const menuItem = document.createElement('div');

    // const outerDiv = document.createElement('div');
    // outerDiv.classList.add('optionmenu');

    // const firstDiv = document.createElement('div');
    // firstDiv.classList.add('itemline');
    // firstDiv.appendChild(createAddOption());


    // const _groupAll = groupAll();
    // firstDiv.appendChild(_groupAll);

    // _groupAll.appendChild(createFulfillOption());
    // _groupAll.appendChild(createSeparator());
    // // _groupAll.appendChild(createReadAllOption());
    // _groupAll.appendChild(createClearOption());

    // outerDiv.appendChild(firstDiv);

    // menuItem.appendChild(outerDiv);
    // menuItem.classList.add('subheader');

    // return menuItem;
}