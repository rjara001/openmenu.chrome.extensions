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
    link.className = 'optionmenu';
    link.textContent = 'Fulfill';

    link.addEventListener('click', function () {
        go(link.innerText, 'fulfill');
    });

    return link;
}

function createReadAllOption() {
    const link = document.createElement('div');
    link.className = 'optionmenu';
    link.textContent = 'AddAll';

    link.addEventListener('click', function () {
        go(link.innerText, 'readall');
    });

    return link;
}

function createAddOption() {
    const link = document.createElement('div');
    link.classList.add('optionmenu', 'item');

    link.textContent = 'Add';

    link.addEventListener('click', function () {
        go(link.innerText, 'add');
    });

    return link;
}

function createSeparator() {
    const div = document.createElement('div');

    div.textContent = '|';

    return div;
}

function groupAll() {
    const div = document.createElement('div');
    div.classList.add('submenu');
    return div;
}

function newMenuOptionsItem() {
    const menuItem = document.createElement('div');

    // Create the outermost <div> element
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('optionmenu');
    // Create the first nested <div> element
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('itemline');
    // Create the "remove" <div> element
    firstDiv.appendChild(createAddOption());

    
    const _groupAll = groupAll();
    firstDiv.appendChild(_groupAll);
 
    _groupAll.appendChild(createFulfillOption());
    _groupAll.appendChild(createSeparator());
    _groupAll.appendChild(createReadAllOption());

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
        var obj2 = findLastOccurrence(values.filter(_=>_.page === currentUrl), key, obj1[key]);

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

function AddAction(input) {
    let newValue = (input.val() || '').trim();
    if (newValue.length > 0 && newValue.length < 80 && !_MENU_HTML.find(_ => _.text === newValue)) {

        const item = { text: newValue, page: getCurrentURL(), date: (new Date()).toISOString(), position: getPosition(input) };
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

function ReadAllAction() {
    const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();

    inputTexts.forEach(_ => {
        AddAction($(_));
    });
}