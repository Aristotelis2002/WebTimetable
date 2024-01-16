document.addEventListener('DOMContentLoaded', function() {
	const logOutButton = document.getElementById("logOut-button");
	
	function updateView() {
		if (sessionStorage.getItem('username') != '') {
			document.getElementById("form-button").style.display = "none";
			document.getElementById("logOut-button").style.display = "block";
			document.getElementById("contentMenu").style.display = "block";
			document.getElementById("usernameTitle").textContent = sessionStorage.getItem('username');
			document.getElementById("usernameTitle").style.color = '#eee';
			document.getElementById("title-video").style.display = "none";
			document.getElementById("title-image").style.display = "block";
			document.getElementById("scheduleButton").textContent = "Генериране на разписание";
			toggleLastColumnVisibility(false);
			if (sessionStorage.getItem('adminStatus') == 'true') {
				document.getElementById("usernameTitle").style.color = '#f9d87b';
				document.getElementById("scheduleButton").textContent = "Качване на разписание";
				toggleLastColumnVisibility(true);
			}
		} else {
			console.log(sessionStorage.getItem('username'));
			document.getElementById("logOut-button").style.display = "none";
			document.getElementById("form-button").style.display = "block";
			document.getElementById("usernameTitle").textContent = '';
			document.getElementById("contentMenu").style.display = "none";
			document.getElementById("title-image").style.display = "none";
			document.getElementById("title-video").style.display = "block";
			toggleLastColumnVisibility(true);
		}
	}
	
	function logOut() {
		sessionStorage.setItem('username', '');
		sessionStorage.setItem('adminStatus', false);
		
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
			clearDropdownValues();
		}).catch(error => {
			console.error('Error with sha256:', error);
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
			if (data.error == null) {
				// Login successful
				sessionStorage.setItem('username', username);
				if (data.adminStatus.admin == 0) {
					sessionStorage.setItem('adminStatus', false);
				} else {
					sessionStorage.setItem('adminStatus', true);
				}
				closeSignInForm();
				updateView();
			} else {
				// Login failed
				console.log("The error message is " + data.error);
				// TODO
				// We should implement some logic for the frontend here
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
			if (data.error == null) {
				// Registration succesfull
				console.log(data);
				loginUser(username, password);
				closeRegistrationForm();
				// Functionality after registration
			} else {
				// Login failed
				console.log("The error message is " + data.error);
				// TODO
				// We should implement some logic for the frontend here
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
		
		createTable('1');
		for (var i = 0; i < 10 ; i++) {
			addRow('1');
		}
		createTable('2');
		for (var i = 0; i < 5 ; i++) {
			addRow('2');
		}

		if(sessionStorage.getItem('username') == null) {
			sessionStorage.setItem('username', '');
		}

		updateView();
	}
	
	window.onload = initialization();
	window.updateView = updateView;
	window.register = register;
	window.logInForm = logInForm;
});
