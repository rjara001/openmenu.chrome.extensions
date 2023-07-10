var tableData

if (chrome.storage)
  chrome.storage.local.get('menu', function (result) {
    tableData = result.menu;
    renderTable(tableData);
  });

// Variables to store the current row and data
var currentRow;
var currentData;
var currentDataIndex;

// Event delegation for delete button click
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    var index = event.target.getAttribute('data-index');
    event.preventDefault();
    deleteItem(index);
  }
});

function renderTable(tableData) {
  if (tableData && tableData.length > 0) {
    var table = document.querySelector('tbody');
    table.innerHTML = '';

    if (table)
      for (var i = 0; i < tableData.length; i++) {
        var row = table.insertRow(-1);

        var checkCell = row.insertCell(0);
        var categoryCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var textCell = row.insertCell(3);
        var dateCell = row.insertCell(4);
        var originCell = row.insertCell(5);
        var positionCell = row.insertCell(6);
        var deleteCell = row.insertCell(7); // New cell for delete button

        checkCell.innerHTML = "<input type='checkbox'>";
        nameCell.innerHTML = tableData[i].name === undefined ? '-' : tableData[i].name;
        categoryCell.innerHTML = tableData[i].category === undefined ? '-' : tableData[i].category;
        textCell.innerHTML = tableData[i].text == undefined ? tableData[i].title : tableData[i].text;
        dateCell.innerHTML = tableData[i].date;
        originCell.innerHTML = tableData[i].page;
        positionCell.innerHTML = tableData[i].position;
        deleteCell.innerHTML = '<button class="delete-btn" data-index="' + i + '">Delete</button>'; // Delete button with onclick event


        // Add click event listener to each row
        row.addEventListener('click', createRowClickListener(tableData[i], i));
      }
  }
}

// Function to delete an item
function deleteItem(index) {


  if (tableData && tableData.length > 0) {
    tableData.splice(index, 1); // Remove the item from the array

    chrome.storage.local.set({ menu: tableData }, function () {
      console.log('Item deleted successfully!');
      renderTable(tableData);

      remainderScroll(index);
      // location.reload();
    });
  }
}

function remainderScroll(index) {
  const tableBody = document.querySelector('tbody');
  const tableContainer = document.querySelector('.table-container');

  // After refreshing the table, scroll to the appropriate position
  const updatedRows = tableBody.children;
  const targetRow = updatedRows[Math.min(index, updatedRows.length - 1)]; // Get the target row

  if (targetRow) {
    const rect = targetRow.getBoundingClientRect();
    const scrollTop = rect.top + window.pageYOffset - tableContainer.offsetTop;
    tableContainer.scrollTop = scrollTop;
  }
}

// Function to create a click event listener for a row
function createRowClickListener(rowData, index) {
  return function () {
    // Set the values in the HTML form
    var categorySelect = document.getElementById("category");
    var textInput = document.getElementById('text');
    var nameInput = document.getElementById('name');

    categorySelect.value = rowData.category;
    textInput.value = rowData.text == undefined ? rowData.title : rowData.text;
    nameInput.value = rowData.name === undefined ? '' : rowData.name;

    // Store the current row and data
    currentRow = this;
    currentData = rowData;
    currentDataIndex = index;
  };
}

// #### delete-selected
const deleteSelectedButton = document.getElementById('delete-selected');

deleteSelectedButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');

  // const selectedRows = [];

  // Iterate through checkboxes and find selected rows
  checkboxes.forEach((checkbox, index) => {
    const reverseIndex = checkboxes.length - index - 1;
    if (checkboxes[reverseIndex].checked) {
      tableData.splice(reverseIndex, 1); // Remove the item from the array
    }
  });

  chrome.storage.local.set({ menu: tableData }, function () {
    console.log('Items deleted successfully!');
    renderTable(tableData);

    remainderScroll(index);
    // location.reload();
  });

});
// #### delete-selected

// #### set-category-selected
const setCagtegorySelectedButton = document.getElementById('set-category-selected');

setCagtegorySelectedButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');

  // Iterate through checkboxes and find selected rows
  checkboxes.forEach((checkbox, index) => {

    if (checkboxes[index].checked) {
      tableData[index].category = category.value;
    }
  });

  chrome.storage.local.set({ menu: tableData }, function () {

    renderTable(tableData);
  });

});

// #### set-category-selected

// Add event listener to the "Save" button
var saveButton = document.querySelector('button');
if (saveButton)
  saveButton.addEventListener('click', saveData);

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
  tableData[currentDataIndex] = currentData;

  // Perform the necessary saving logic using chrome.storage.local.set()
  chrome.storage.local.set({ menu: tableData }, function () {
    // console.log('Data saved successfully!');
    // renderTable(tableData);

    // remainderScroll(currentDataIndex);
  });
}

// Event delegation for delete button click
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    var index = event.target.getAttribute('data-index');
    deleteItem(index);
  }
});

// Export button click event
var exportButton = document.getElementById('exportButton');
if (exportButton)
  exportButton.addEventListener('click', exportData);

// Import button click event
var importButton = document.getElementById('importButton');
if (importButton)
  importButton.addEventListener('click', importData);

// Function to export the data
function exportData() {
  chrome.storage.local.get('menu', function (result) {
    var tableData = result.menu;
    if (tableData && tableData.length > 0) {
      var csvContent = 'Category,Text,Date,Position\n';

      for (var i = 0; i < tableData.length; i++) {
        var row = tableData[i];
        var csvRow = `${row.category},${row.text || row.title},${row.date},${row.position}\n`;
        csvContent += csvRow;
      }

      var blob = new Blob([csvContent], { type: 'text/csv' });
      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = 'menu_data.csv';
      a.click();

      // Clean up the object URL
      URL.revokeObjectURL(url);
    }
  });
}

// Function to import the data
function importData() {
  var inputElement = document.getElementById('importInput');
  inputElement.click();

  inputElement.addEventListener('change', function () {
    var file = inputElement.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var csvData = event.target.result;
      var menuData = parseCSV(csvData);

      chrome.storage.local.set({ menu: menuData }, function () {
        console.log('Data imported successfully!');
        location.reload();
      });
    };

    reader.readAsText(file);
  });
}

// Function to parse CSV data
function parseCSV(csvData) {
  var lines = csvData.split('\n');
  var menuData = [];

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line) {
      var values = line.split(',');
      var category = values[0].trim();
      var text = values[1].trim();
      var date = values[2].trim();
      var position = values[3].trim();
      var item = {
        category: category,
        text: text,
        date: date,
        position: position
      };
      menuData.push(item);
    }
  }

  return menuData;
}

var category = document.getElementById("category");

if (category)
  category.addEventListener("change", function () {
    var query = category.value;

    var matches = getSuggestions(query);

    setCagtegorySelectedButton.textContent = "Set Category '{text}' Items Selected".replace('{text}', query);
    displaySuggestions(matches);
  });

function getSuggestions(query) {
  var matches = [];
  const suggestions = getUniqueCategories(tableData);
  if (suggestions)
    for (var i = 0; i < suggestions.length; i++) {
      var suggestion = suggestions[i];
      if (suggestion)
        if (suggestion.toLowerCase().startsWith(query.toLowerCase())) {
          matches.push(suggestion);
        }
    }
  return matches;
}

function displaySuggestions(matches) {
  var suggestionsList = document.getElementById("suggestionsList");
  suggestionsList.innerHTML = ""; // Clear previous suggestions
  suggestionsList.style.display = 'block';

  for (var i = 0; i < matches.length; i++) {
    var suggestion = matches[i];
    var listItem = document.createElement("li");
    listItem.innerText = suggestion;
    listItem.addEventListener("click", function () {
      category.value = this.innerText;
      suggestionsList.innerHTML = ""; // Hide suggestions
      suggestionsList.style.display = 'none';
    });
    suggestionsList.appendChild(listItem);
  }
}


