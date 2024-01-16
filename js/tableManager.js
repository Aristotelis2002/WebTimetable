document.addEventListener('DOMContentLoaded', function() {
	const tables = [];
	
    function createTable(tableId) {
        const table = document.createElement('table');
        table.id = tableId;

        // Create the header row
		// TODO RENAME ALL
        const headerRow = document.createElement("tr");
		
        const id = document.createElement("th");
        id.textContent = 'id';
		const time = document.createElement("th");
        time.textContent = 'Час';
		const fn = document.createElement("th");
        fn.textContent = 'фн';
		const group = document.createElement("th");
        group.textContent = 'Група';
		const name = document.createElement("th");
        name.textContent = 'Име Фамилия';
		const themeNumber = document.createElement("th");
        themeNumber.textContent = 'Номер на тема';
		const theme = document.createElement("th");
        theme.textContent = 'Тема';
		const interest = document.createElement("th");
        interest.textContent = 'Интерес';

        headerRow.appendChild(id);
		headerRow.appendChild(time);
		headerRow.appendChild(fn);
		headerRow.appendChild(group);
		headerRow.appendChild(name);
		headerRow.appendChild(themeNumber);
		headerRow.appendChild(theme);
		headerRow.appendChild(interest);
		
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
		
		const id = document.createElement("td");
		id.textContent = "New Cell 1";
		
		const time = document.createElement("td");
		time.textContent = "New Cell 2";
		
		const fn = document.createElement("td");
		fn.textContent = "New Cell 3";
		
		const group = document.createElement("td");
		group.textContent = "New Cell 4";
		
		const name = document.createElement("td");
		name.textContent = "New Cell 1";
		
		const themeNumber = document.createElement("td");
		themeNumber.textContent = "New Cell 2";
		
		const theme = document.createElement("td");
		theme.textContent = "New Cell 1";
		
		const interest = document.createElement("td");
		const dropdown = document.createElement("select");
		dropdown.classList.add("tableDropList");
	
		const nothing = document.createElement("option");
		nothing.value = 0;
		nothing.text = '';
		dropdown.appendChild(nothing);
		const must = document.createElement("option");
		must.value = 1;
		must.text = 'Трябва да отида';
		dropdown.appendChild(must);
		const think = document.createElement("option");
		think.value = 2;
		think.text = 'Мисля да отида';
		dropdown.appendChild(think);
		const interesting = document.createElement("option");
		interesting.value = 3;
		interesting.text = 'Интересно ми е';
		dropdown.appendChild(interesting);
		const might = document.createElement("option");
		might.value = 4;
		might.text = 'Може да е интересно';
		dropdown.appendChild(might);
	
		interest.appendChild(dropdown);
		
		// Append cells to the new row
		newRow.appendChild(id);
		newRow.appendChild(time);
		newRow.appendChild(fn);
		newRow.appendChild(group);
		newRow.appendChild(name);
		newRow.appendChild(themeNumber);
		newRow.appendChild(theme);
		newRow.appendChild(interest);
		
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
	
	function clearDropdownValues() {
	for(let i = 0; i < tables.length; i++) {
		const table = document.getElementById(tables[i]);
	
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
				dropdown.value = 0;
			}
	}
	
	}

	window.tables = tables;
	window.createTable = createTable;
	window.addRow = addRow;
	window.removeTable = removeTable;
	window.clearDropdownValues = clearDropdownValues;
});