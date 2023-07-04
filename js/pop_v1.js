var tableData

if (chrome.storage)
  chrome.storage.local.get('menu', function (result) {
    tableData = result.menu;
    if (tableData && tableData.length > 0) {
      var table = document.getElementById('myTable');

      if (table)
        for (var i = 0; i < tableData.length; i++) {
          var row = table.insertRow(-1);

          var categoryCell = row.insertCell(0);
          var textCell = row.insertCell(1);
          var dateCell = row.insertCell(2);
          var originCell = row.insertCell(3);
          var positionCell = row.insertCell(4);
          var deleteCell = row.insertCell(5); // New cell for delete button

          categoryCell.innerHTML = tableData[i].category;
          textCell.innerHTML = tableData[i].text == undefined ? tableData[i].title : tableData[i].text;
          dateCell.innerHTML = tableData[i].date;
          originCell.innerHTML = tableData[i].page;
          positionCell.innerHTML = tableData[i].position;
          deleteCell.innerHTML = '<button class="delete-btn" data-index="' + i + '">Delete</button>';// Delete button with onclick event

          // Add click event listener to each row
          row.addEventListener('click', createRowClickListener(tableData[i], i));
        }
    }
  });

// Variables to store the current row and data
var currentRow;
var currentData;
var currentDataIndex;

// Event delegation for delete button click
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    var index = event.target.getAttribute('data-index');
    deleteItem(index);
  }
});

// Function to delete an item
function deleteItem(index) {
  chrome.storage.local.get('menu', function (result) {
    var tableData = result.menu;
    if (tableData && tableData.length > 0) {
      tableData.splice(index, 1); // Remove the item from the array

      chrome.storage.local.set({ menu: tableData }, function () {
        console.log('Item deleted successfully!');
        location.reload();
      });
    }
  });
}

// Function to create a click event listener for a row
function createRowClickListener(rowData, index) {
  return function () {
    // Set the values in the HTML form
    var categorySelect = document.getElementById("searchInput");
    var textInput = document.querySelector('.text input');

    categorySelect.value = rowData.category;
    textInput.value = rowData.text == undefined ? rowData.title : rowData.text;

    // Store the current row and data
    currentRow = this;
    currentData = rowData;
    currentDataIndex = index;
  };
}
// Add event listener to the "Save" button
var saveButton = document.querySelector('button');
if (saveButton)
  saveButton.addEventListener('click', saveData);

// Function to save the updated data
function saveData() {
  var categorySelect = document.getElementById("searchInput");
  var textInput = document.querySelector('.text input');

  var categoryValue = categorySelect.value;
  var textValue = textInput.value;

  // Perform the necessary updating logic
  currentData.category = categoryValue;
  currentData.text = textValue;

  // Update the row in the table
  var categoryCell = currentRow.cells[0];
  var textCell = currentRow.cells[1];

  categoryCell.innerHTML = currentData.category;
  textCell.innerHTML = currentData.text;

  // Update the value in the tableData array
  tableData[currentDataIndex] = currentData;

  // Perform the necessary saving logic using chrome.storage.local.set()
  chrome.storage.local.set({ menu: tableData }, function () {
    console.log('Data saved successfully!');
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
      var csvContent = 'Category,Text,Date\n';

      for (var i = 0; i < tableData.length; i++) {
        var row = tableData[i];
        var csvRow = row.category + ',' + (row.text || row.title) + ',' + row.date + '\n';
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
      var item = {
        category: category,
        text: text,
        date: date
      };
      menuData.push(item);
    }
  }

  return menuData;
}

var searchInput = document.getElementById("searchInput");

if (searchInput)
  searchInput.addEventListener("input", function () {
    var query = searchInput.value;
    var matches = getSuggestions(query);
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
      searchInput.value = this.innerText;
      suggestionsList.innerHTML = ""; // Hide suggestions
      suggestionsList.style.display = 'none';
    });
    suggestionsList.appendChild(listItem);
  }
}


