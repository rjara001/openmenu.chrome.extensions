import { getMenu } from "./globals/index";
import { localUpdateValueItems } from "./store";
import { getUniqueCategories } from "./util";

const HEADERS = {
    category: 0
    , name: 1
    , text: 2
    , type: 3
    , date: 4
    , origin: 5
    , xpath: 6

}

// Function to delete an item
export function deleteItem(index: number, tableData: any) {

    if (tableData && tableData.length > 0) {
        tableData.splice(index, 1); // Remove the item from the array

        localUpdateValueItems(getMenu().items);

        // chrome.storage.local.set({ 'menu': getMenu() }, function () {
        //     console.log('Item deleted successfully!');
        //     renderTable(tableData);
        // });
    }
}

export function getHost(url: string) {
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
        var csvContent = 'Category,Text,Date,Type,Xpath\n';

        for (var i = 0; i < tableData.length; i++) {
            var row = tableData[i];
            var csvRow = `${row.category},${row.text || row.title},${row.date},${row.type},${row.xpath}\n`;
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
                var csvData = event?.target?.result as string;
                var menuData = parseCSV(csvData);

                localUpdateValueItems(menuData);
                location.reload();
                // chrome.storage.local.set({ 'menu': getMenu() }, function () {
                //     console.log('Data imported successfully!');
                //     location.reload();
                // });
            };
            reader.readAsText(file);
        }
    });
}
// Function to parse CSV data
function parseCSV(csvData: string) {
    var lines = csvData.split('\n');
    var menuData: any[] = [];

    if (lines.length > 0) {
        let headers = lines[0].split(',');

        for (let index = 0; index < headers.length; index++) {
            const element = headers[index];

            switch (element.toLocaleLowerCase()) {
                case 'category': { HEADERS.category = index; } break;
                case 'text': { HEADERS.text = index; } break;
                case 'date': { HEADERS.date = index; } break;
                case 'type': { HEADERS.type = index; } break;
                case 'xpath': { HEADERS.xpath = index; } break;
            }
        }

    }

    for (var i = 1; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line) {
            var values = line.split(',');
            var category = values[HEADERS.category]?.trim();
            var text = values[HEADERS.text]?.trim();
            var date = values[HEADERS.date]?.trim();
            var type = values[HEADERS.type]?.trim();
            var xpath = values[HEADERS.xpath]?.trim();
            var item = {
                category: category,
                text: text,
                date: date,
                type: type,
                xpath: xpath
            };
            menuData.push(item);
        }
    }

    return menuData;
}


export function getSuggestions(query: string) {
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

export function displaySuggestions(matches: any[]) {
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

