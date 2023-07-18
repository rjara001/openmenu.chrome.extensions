
function renderTablePages(tableData) {
    if (tableData && tableData.length > 0) {
        var table = document.querySelector('#pages tbody');
        table.innerHTML = '';

        if (table)
            for (var i = 0; i < tableData.length; i++) {
                var row = table.insertRow(-1);

                var checkCell = row.insertCell(0);
                var hostCell = row.insertCell(1);
                var DateCell = row.insertCell(2);
                var deleteCell = row.insertCell(3); // New cell for delete button

                checkCell.innerHTML = "<input type='checkbox'>";
                hostCell.innerHTML = tableData[i].host;
                DateCell.innerHTML = tableData[i].date;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.setAttribute('data-index', i);
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    // Add your logic for the onclick event here
                    const index = parseInt(this.getAttribute('data-index'));
                    deleteItem(index, tableData);
                });

                deleteCell.appendChild(deleteButton);

            }
    }
}

function renderTable(tableData) {
    if (tableData && tableData.length > 0) {
        var table = document.querySelector('#data tbody');
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
                var xpathCell = row.insertCell(7);
                var deleteCell = row.insertCell(8); // New cell for delete button

                checkCell.innerHTML = "<input type='checkbox'>";
                nameCell.innerHTML = tableData[i].name === undefined ? '-' : tableData[i].name;
                categoryCell.innerHTML = tableData[i].category === undefined ? '-' : tableData[i].category;
                textCell.innerHTML = tableData[i].text == undefined ? tableData[i].title : tableData[i].text;
                dateCell.innerHTML = tableData[i].date;
                originCell.innerHTML = tableData[i].page;
                positionCell.innerHTML = tableData[i].position;
                xpathCell.innerHTML = tableData[i].xpath;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.setAttribute('data-index', i);
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    // Add your logic for the onclick event here
                    const index = parseInt(this.getAttribute('data-index'));
                    deleteItem(index, tableData);
                });

                deleteCell.appendChild(deleteButton);

                // Add click event listener to each row
                row.addEventListener('click', createRowDataClickListener(tableData[i], i));
            }
    }
}

// Function to create a click event listener for a row
function createRowDataClickListener(rowData, index) {
    return function () {
        // Set the values in the HTML form
        var categorySelect = document.getElementById("category");
        var textInput = document.getElementById('text');
        var nameInput = document.getElementById('name');
        var urlInput = document.getElementById('url');

        categorySelect.value = rowData.category;
        textInput.value = rowData.text == undefined ? rowData.title : rowData.text;
        nameInput.value = rowData.name === undefined ? '' : rowData.name;
        urlInput.value = rowData.page;

        // Store the current row and data
        currentRow = this;
        currentData = rowData;
        currentDataIndex = index;
    };
}
