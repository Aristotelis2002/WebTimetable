document.addEventListener('DOMContentLoaded', function() {
	const tables = [];
	
    function createTable(tableId) {
        const table = document.createElement('table');
        table.id = tableId;

        // Create the header row
		// TODO RENAME ALL
        const headerRow = document.createElement("tr");
		
        const headerCell1 = document.createElement("th");
        headerCell1.textContent = 'id';
		const headerCell2 = document.createElement("th");
        headerCell2.textContent = 'Час';
		const headerCell3 = document.createElement("th");
        headerCell3.textContent = 'фн';
		const headerCell4 = document.createElement("th");
        headerCell4.textContent = 'Група';
		const headerCell5 = document.createElement("th");
        headerCell5.textContent = 'Име Фамилия';
		const headerCell6 = document.createElement("th");
        headerCell6.textContent = 'Номер на тема';
		const headerCell7 = document.createElement("th");
        headerCell7.textContent = 'Тема';
		const headerCell8 = document.createElement("th");
        headerCell8.textContent = 'Интерес';

        headerRow.appendChild(headerCell1);
		headerRow.appendChild(headerCell2);
		headerRow.appendChild(headerCell3);
		headerRow.appendChild(headerCell4);
		headerRow.appendChild(headerCell5);
		headerRow.appendChild(headerCell6);
		headerRow.appendChild(headerCell7);
		headerRow.appendChild(headerCell8);
		
		table.appendChild(headerRow);
	
        document.getElementById("tables").appendChild(table);
		tables.push(tableId);
	 }
	 
	function addRow(tableID) {
		const table = document.getElementById(tableID);
		
		if (!table) {
			console.error(`Table with ID ${tableID} not found.`);
			return;
		}
		// Ще се променят имената и параметрите на функцията според това какво е удобно за подаване
		const newRow = document.createElement("tr");
		
		const cell1 = document.createElement("td");
		cell1.textContent = "New Cell 1";
		
		const cell2 = document.createElement("td");
		cell2.textContent = "New Cell 2";
		
		const cell3 = document.createElement("td");
		cell3.textContent = "New Cell 3";
		
		const cell4 = document.createElement("td");
		cell4.textContent = "New Cell 4";
		
		const cell5 = document.createElement("td");
		cell5.textContent = "New Cell 1";
		
		const cell6 = document.createElement("td");
		cell6.textContent = "New Cell 2";
		
		const cell7 = document.createElement("td");
		cell7.textContent = "New Cell 1";
		
		const cell8 = document.createElement("td");
		const dropdown = document.createElement("select");
		dropdown.classList.add("tableDropList");
	
		// Add three options to the dropdown
		for (let i = 1; i <= 3; i++) {
			const option = document.createElement("option");
			option.value = 1;
			option.text = 'opcii';
			dropdown.appendChild(option);
		}
	
		// Append the dropdown to cell2
		cell8.appendChild(dropdown);
		
		// Append cells to the new row
		newRow.appendChild(cell1);
		newRow.appendChild(cell2);
		newRow.appendChild(cell3);
		newRow.appendChild(cell4);
		newRow.appendChild(cell5);
		newRow.appendChild(cell6);
		newRow.appendChild(cell7);
		newRow.appendChild(cell8);
		
		// Append the new row to the table
		table.appendChild(newRow);
	} 
	
	function removeTable(tableId) {
		const tableToRemove = document.getElementById(tableId);
		
		if (tableToRemove) {
			const parentElement = tableToRemove.parentNode;
			parentElement.removeChild(tableToRemove);
		
			const index = tableIds.indexOf(tableId);
			if (index !== -1) {
				tableIds.splice(index, 1);
			}
		} else {
			console.warn(`Table with ID ${tableId} not found.`);
		}
	}
	
	function getDropdownValues(tableID) {
	// Find the table element by ID
	const table = document.getElementById(tableID);
	
	if (!table) {
		console.error(`Table with ID ${tableID} not found.`);
		return;
	}
	
	// Iterate through rows in the table
	for (let i = 1; i < table.rows.length; i++) {
			const row = table.rows[i];
			// Get the second cell (index 1) which contains the dropdown
			const dropdownCell = row.cells[7];
		
			// Check if the cell contains a dropdown with the specified class
			const dropdown = dropdownCell.querySelector('.tableDropList');
			// Retrieve the selected value of the dropdown
			const selectedValue = dropdown.value;
			
			//DO SOMETHING SWITCH ON VALUE
	    }
	}

	window.tables = tables;
	window.createTable = createTable;
	window.addRow = addRow;
	window.removeTable = removeTable;
});