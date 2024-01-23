document.addEventListener('DOMContentLoaded', function () {
	function getDays(lines) {
		days = [];
		var dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

		for (let index = 0; index < lines.length; index++) {
			element = lines[index];
			if (dateRegex.test(element)) {
				days.push(element);
			}
		}
		return days;
	}

	function getIndexFirstImportantRow(lines) {
		var indexOfFirstMatch = lines.findIndex(function (str) {
			return str.startsWith("1,");
		});
		return indexOfFirstMatch;
	}

	function getIndexOfIDs(line) {
		var timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		ids = [];

		for (let index = 0; index < line.length; index++) {
			element = line[index];
			if (timeRegex.test(element)) {
				ids.push(index - 1);
			}
		}
		return ids;
	}

	function getAllObjectsFromRow(currentLine, indexesOfIds) {
		Objects = [];
		for (let i = 0; i < indexesOfIds.length - 1; i++) {
			currentObject = [];
			for (let j = indexesOfIds[i]; j < indexesOfIds[i + 1]; j++) {
				currentObject.push(currentLine[j]);
			}
			Objects.push(currentObject);
		}
		currentObject2 = [];
		for (let index = indexesOfIds[indexesOfIds.length - 1]; index < currentLine.length; index++) {
			currentObject2.push(currentLine[index]);
		}
		Objects.push(currentObject2);
		return Objects;
	}

	var csvDataArray = [];

	function parseCSV(csv) {
		var lines = csv.split("\n");
		startOfImportantRows = getIndexFirstImportantRow(lines)
		days = getDays(lines);
		dictionary = {};
		days.forEach(function (element) {
			dictionary[element] = [];
		});

		for (var i = startOfImportantRows; i < lines.length; i++) {
			var currentLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
			var indexesOfPresentationIDs = getIndexOfIDs(currentLine);
			if (indexesOfPresentationIDs.length > 0) {
				var presentationsObjects = getAllObjectsFromRow(currentLine, indexesOfPresentationIDs);
				for (let j = 0; j < days.length; j++) {
					dictionary[days[j]].push(presentationsObjects[j]);
				}
			}
		}
		return dictionary;
	}
	async function dropOldDataFromBase() {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('drop_presentations')}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has message
			if (data.error == null) {
			} else {
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}

	async function dropInterestsFromBase() {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('drop_interests')}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has message
			if (data.error == null) {
			} else {
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	async function addPresentationsToBase(presentations) {
		var jsonData = JSON.stringify(presentations);
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('presentations')}&data=${encodeURIComponent(jsonData)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has 
			if (data.error == null) {
				// adding to DB successful
			} else {
				console.log("The error message is " + data.error);
				// TODO
				// We should implement some logic for the frontend here
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}

	function handleFile() {
		var fileInput = document.getElementById('fileInput');
		if (fileInput.files.length > 0) {
			var file = fileInput.files[0];

			var reader = new FileReader();

			reader.onload = function (e) {
				dictionary = parseCSV(e.target.result);
				if (Object.keys(dictionary).length > 0) {
					loadTables(dictionary);
					dropOldDataFromBase();
					dropInterestsFromBase();
					addPresentationsToBase(dictionary);
					console.log("adding to db successful");
				}
			};

			reader.readAsText(file);
		} else {
			console.log("No file selected.");
		}
	}

	//LOAD table
	async function extractDataFromBase() {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('load_presentations')}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			if (data.error == null) {
				// getting data from JSON response
				let parsedData = JSON.parse(data);
				loadTables(parsedData);
			} else {
				alert("No data base available to load\n Error msg: " + data.error);

				// TODO
				// сменим този алерт с каквото искаш
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	window.handleFile = handleFile;
	window.extractDataFromBase = extractDataFromBase;
});