const getUniqueCategories = (htmlMenu) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
}

const getCurrentURL = () => {
    return window.location.href;
}
const showOptions = () => {

}

function createFulfillOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item', 'pr5');
    link.textContent = 'AutoFill';

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
    _groupAll.appendChild(createReadAllOption());
    _groupAll.appendChild(createClearOption());

    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);
    menuItem.classList.add('subheader');

    return menuItem;
}

function findLastOccurrence(arr, key, value) {
    return arr.reduceRight((acc, obj) => {
        if (obj[key] === value && !acc) {
            return obj;
        }
        return acc;
    }, null);
}

function innerJoin(inputs, values, key) {
    var result = [];
    var currentUrl = window.location.href;

    for (var i = 0; i < inputs.length; i++) {
        var obj1 = inputs[i];
        var obj2 = findLastOccurrence(values.filter(_ => _.page === currentUrl), key, obj1[key]);

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
    let newValue = (input.val() || '').trim();
    if (newValue.length > 0 && newValue.length < 80 && !_MENU_HTML.find(_ => _.text === newValue)) {

        const item = { category, text: newValue, page: getCurrentURL(), date: (new Date()).toISOString(), position: getPosition(input) };
        newMenuItem(item, shadowRoot.querySelector('.list'));
        localSaveValue(item);
    }
}

function FullfillAction() {
    const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();

    var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), position: getPosition(element) })), _MENU_HTML, 'position');

    joinedArray.forEach(_ => {
        $(_).val(_.text);
    })

}

function ClearAction() {
    const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();

    var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ ...$(element), position: getPosition(element) })), _MENU_HTML, 'position');

    joinedArray.forEach(_ => {
        $(_).val('');
    })

}

function ReadAllAction() {
    const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();

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