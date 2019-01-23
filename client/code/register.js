$(function() {

	var name;
	var surname;
	var email;
	var username;
	var password;
	var connected = localStorage.getItem('user');

	init();

	function init() {
		displayUserName();
	}

	/**
	 * User disconnection
	*/
	
	$("#logOut").on("click", function() {
		logOut();	
	});
	
	/**
	 * Displaying the user name saved in localstorage
	*/
	function displayUserName() {

		if (!connected) {
			console.log("nu ai nimic stocat");
		} else {
			var user = JSON.parse(connected).username;
			$("#result").html(user)
		}
	}
	

	/**
	 * Retrieve the values entered in the resister fields
	*/
	function readValues() {

		name = $("#name").val();
		surname = $("#surname").val();
		email = $("#email").val();
		username = $("#username").val();
		password = $("#password").val();
	}


	/**
	 * Request for add new user
	*/
	function addUser() {
		$.ajax({
			type: 'POST',
			url: './api/user',
			data: JSON.stringify({ name, username, email, username, password }),
			dataType: 'JSON',
			contentType: 'application/json',
			success: handleSuccess
		});
	}

	/**
	 * Validating fields for register
	*/

	function validateValues() {

		if (!name || !name.length) {

			$("#name").focus();
			$("#name").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!surname || !surname.length) {

			$("#surname").focus();
			$("#surname").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!email || !email.length) {

			$("#email").focus();
			$("#email").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!username || !username.length) {
			$("#username").focus();
			$("#username").css('border', '1px solid rgb(210, 20, 20)');

		} else if (!password || !password.length) {

			$("#password").focus();
			$("#password").css('border', '1px solid rgb(210, 20, 20)');
		}

		return name && surname && email && username && password && name.length && surname.length && email.length && username.length && password.length;

	}

	/**
	 * Successful registration
	*/
	function handleSuccess(data) {

		if (data) {
			window.localStorage.setItem('user', JSON.stringify(data));
			alert('You have successfully registered');
			window.location.href = '/';
		}
	}	


	/**
	 * User registration event
	*/
	$("#register").on("click", function() {
		readValues();

		if (validateValues()) {
			addUser();	
		} else {
			console.log('validare pentru cont existent')
			$("#messageErr").text('Sunte-ți înregistrat deja cu acest cont');
		}

	});

	/**
	 * User logout function
	*/
	function logOut(data) {		
		window.localStorage.removeItem('user', JSON.stringify(data));
		$("#result").html('')
		$("#orderAuth").html('');
		$("#orderAuth").append(
			`<li class="row">
              <label>Username:</label>
              <input autocomplete="username" type="text" name="username" id="username" required="true">
            </li>
            <li class="row">
              <label>Password:</label>
              <input autocomplete="current-password" type="password" name="password" id="password">
            </li>
            <li>
              <input id="loginOrder" type="submit" value="Continuă" class="btn" data-id="orderInfo" />
            </li>
          </ul>`);
		
	}

});