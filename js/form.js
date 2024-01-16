document.addEventListener('DOMContentLoaded', function() {
	const formButton = document.getElementById('form-button');
	const formRegistrationButton = document.getElementById('btn-register');
    const formCloseButtonSignIn = document.getElementById('btn-cancel-signIn');
	const formCloseButtonReg = document.getElementById('btn-cancel-reg');
	const formSubmitButton = document.getElementById('btn-submit');
	const formRegisterButton = document.getElementById('btn-register');
	
    function openlogInForm() {
		document.getElementById("title-video").style.display = "none";
		document.getElementById("title-image").style.display = "block";
		document.getElementById("logInForm").style.display = "block";
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
		console.log("AAAAAAA")
		formSubmitButton.addEventListener('click', logInForm)
	}
	
	function logInForm() {	
		var username = document.getElementById("username").value;
   		var password = document.getElementById("password").value;
		password = sha256Hash(password);
		console.log(username);
		console.log(password);
		loginUser(username, password);
	}
	
	function register() {
		//...
	}

	async function loginUser(username, password) {
		try {
			const response = await fetch('http://localhost/demo/api.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
	
			const data = await response.json();
			console.log(data); // Process the response data as needed
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