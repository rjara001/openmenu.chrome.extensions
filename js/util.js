const getUniqueCategories = (htmlMenu) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
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
const showOptions = () => {

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

function createReadAllOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoAdd';

    link.addEventListener('click', function () {
        go(link.innerText, 'readall');
    });

    return link;
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

function groupAll() {
    const div = document.createElement('div');
    div.classList.add('submenu');
    return div;
}

function newMenuOptionsItem() {
    const menuItem = document.createElement('div');

    const outerDiv = document.createElement('div');
    outerDiv.classList.add('optionmenu');

    const firstDiv = document.createElement('div');
    firstDiv.classList.add('itemline');
    firstDiv.appendChild(createAddOption());


    const _groupAll = groupAll();
    firstDiv.appendChild(_groupAll);

    _groupAll.appendChild(createFulfillOption());
    _groupAll.appendChild(createSeparator());
    // _groupAll.appendChild(createReadAllOption());
    _groupAll.appendChild(createClearOption());

    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);
    menuItem.classList.add('subheader');

    return menuItem;
}

function findLastOccurrence(arr, key, value) {
    return arr.reduceRight((acc, obj) => {
        if ((obj[key] === value) && !acc) {
            return obj;
        }
        return acc;
    }, null);
}

function innerJoin2(inputs, values, key1, key2) {
    var result = [];
    var currentUrl = window.location.href;

    for (var i = 0; i < inputs.length; i++) {
        var obj1 = inputs[i];
        var obj2 = findLastOccurrence(values, key1, obj1[key1], key2, obj1[key2]);

        if (obj2) {
            var mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}

function innerJoin(inputs, values, key) {
    var result = [];
    var currentUrl = window.location.href;

    for (var i = 0; i < inputs.length; i++) {
        var obj1 = inputs[i];
        var obj2 = findLastOccurrence(values, key, obj1[key]);

        if (obj2) {
            var mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}

function chkval(value) {
    if (value === undefined)
        return '';
    return value;
}
function getPosition(input) {
    let inputOffset = $(input).offset();
    return `t:${chkval(inputOffset.top)};l:${chkval(inputOffset.left)};b:${chkval(inputOffset.bottom)};r:${chkval(inputOffset.right)}`;
}

function AddAction(input, category) {
    const lenMenu = _MENU_HTML.length;
    if (lenMenu < LIMIT_LEN) {
        _addAction(input, category);
    }
    else if (category === 'autosave') {
        removeLastItemByCategory(_MENU_HTML, 'autosave');
        _addAction(input, category);
    }

}

function _addAction(input, category) {
    let newValue = (input.val() || '').trim();
    if (newValue.length > 0 && newValue.length < LIMIT_LEN_TEXT) {
        let _item = _MENU_HTML.find(_ => _.text === newValue);

        const newitem = { category, text: newValue, page: getCurrentURL(), date: (new Date()).toISOString(), position: getPosition(input), xpath: getFullXPath(input) };
        if (_item)
            localUpdateValue(newitem);
        else {

            newMenuItem(newitem, shadowRoot.querySelector('.list'));
            localSaveValue(newitem);
        }
    }
}

function getHost(url) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}
function hostExist() {
    const currentHost = window.location.host;

    return _MENU_HTML.filter(_ => getHost(_.page) === currentHost).length > 0;
}
function FullfillAction() {
    const currentHost = window.location.host;

    const inputTexts = $(INPUT_TEXTS).toArray();

    const inputSaved = _MENU_HTML.filter(_=>getHost(_.page) === currentHost);

    var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), xpath:getFullXPath(element) })), _MENU_HTML, 'xpath');

    // var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), position: getPosition(element), xpath:getFullXPath(element) })), _MENU_HTML, 'position', 'xpath');

    joinedArray.forEach(_ => {
        $(_).val(_.text);
    });
}

function getInputSaved() {
    if (hostExist(_MENU_HTML)) {
        {
            const inputTexts = $(INPUT_TEXTS).toArray();

            return innerJoin($(inputTexts).map((index, element) => ({ ...$(element), xpath:getFullXPath(element) })), _MENU_HTML, 'xpath');
        }
    }

    return [];
}

function ClearAction() {

    var joinedArray = getInputSaved();

    joinedArray.forEach(_ => {
        $(_).val('');
    })

}

function ReadAllAction() {
    const inputTexts = $(INPUT_TEXTS).toArray();

    inputTexts.forEach(_ => {
        AddAction($(_));
    });
}

function CreateSVG() {
    // Create the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('id', 'my-svg');
    // svg.classList.add('svg')
    const $svg = $(svg);

    $svg.html(PLUS_SVG);

    return $svg.get(0);

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

function typeIntoElement(element, text) {
    // Set focus on the element
    element.focus();

    // Iterate over each character in the text
    for (let i = 0; i < text.length; i++) {
        // Create a new KeyboardEvent for each character
        const keyEvent = new KeyboardEvent('keydown', {
            key: text[i],
            bubbles: true,
            cancelable: true,
        });

        // Dispatch the keyboard event
        element.dispatchEvent(keyEvent);

        // Update the value of the element with the current character
        element.value += text[i];

        // Create and dispatch an input event
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        element.dispatchEvent(inputEvent);

        // Create and dispatch a keyup event
        const keyupEvent = new KeyboardEvent('keyup', {
            key: text[i],
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(keyupEvent);
    }
}

function getFullXPath(element) {
    var xpath = '';
    var $element = $(element);
  
    while ($element.length) {
      var tagName = $element.prop('tagName')?.toLowerCase() || '';
      var parent = $element.parent();
      var siblings = parent.children(tagName);
  
      if (siblings.length > 1) {
        var index = siblings.index($element) + 1;
        xpath = '/' + tagName + '[' + index + ']' + xpath;
      } else {
        xpath = '/' + tagName + xpath;
      }
  
      $element = parent;
    }
  
    return xpath;
  }
  