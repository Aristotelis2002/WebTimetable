document.addEventListener('DOMContentLoaded', function() {
	const formButton = document.getElementById('form-button');
    const formCloseButton = document.getElementById('btn-cancel');
	
    function openSignInForm() {
		document.getElementById("signInForm").style.display = "block";
	}
	
	function closeSignInForm() {
		document.getElementById("signInForm").style.display = "none";
	}
	
    if (formButton) {
        formButton.addEventListener('click', openSignInForm);
    }
	
	if (formCloseButton) {
        formCloseButton.addEventListener('click', closeSignInForm);
    }
});