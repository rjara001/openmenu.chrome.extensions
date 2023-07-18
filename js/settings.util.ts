import { getMenu } from "../globals/index.js";
import { getUniqueCategories } from "../html/util.html.js";
import { renderTable } from "./tables.js";

// Function to delete an item
export function deleteItem(index, tableData) {

    if (tableData && tableData.length > 0) {
        tableData.splice(index, 1); // Remove the item from the array

        chrome.storage.local.set({ 'menu': getMenu() }, function () {
            console.log('Item deleted successfully!');
            renderTable(tableData);

            // remainderScroll(index);
            // location.reload();
        });
    }
}

export function getHost(url) {
    if (url) {
        const parsedURL = new URL(url);
        return parsedURL.host;
    }
    return false;
}
// Function to export the data
export function exportData() {
    var tableData = getMenu().items;
    if (tableData && tableData.length > 0) {
        var csvContent = 'Category,Text,Date,Position,Xpath\n';

        for (var i = 0; i < tableData.length; i++) {
            var row = tableData[i];
            var csvRow = `${row.category},${row.text || row.title},${row.date},${row.position},${row.xpath}\n`;
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
}

// Function to import the data
export function importData() {
    var inputElement = document.getElementById('importInput') as HTMLInputElement;
    inputElement.click();

    inputElement.addEventListener('change', function () {
        if (inputElement?.files) {
            var file = inputElement?.files[0];
            var reader = new FileReader();

            reader.onload = function (event) {
                var csvData = event?.target?.result;
                var menuData = parseCSV(csvData);

                chrome.storage.local.set({ 'menu': getMenu() }, function () {
                    console.log('Data imported successfully!');
                    location.reload();
                });
            };
            reader.readAsText(file);
        }
    });
}
// Function to parse CSV data
function parseCSV(csvData) {
    var lines = csvData.split('\n');
    var menuData: any[] = [];

    for (var i = 1; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line) {
            var values = line.split(',');
            var category = values[0].trim();
            var text = values[1].trim();
            var date = values[2].trim();
            var position = values[3].trim();
            var xpath = values[4].trim();
            var item = {
                category: category,
                text: text,
                date: date,
                position: position,
                xpath: xpath
            };
            menuData.push(item);
        }
    }

    return menuData;
}


export function getSuggestions(query) {
    var matches: any[] = [];
    const suggestions = getUniqueCategories(getMenu().items);
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

export function displaySuggestions(matches) {
    var suggestionsList = document.getElementById("suggestionsList");
    if (suggestionsList) {
        suggestionsList.innerHTML = ""; // Clear previous suggestions
        suggestionsList.style.display = 'block';

        for (var i = 0; i < matches.length; i++) {
            var suggestion = matches[i];
            var listItem = document.createElement("li");
            listItem.innerText = suggestion;
            listItem.addEventListener("click", function () {
                // category.value = this.innerText;
                if (suggestionsList) {
                    suggestionsList.innerHTML = ""; // Hide suggestions
                    suggestionsList.style.display = 'none';
                }
            });
            suggestionsList.appendChild(listItem);
        }
    }
}

