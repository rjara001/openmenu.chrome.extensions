chrome.storage.local.get('menu', function(result) {
    var tableData = result.menu;
    if (tableData && tableData.length > 0) {
      var table = document.getElementById('myTable');

      for (var i = 0; i < tableData.length; i++) {
        var row = table.insertRow(-1);
        var categoryCell = row.insertCell(0);
        var textCell = row.insertCell(1);
        var dateCell = row.insertCell(2);
        
        categoryCell.innerHTML = tableData[i].category;
        textCell.innerHTML = tableData[i].text;
        dateCell.innerHTML = tableData[i].date;
      }
    }
  });