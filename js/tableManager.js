document.addEventListener('DOMContentLoaded', function() {
	const tables = [];
	const scheduleButton = document.getElementById('scheduleButton');
	const fileInput = document.getElementById('fileInput');
	const tableSelect = document.getElementById('tableSelect');
		
	function scheduleButtonHandler() {
		if (sessionStorage.getItem('adminStatus') == 'true') {
			fileInput.click();
		} else {
			
		}
	}
	
	if (fileInput) {
		fileInput.addEventListener('change', handleFile);
	}
	
	if (scheduleButton) {
		scheduleButton.addEventListener('click', scheduleButtonHandler);
	}
	
	if (tableSelect) {
		tableSelect.addEventListener('change',  function() {
			
		if (tableSelect.value == "all") {
			for(let i = 0; i < tables.length; i++) {
				var table = document.getElementById(tables[i]).style.display = "";
			}
		} else {
			for(let i = 0; i < tables.length; i++) {
				if (tableSelect.value == tables[i]) {
					var table = document.getElementById(tables[i]).style.display = "";
				} else {
					var table = document.getElementById(tables[i]).style.display = "none";
				}
			}
		}
		});
	}
	
	function loadTables(dictionary) {
		while (tables.length > 0) {
			removeTable(tables[0]);
		}
		
		for (var key in dictionary) {
			if (dictionary.hasOwnProperty(key)) {
				var tableId = "table" + key;
				// console.log(tableId);
				
				createTable(tableId);
				
				for(let i = 0; i < dictionary[key].length; i++) {
					addRow(tableId, dictionary[key][i]);
				}
			}
		}
		updateView();
	}
	
    function createTable(tableId) {
        const table = document.createElement('table');
        table.id = tableId;

        // Create the header row
        const headerRow = document.createElement("tr");
		
        const id = document.createElement("th");
        id.textContent = 'id';
		const time = document.createElement("th");
        time.textContent = 'Час';
		const fn = document.createElement("th");
        fn.textContent = "Ден " + (tables.length + 1) + " - " + tableId.substring(5);
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
		
		var selectElement = document.getElementById('tableSelect');
		var optionElement = document.createElement('option');
        optionElement.value = tableId; // Adjust the value as needed
        optionElement.textContent = fn.textContent;
        selectElement.appendChild(optionElement);
	 }
	
	// TODO when parsing rdy change addRow
	
	function addRow(tableID, row) {
		const table = document.getElementById(tableID);
		
		if (!table) {
			console.error(`Table with ID ${tableID} not found.`);
			return;
		}
		// Ще се променят имената и параметрите на функцията според това какво е удобно за подаване
		const newRow = document.createElement("tr");
		
		const id = document.createElement("td");
		id.textContent = row[0];
		
		const time = document.createElement("td");
		time.textContent = row[1];
		
		const fn = document.createElement("td");
		fn.textContent = row[2];
		
		const group = document.createElement("td");
		group.textContent = row[3];
		
		const name = document.createElement("td");
		name.textContent = row[4];
		
		const themeNumber = document.createElement("td");
		themeNumber.textContent = row[5];
		
		const theme = document.createElement("td");
		theme.textContent = row[6];
		
		const interest = document.createElement("td");
		
		if (fn.textContent != '') {
			
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
		}
		
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
		
			const index = tables.indexOf(tableId);
			if (index !== -1) {
				var selectElement = document.getElementById('tableSelect');

				for (var i = 0; i < selectElement.options.length; i++) {
					if (selectElement.options[i].value === tables[index].substring(5)) {
						selectElement.remove(i);
						break;
					}
				}
				
				tables.splice(index, 1);
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
	
	// Можеш да преместиш където искаш тези функции които съм дефинирал 
	async function getPresentationIdByFN(fn) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('get_presentation_id')}&fn=${encodeURIComponent(fn)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error or id field
			if (data.error == null) {
				// getId successful
				console.log(data.id);
				return data.id;
			} else {
				// getId failed
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}

	async function getIdByUsername(username) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('get_user_id')}&username=${encodeURIComponent(username)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error or userId field
			if (data.error == null) {
				// getId successful
				console.log(data.userId);
				return data.userId;
			} else {
				// getId failed
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	
	async function addInterestToDB(currentUserId, presentationId, interestString) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('add_interest')}&userId=${encodeURIComponent(currentUserId)}&presentationId=${encodeURIComponent(presentationId)}&interestString=${encodeURIComponent(interestString)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error, message, adminStatus
			if (data.error == null) {
				// interest insert succesful
			} else {
				// interest insert failed
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	// Край на функциите които съм дефинирал

	// Тука ще дефинирам последните две функции които споменах в масангера
	async function getAllInterests() {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('get_all_interests')}`,
			});
	
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
	
			const data = await response.json(); 
			if (data.error == null) {
				// getting data from JSON response
				let parsedData = JSON.parse(data);
				console.log(parsedData);
				// loadTables(parsedData);
			} else {
				// normalno e da vurne erro pri prazna tablica.
				alert(data.error ); //vmesto tozi alert нещо друго
				
				// TODO
				// Зари, смени този алерт с каквото искаш
			}
	
		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	// getAllInterests();
	async function getPresntationInfoById (presentationId) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('get_presentation_by_id')}&presentationId=${encodeURIComponent(presentationId)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error or id field
			if (data.error == null) {
				// getPresentation successful
				console.log(data);
				return data;
			} else {
				// getPresentation failed
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}

	}
	// getPresntationInfoById(33);
	// Край на дефинициите
	var selects = document.querySelectorAll('.tableDropList');

    selects.forEach(function(select) {
      select.addEventListener('change', function() {
        //send to db
		// var presenetationId = getPresentationIdByFN(fn) //ne znam kak da vzema fn ot tablicata
		// var currentUserId = getIdByUsername(sessionStorage.getItem('username')); //moje bi proverka za !=''
		// addInterestToDB(currentUserId, presentationId, "Трябва да отида"); // не знам как да взема интерес текста от таблицата
      });
    });
	
	window.tables = tables;
	window.createTable = createTable;
	window.addRow = addRow;
	window.removeTable = removeTable;
	window.clearDropdownValues = clearDropdownValues;
	window.loadTables = loadTables;
});