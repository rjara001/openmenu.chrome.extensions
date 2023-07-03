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
    link.className = 'item';
    link.textContent = 'Fulfill';

    link.addEventListener('click', function () {
        go(link.innerText, 'fulfill');
    });

    return link;
}

function createAddOption() {
    const link = document.createElement('div');
    link.className = 'item';
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

function newMenuOptionsItem() {
    const menuItem = document.createElement('div');

    // Create the outermost <div> element
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('item');
    // Create the first nested <div> element
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('itemline')
    // Create the "remove" <div> element

    firstDiv.appendChild(createAddOption());
    firstDiv.appendChild(createSeparator());
    firstDiv.appendChild(createFulfillOption());

    outerDiv.appendChild(firstDiv);

    menuItem.appendChild(outerDiv);

    return menuItem;
}
function innerJoin(array1, array2, key) {
    var result = [];

    for (var i = 0; i < array1.length; i++) {
        var obj1 = array1[i];
        var obj2 = array2.find(function (element) {
            return element[key] === obj1[key];
        });

        if (obj2) {
            var mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }

    return result;
}
function getPosition(input) {
    let inputOffset = $(input).offset();
    return `t:${inputOffset.top};l:${inputOffset.left};b:${inputOffset.bottom};r:${inputOffset.right}`;
}

function FullfillAction() {
    const inputTexts = $('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="date"]').toArray();

    var joinedArray = innerJoin($(inputTexts).map((index, element) => ({ id: getPosition(element) })), _MENU_HTML.map(_ => ({ id: _.position })), 'id');
    console.log(joinedArray);

}