var tableData

chrome.storage.local.get('menu', function(result) {
    tableData = result.menu;
    if (tableData && tableData.length > 0) {
      var table = document.getElementById('myTable');

      for (var i = 0; i < tableData.length; i++) {
        var row = table.insertRow(-1);
      
        var categoryCell = row.insertCell(0);
        var textCell = row.insertCell(1);
        var dateCell = row.insertCell(2);
        
        categoryCell.innerHTML = tableData[i].category;
        textCell.innerHTML = tableData[i].text==undefined?tableData[i].title:tableData[i].text;
        dateCell.innerHTML = tableData[i].date;

        // Add click event listener to each row
        row.addEventListener('click', createRowClickListener(tableData[i], i));
      }
    }
  });

  // Variables to store the current row and data
var currentRow;
var currentData;
var currentDataIndex;

// Function to create a click event listener for a row
function createRowClickListener(rowData, index) {
  return function() {
    // Set the values in the HTML form
    var categorySelect = document.querySelector('.category select');
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
  var categorySelect = document.querySelector('.category select');
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
  chrome.storage.local.set({ menu: tableData }, function() {
    console.log('Data saved successfully!');
  });
}