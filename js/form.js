document.addEventListener('DOMContentLoaded', function () {
	const formButton = document.getElementById('form-button');
	const formRegistrationButton = document.getElementById('btn-register');
	const formCloseButtonSignIn = document.getElementById('btn-cancel-signIn');
	const formCloseButtonReg = document.getElementById('btn-cancel-reg');
	const formSubmitButton = document.getElementById('btn-submit');
	const formRegisterButton = document.getElementById('btn-register');

	function openlogInForm() {
		document.getElementById("logInForm").style.display = "block";
		document.getElementById("logInForm").reset();
	}

	function openRegistrationForm() {
		document.getElementById("logInForm").style.display = "none";
		document.getElementById("registrationForm").reset();
		document.getElementById("registrationForm").style.display = "block";
	}

	function closeSignInForm() {
		document.getElementById("logInForm").style.display = "none";
	}

	function closeRegistrationForm() {
		document.getElementById("registrationForm").style.display = "none";
	}

	if (formButton) {
		formButton.addEventListener('click', openlogInForm);
	}

	if (formRegistrationButton) {
		formRegistrationButton.addEventListener('click', openRegistrationForm);
	}

	if (formCloseButtonSignIn) {
		formCloseButtonSignIn.addEventListener('click', closeSignInForm);
	}

	if (formCloseButtonReg) {
		formCloseButtonReg.addEventListener('click', closeRegistrationForm);
	}

	if (formSubmitButton) {
		formSubmitButton.addEventListener('click', logInForm);
	}

	if (formRegisterButton) {
		formRegisterButton.addEventListener('click', register);
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
});