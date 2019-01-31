$(function() {

	var username;
	var password;
	var serverDate;

	init();
	function init() {
		requestUserDate();
	}

	/**
	 * User login event
	*/

	$("#login").on("click", function() {
		readValues();

		if (validateValues()) {
			login();
		}	
	});
 

	/**
	 * User login in chechout page
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
			
			$("#username").focus();
			$("#username").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!password || !password.length) {

			$("#password").focus();
			$("#username").css('border', 'none');
			$("#password").css('border', '1px solid rgb(210, 20, 20)');

		} else if (serverDate != username || password) {

			$("#username,#password").css('border', 'none');
			$("#messageErr").text('Nume utilizator sau parolă gresită');

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
			window.location = '/';		
			alert('Welcome in your account');
		}
	}	


	/**
	 * Request login data for password/username matching
	*/

    function requestUserDate() {
			
			$.ajax({
				type: 'GET',
				url: '/api/users',
				contentType:"application/json",
				success: successData
			});
	} 

	function successData(match) {
		if(match) {
			console.log('username, passs server', match)
			for ( var i = 0; i < match.length; i++) {
				serverDate = match[i].username;
				console.log('for', serverDate)
			}
		}	
	}

	
});