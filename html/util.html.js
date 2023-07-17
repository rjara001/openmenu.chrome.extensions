

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

function _addAction(input, category) {
    let newValue = removeHTMLElements((input.val() || '').trim());

    if (newValue.length > 0 && newValue.length < LIMIT_LEN_TEXT) {
        let _item = _MENU.items.find(_ => _.text === newValue);

        const newitem = { category, text: newValue, page: getCurrentURL(), date: (new Date()).toISOString(), position: getPosition(input), xpath: getFullXPath(input) };
        if (_item)
            localUpdateValue(newitem);
        else {

            newMenuItem(newitem, shadowRoot.querySelector('.list'));
            localSaveValue(newitem);
        }
    }
}

function removeLastItemByCategory(arr, category) {
    var index = arr.findIndex(function (item) {
        return item.category === category;
    });

    if (index !== -1) {
        arr.splice(index, 1);
    }

    return arr;
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
    debugger;
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
        debugger;
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