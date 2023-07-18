



function resizeIframe(size) {
    var iframe = shadowRoot.getElementById('imenu');
    iframe.style.height = `${size}px`;
}

const getCurrentURL = () => {
    var url = window.location.href;
    var index = url.indexOf('?');

    if (index !== -1) {
        var part = url.substring(0, index);
        return part;
    }

    return url;

}

const removeHTMLElements = (htmlString) => {

    // Create a temporary container element
    var tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Remove the desired element
    var elementToRemove = tempContainer.querySelector('p'); // Select the element to remove
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }

    // Get the modified HTML string
    var modifiedHtmlString = tempContainer.innerText;

    return modifiedHtmlString;
}

function _addAction(obj) {
    let newValue = removeHTMLElements((obj.payload.value || '').trim());

    if (newValue.length > 0 && newValue.length < LIMIT_LEN_TEXT) {
        let _item = _MENU.find(_ => _.text === newValue);

        const newitem = { category: obj.payload.category, text: newValue, page: getCurrentURL(), date: (new Date()).toISOString(), position: obj.payload.position, xpath: obj.payload.xpath };
        if (!_item){
            newMenuItem(newitem, document.getElementsByClassName('list')[0]);
           
        }
    }
}

function go(text, isAdd) {
    window.parent.postMessage({ go: { text, action: isAdd } }, "*");
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

function hostExist() {
    const currentHost = getHost(_URL);

    return _MENU.filter(_ => getHost(_.page) === currentHost).length > 0;
}

function createFulfillOption() {
    debugger;
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoFill';

    var joinedArray = _JOINED_ARRAY;
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