$(function() {

	var username;
	var password;

	/**
	 * User login event
	*/

	$("#login").on("click", function() {
		readValues();

		if (validateValues()) {
			login();
			window.location = '/';	
		} else {
			console.log('validare pentru parola sau user gresit')
			$("#messageErr").text('Nume utilizator sau parolă gresită');
		}			
	});


	/**
	 * User login in cjecjout page
	*/

	$("#loginOrder").on("click", function() {
    readValues();

    if (validateValues()) {
      login();
      window.location.href = '/checkout';    
    }     
  });

	/**
	 * Retrieve the values entered in the login fields
	*/

	function readValues() {
		
		username = $("#username").val();
		password = $("#password").val();
	}


	/**
	 * Validating fields for login
	*/
	function validateValues() {

		if (!username || !username.length) {
			
			console.log('No username specified');
			$("#username").focus();
			$("#username").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!password || !password.length) {

			console.log('No password specified');
			$("#password").focus();
			$("#password").css('border', '1px solid rgb(210, 20, 20)');
		}

		return username && password && username.length && password.length;

	}

	/**
	 * Request for login user
	*/

	function login() {
		$.ajax({
			type: 'POST',
			url: './api/login',
			data: JSON.stringify({ username, password }),
			dataType: 'JSON',
			contentType: 'application/json',
			success: handleSuccess
		});
	}


	/**
	 * Successful login
	*/
	function handleSuccess(data) {

		if (data) {
			window.localStorage.setItem('user', JSON.stringify(data));		
			alert('Welcome in your account');
		}
	}	

});