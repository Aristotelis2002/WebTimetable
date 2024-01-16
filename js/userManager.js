document.addEventListener('DOMContentLoaded', function() {
	// sessionStorage.setItem('username', 'user');
	sessionStorage.setItem('username', '');
	sessionStorage.setItem('adminStatus', false);
	
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
			if (sessionStorage.getItem('adminStatus') === 'true') {
				document.getElementById("usernameTitle").style.color = '#f9d87b';
				document.getElementById("scheduleButton").textContent = "Качване на разписание";
			}
		} else {
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
	
	function initialization() {
		updateView();
		createTable('1');
		for (var i = 0; i < 10 ; i++) {
			addRow('1');
		}
		createTable('2');
		for (var i = 0; i < 5 ; i++) {
			addRow('2');
		}
	}
	
	window.onload = initialization();
});