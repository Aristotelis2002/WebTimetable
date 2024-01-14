document.addEventListener('DOMContentLoaded', function() {
	const formButton = document.getElementById('form-button');
	const formRegistrationButton = document.getElementById('btn-register');
    const formCloseButtonSignIn = document.getElementById('btn-cancel-signIn');
	const formCloseButtonReg = document.getElementById('btn-cancel-reg');
	
    function openSignInForm() {
		document.getElementById("title-video").style.display = "none";
		document.getElementById("title-image").style.display = "block";
		document.getElementById("signInForm").style.display = "block";
	}
	
	function openRegistrationForm() {
		document.getElementById("signInForm").style.display = "none";
		document.getElementById("registrationForm").reset();
		document.getElementById("registrationForm").style.display = "block";
	}
	
	function closeSignInForm() {
		document.getElementById("signInForm").style.display = "none";
	}
	
	function closeRegistrationForm() {
		document.getElementById("registrationForm").style.display = "none";
	}
	
    if (formButton) {
        formButton.addEventListener('click', openSignInForm);
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
});