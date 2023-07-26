import { getMenu, setMenu } from "./globals/index";
import { displaySuggestions, exportData, getHost, getSuggestions, importData } from "./settings.util";
import { renderTable, renderTablePages } from "./tables";
// Variables to store the current row and data
let currentRow;
let currentData;
let currentDataIndex;
var category = document.getElementById("category");
if (chrome.storage) {
    chrome.storage.local.get('menu', function (result) {
        if (result.menu) {
            if (Array.isArray(result.menu)) // old fashion
                getMenu().items = result.menu;
            else
                setMenu(result.menu);
            renderTable(getMenu().items);
            renderTablePages(getMenu().settings.pages);
        }
    });
}
// // Event delegation for delete button click
// document.addEventListener('click', function (event) {
//   if (event.target.classList.contains('delete-btn')) {
//     var index = event.target.getAttribute('data-index');
//     event.preventDefault();
//     deleteItem(index, tableData);
//   }
// });
function remainderScroll(index) {
    const tableBody = document.querySelector('tbody');
    const tableContainer = document.querySelector('.table-container');
    // After refreshing the table, scroll to the appropriate position
    const updatedRows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.children;
    if (updatedRows) {
        const targetRow = updatedRows[Math.min(index, updatedRows.length - 1)]; // Get the target row
        if (targetRow) {
            const rect = targetRow.getBoundingClientRect();
            const scrollTop = rect.top + window.pageYOffset - (tableContainer === null || tableContainer === void 0 ? void 0 : tableContainer.offsetTop);
            if (tableContainer)
                tableContainer.scrollTop = scrollTop;
        }
    }
}
// #### delete-selected
const deleteSelectedButton = document.getElementById('delete-selected');
const deleteSelectedButtonPages = document.getElementById('delete-selected-pages');
deleteSelectedButtonPages === null || deleteSelectedButtonPages === void 0 ? void 0 : deleteSelectedButtonPages.addEventListener('click', () => {
    deleteRowsSelected('#pages tbody input[type="checkbox"]');
});
deleteSelectedButton === null || deleteSelectedButton === void 0 ? void 0 : deleteSelectedButton.addEventListener('click', () => {
    deleteRowsSelected('#data tbody input[type="checkbox"]');
});
// #### delete-selected
// #### set-category-selected
const setCagtegorySelectedButton = document.getElementById('set-category-selected');
setCagtegorySelectedButton === null || setCagtegorySelectedButton === void 0 ? void 0 : setCagtegorySelectedButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#data tbody input[type="checkbox"]');
    // Iterate through checkboxes and find selected rows
    checkboxes.forEach((checkbox, index) => {
        if (checkboxes[index].checked) {
            getMenu().items[index].category = category === null || category === void 0 ? void 0 : category.value;
        }
    });
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
        renderTable(getMenu().items);
    });
});
// #### set-category-selected
// #### disable page
var url = document.getElementById("url");
const disablePage = document.getElementById('disable-page');
disablePage === null || disablePage === void 0 ? void 0 : disablePage.addEventListener('click', () => {
    // debugger;
    const checkboxes = document.querySelectorAll('#data tbody input[type="checkbox"]');
    // Iterate through checkboxes and find selected rows
    checkboxes.forEach((checkbox, index) => {
        if (checkboxes[index].checked) {
            getMenu().settings.pages.push({ host: getHost(url.value), date: (new Date()).toISOString() });
        }
    });
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
        renderTablePages(getMenu().settings.pages);
    });
});
// Add event listener to the "Save" button
var saveButton = document.querySelector('save');
if (saveButton)
    saveButton.addEventListener('click', saveData);
function deleteRowsSelected(tableSelected) {
    const checkboxes = document.querySelectorAll(tableSelected);
    // const selectedRows = [];
    // Iterate through checkboxes and find selected rows
    checkboxes.forEach((checkbox, index) => {
        const reverseIndex = checkboxes.length - index - 1;
        if (checkboxes[reverseIndex].checked) {
            getMenu().items.splice(reverseIndex, 1); // Remove the item from the array
        }
    });
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
        console.log('Items deleted successfully!');
        renderTable(getMenu().items);
        // remainderScroll(index);
    });
}
// Function to save the updated data
function saveData(event) {
    event.preventDefault();
    var categorySelect = document.getElementById("category");
    var textInput = document.getElementById('text');
    var nameInput = document.getElementById('name');
    var categoryValue = categorySelect.value;
    var textValue = textInput.value;
    var nameValue = nameInput.value;
    // Perform the necessary updating logic
    currentData.category = categoryValue;
    currentData.text = textValue;
    currentData.name = nameValue;
    // Update the row in the table
    var checkCell = currentRow.cells[0];
    var categoryCell = currentRow.cells[1];
    var nameCell = currentRow.cells[2];
    var textCell = currentRow.cells[3];
    checkCell.innerHTML = "<input type='checkbox'>";
    categoryCell.innerHTML = currentData.category;
    nameCell.innerHTML = currentData.name;
    textCell.innerHTML = currentData.text;
    // Update the value in the tableData array
    getMenu().items[currentDataIndex] = currentData;
    // Perform the necessary saving logic using chrome.storage.local.set()
    chrome.storage.local.set({ 'menu': getMenu() }, function () {
        // console.log('Data saved successfully!');
        // renderTable(tableData);
        // remainderScroll(currentDataIndex);
    });
}
// Export button click event
var exportButton = document.getElementById('exportButton');
if (exportButton)
    exportButton.addEventListener('click', exportData);
// Import button click event
var importButton = document.getElementById('importButton');
if (importButton)
    importButton.addEventListener('click', importData);
if (category)
    category.addEventListener("input", function () {
        var query = category.value;
        var matches = getSuggestions(query);
        if (setCagtegorySelectedButton)
            setCagtegorySelectedButton.textContent = "Set Category '{text}' Items Selected".replace('{text}', query);
        displaySuggestions(matches);
    });
//# sourceMappingURL=index.settings.js.map