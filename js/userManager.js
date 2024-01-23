document.addEventListener('DOMContentLoaded', function() {
	const logOutButton = document.getElementById("logOut-button");
	
	function updateView() {
		if (sessionStorage.getItem('username') != '') {
			getAdminStatus(sessionStorage.getItem('username')).then(adminStat => {
				console.log(adminStat);
				console.log(sessionStorage.getItem('adminStatus'));
				if (adminStat != sessionStorage.getItem('adminStatus')) {
					sessionStorage.setItem('adminStatus', adminStat);
				}
			});
		}
		
		if (sessionStorage.getItem('username') != '') {
			clearDropdownValues();
			
			document.getElementById("form-button").style.display = "none";
			document.getElementById("logOut-button").style.display = "block";
			document.getElementById("contentMenu").style.display = "block";
			document.getElementById("usernameTitle").textContent = sessionStorage.getItem('username');
			document.getElementById("usernameTitle").style.color = '#eee';
			document.getElementById("title-video").style.display = "none";
			document.getElementById("title-image").style.display = "block";
			document.getElementById("filterButton").style.display = "";
			document.getElementById("scheduleButton").style.width = "50%";
			document.getElementById("scheduleButton").textContent = "Генериране на разписание";
			document.getElementById("scheduleButton").classList.remove('hovered');
			toggleLastColumnVisibility(false);
			if (sessionStorage.getItem('adminStatus') == 'true') {
				document.getElementById("usernameTitle").style.color = '#f9d87b';
				document.getElementById("scheduleButton").textContent = "Качване на разписание";
				document.getElementById("filterButton").style.display = "none";
				document.getElementById("scheduleButton").style.width = "100%";
				document.getElementById("scheduleButton").classList.add('hovered');
				toggleLastColumnVisibility(true);
			} else {
				updateInterests();
			}
		} else {
			document.getElementById("logOut-button").style.display = "none";
			document.getElementById("form-button").style.display = "block";
			document.getElementById("usernameTitle").textContent = '';
			document.getElementById("contentMenu").style.display = "none";
			document.getElementById("title-image").style.display = "none";
			document.getElementById("title-video").style.display = "block";
			document.getElementById('tableSelect').value = "all";
			document.getElementById("filterButton").style.display = "none";
			for(let i = 0; i < tables.length; i++) {
				var table = document.getElementById(tables[i]).style.display = "";
			}
			toggleLastColumnVisibility(true);
		}
	}
	
	function logOut() {
		sessionStorage.setItem('username', '');
		sessionStorage.setItem('adminStatus', false);
		closeExportFrom();
		document.getElementById("btn-clear-filters").click();
		updateView();
	}
	
	if (logOutButton) {
		logOutButton.addEventListener('click', logOut);
	}
	
	function toggleLastColumnVisibility(hideLastColumn) {
		for (let i = 0; i < tables.length ; i++) {
			const table = document.getElementById(tables[i]);
		
			for (let i = 0; i < table.rows.length; i++) {
				const row = table.rows[i];
				const lastCell = row.cells[7];
				
				lastCell.style.display = hideLastColumn ? 'none' : '';
			}
		}
	}
	
	function logInForm() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		sha256Hash(password).then(hashedPass => {
			loginUser(username, hashedPass);
			
		}).catch(error => {
			console.error('Error with sha256:', error);
		});
	}
	
	function updateInterests() {
		getIdByUsername(sessionStorage.getItem('username')).then(userId => {
			getUserInterests(userId).then(interests => {
				if (interests == null) {
						return;
					}
				interests.forEach(function(presentation) {
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
							const fn = row.cells[2].textContent;
						
							if (fn == presentation.fn) {
								const dropdown = row.cells[7].querySelector('.tableDropList');
								// Retrieve the selected value of the dropdown
								if (dropdown != null) {
									dropdown.value = presentation.interestType;
								}
							}
						}
					}
				})
			})
		});
	}

	function register() {
		var username = document.getElementById("usernameReg").value;
		var fn = document.getElementById("fn").value;
		var password = document.getElementById("passwordReg").value;
		sha256Hash(password).then(hashedPass => {
			registerUser(username, fn, hashedPass);
		}).catch(error => {
			console.error('Error with sha256:', error);
		});
	}

	async function loginUser(username, password) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('login')}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error, message, adminStatus
			var errorLabel = document.getElementById("errorMessageLogIn");
			if (data.error == null) {
				// Login successful
				sessionStorage.setItem('username', username);
				if (data.adminStatus.admin == 0) {
					sessionStorage.setItem('adminStatus', false);
				} else {
					sessionStorage.setItem('adminStatus', true);
				}
				closeSignInForm();
				errorLabel.style.display = "none";
				
				updateView();
			} else {
				// Login failed
				console.log("The error message is " + data.error);
				
				errorLabel.style.display = "block";
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	async function registerUser(username, fn, password) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('register')}&username=${encodeURIComponent(username)}&fn=${encodeURIComponent(fn)}&password=${encodeURIComponent(password)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error, message, adminStatus
			var errorLabel = document.getElementById("errorMessageRegister");
			if (data.error == null) {
				// Registration succesfull
				console.log(data);
				loginUser(username, password);
				closeRegistrationForm();
				errorLabel.style.display = "none";
				// Functionality after registration
			} else {
				// Login failed
				console.log("The error message is " + data.error);
				
				errorLabel.style.display = "block";
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	function sha256Hash(input) {
		const encoder = new TextEncoder();
		const data = encoder.encode(input);

		return crypto.subtle.digest('SHA-256', data)
			.then(hashBuffer => {
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
				return hashHex;
			});
	}
	
	function initialization() {
		if(sessionStorage.getItem('username') == null) {
			sessionStorage.setItem('username', '');
		}
		//load tables from db																		!!!
		extractDataFromBase();
		//load interests from db
		getAdminStatus("user1").then(res => console.log(res));
		
		updateView();
	}
	
	async function getAdminStatus(username) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `action=${encodeURIComponent('get_admin_status')}&username=${encodeURIComponent(username)}`,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //json data has an error, adminStatus
			//var errorLabel = document.getElementById("errorMessageLogIn");
			//console.log(data);
			if (data.error == null) {
				console.log(data.adminStatus);
				if (data.adminStatus.admin == 0) {
					return false;
				} else {
					return true;
				}
			} else {
				console.log("The error message is " + data.error);
			}

		} catch (error) {
			console.error('Fetch error:', error.message);
		}
	}
	
	window.onload = initialization();
	window.updateView = updateView;
	window.register = register;
	window.logInForm = logInForm;
	window.toggleLastColumnVisibility = toggleLastColumnVisibility;
});
