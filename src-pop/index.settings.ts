import { getMenu, setActiveAutoSave, setActiveMenu, setMenu } from "./globals/index";
import { displaySuggestions, exportData, getHost, getSuggestions, importData } from "./settings.util";
import { renderTable, renderTablePages } from "./tables";

// Variables to store the current row and data
let currentRow: any;
let currentData: any;
let currentDataIndex: any;

var category = document.getElementById("category") as HTMLInputElement;


const switchToTab = (tabId: string) => {
  // Remove 'active' class from all buttons and hide all tab contents
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => btn.classList.remove('active'));
  tabContents.forEach((content: any) => (content.style.display = 'none'));

  // Add 'active' class to the clicked button and display the corresponding tab content
  const button = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  button?.classList.add('active');

  if (tabId) {
    let elem = document.getElementById(tabId);

    if (elem !== null && elem !== undefined) {
      elem.style.display = 'block';
    }
  }
}

$(document).ready(() => {
  if (chrome.storage) {
    chrome.storage.local.get('menu', function (result) {
      setMenu(result.menu);

      if (getMenu().settings.activeMenu === undefined)
        setActiveMenu(true);
      if (getMenu().settings.activeAutoSave === undefined)
        setActiveAutoSave(true);


      const urlParams = new URLSearchParams(window.location.search);
      const fromUrl = urlParams.get('from');

      if (fromUrl) {
        switchToTab('tab2');

        const host = getHost(fromUrl);
        // Check if already disabled
        const isAlreadyDisabled = getMenu().settings.pages.some((p: any) => p.host === host);

        if (!isAlreadyDisabled) {
          const confirmDiv = document.createElement('div');
          confirmDiv.innerHTML = `
                        <div style="background: #e3f2fd; padding: 15px; margin-bottom: 20px; border-radius: 4px; border: 1px solid #90caf9;">
                            <p style="margin-top: 0; margin-bottom: 15px;">Do you want to disable the popup in this page <strong>${host}</strong>?</p>
                            <button id="confirm-disable-yes" style="background: #2196f3; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Yes, disable</button>
                            <button id="confirm-disable-no" style="background: white; border: 1px solid #ccc; padding: 8px 16px; border-radius: 4px; cursor: pointer;">No</button>
                        </div>
                    `;

          const tab2Content = document.getElementById('tab2');
          tab2Content?.insertBefore(confirmDiv, tab2Content.firstChild);

          document.getElementById('confirm-disable-yes')?.addEventListener('click', () => {
            getMenu().settings.pages.push({ host: host, date: (new Date()).toISOString() });
            chrome.storage.local.set({ 'menu': getMenu() }, function () {
              renderTablePages(getMenu().settings.pages);
              confirmDiv.remove();
            });
          });

          document.getElementById('confirm-disable-no')?.addEventListener('click', () => {
            confirmDiv.remove();
          });
        }
      }


      var activeMenuInput = document.getElementById('menu-active') as HTMLInputElement;
      if (activeMenuInput) {
        activeMenuInput.checked = getMenu().settings.activeMenu;
        activeMenuInput.addEventListener('change', (e: any) => {
          setActiveMenu(e.target.checked);
        });

        var activeSaveInput = document.getElementById('auto-save') as HTMLInputElement;
        activeSaveInput.checked = getMenu().settings.activeAutoSave;
        activeSaveInput.addEventListener('change', (e: any) => {
          setActiveAutoSave(e.target.checked);
        });

        renderTable(getMenu().items);
        renderTablePages(getMenu().settings.pages);
      }

    });

  }
});


// #### delete-selected
const deleteSelectedButton = document.getElementById('delete-selected');
const deleteSelectedButtonPages = document.getElementById('delete-selected-pages');

deleteSelectedButtonPages?.addEventListener('click', () => {
  deleteRowsSelected('#pages tbody input[type="checkbox"]', getMenu().settings.pages);
});

deleteSelectedButton?.addEventListener('click', () => {
  deleteRowsSelected('#data tbody input[type="checkbox"]', getMenu().items);
});

// #### delete-selected

// #### set-category-selected
const setCagtegorySelectedButton = document.getElementById('set-category-selected');

setCagtegorySelectedButton?.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('#data tbody input[type="checkbox"]');

  // Iterate through checkboxes and find selected rows
  checkboxes.forEach((checkbox, index) => {

    if (checkboxes[index].checked) {
      getMenu().items[index].category = category?.value;
    }
  });

  chrome.storage.local.set({ 'menu': getMenu() }, function () {

    renderTable(getMenu().items);
  });

});

// #### set-category-selected

// #### disable page

var url = document.getElementById("url") as HTMLInputElement;

const disablePage = document.getElementById('disable-page');

disablePage?.addEventListener('click', () => {
  // debugger;
  const checkboxes = document.querySelectorAll<HTMLInputElement>('#data tbody input[type="checkbox"]');

  // Iterate through checkboxes and find selected rows
  checkboxes.forEach((checkbox, index) => {

    if (checkboxes[index].checked) {
      getMenu().settings.pages.push({ host: getHost(url.value), date: (new Date()).toISOString() })
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

function deleteRowsSelected(tableSelected: string, list: any[]) {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(tableSelected);

  // const selectedRows = [];
  // Iterate through checkboxes and find selected rows
  checkboxes.forEach((checkbox, index) => {
    const reverseIndex = checkboxes.length - index - 1;
    if (checkboxes[reverseIndex].checked) {
      list.splice(reverseIndex, 1); // Remove the item from the array
    }
  });

  chrome.storage.local.set({ 'menu': getMenu() }, function () {
    console.log('Items deleted successfully!');
    renderTable(getMenu().items);

    // remainderScroll(index);
  });
}

// Function to save the updated data
function saveData(event: any) {
  event.preventDefault();

  var categorySelect = document.getElementById("category") as HTMLInputElement;
  var textInput = document.getElementById('text') as HTMLInputElement;
  var nameInput = document.getElementById('name') as HTMLInputElement;

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

import { _MENU_DEFAULT } from "./constants";


if (category)
  category.addEventListener("input", function () {
    var query = category.value;

    var matches = getSuggestions(query);

    if (setCagtegorySelectedButton)
      setCagtegorySelectedButton.textContent = "Set Category '{text}' Items Selected".replace('{text}', query);
    displaySuggestions(matches, category);
  });

