$(function() {

	var name;
	var surname;
	var email;
	var username;
	var password;
	var serverDate;
	var connected = localStorage.getItem('user');

	init();

	function init() {
		displayUserIsConected();
		requestUserMatch();
	}

	/**
	 * User registration event
	 */
	 $("#register").on("click", function() {
	 	readValues();
	 	console.log('server', serverDate)
	 	console.log('email', email)
	 	if (serverDate == email ) {
	 		$("#messageErr").text('Sunteți înregistrat cu acest email');
	 	} else if (validateValues() && validateEmail()) {
	 		addUser();	
	 	}
	 });


	/**
	 * User disconnection
	 */

	 $("#logOut").on("click", function() {
	 	logOut();	
	 });


	 $('#password').keyup(function() {
	 	$('#statusPass').html(checkStrength($('#password').val()))
	 })


	 $('#email').blur(function(e) {
	 	if (validateEmail('email')) {
	 		$('#emailStatus').html('✓');
	 		$('#emailStatus').css('color', 'green');
	 		$('#emailStatus').css('position','absolute');
	 		$('#emailStatus').css('right','0%');
	 		$('#emailStatus').css('top','56%');
	 	}
	 	else {
	 		$('#emailStatus').html('✗');
	 		$('#emailStatus').css('color', 'red');
	 		$('#emailStatus').css('position','absolute');
	 		$('#emailStatus').css('right','0%');
	 		$('#emailStatus').css('top','56%');
	 	}
	 });


	/**
	 * Displaying the user name saved in localstorage
	 */
	 function displayUserIsConected() {

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
	 		$("#name").css('border', 'none');
	 		$("#surname").css('border', '1px solid rgb(210, 20, 20)');

	 	} else if (!email || !email.length) {

	 		$("#email").focus();
	 		$("#surname").css('border', 'none');
	 		$("#email").css('border', '1px solid rgb(210, 20, 20)');

	 	} else if (!username || !username.length) {

	 		$("#username").focus();
	 		$("#email").css('border', 'none');
	 		$("#username").css('border', '1px solid rgb(210, 20, 20)');

	 	} else if (!password || !password.length) {

	 		$("#password").focus();
	 		$("#username").css('border', 'none');
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

	/**
	 * Request login data for password/username matching
	 */

	 function requestUserMatch() {

	 	$.ajax({
	 		type: 'GET',
	 		url: '/api/users',
	 		contentType:"application/json",
	 		success: successDataUser
	 	});
	 } 

	 function successDataUser(match) {
	 	if(match) {
	 		console.log('username, passs server', match)
	 		for ( var i = 0; i < match.length; i++) {
	 			serverDate = match[i].email;
	 			console.log('for', serverDate)
	 		}
	 	}	
	 }



	 function validateEmail(email) {
	 	let value =  $("#email").val();
	 	let filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	 	if (filter.test(value)) {
	 		return true;
	 	}
	 	else {
	 		return false;
	 	}
	 }


	 function checkStrength(password) {
	 	var strength = 0
	 	if (password.length < 6) {
	 		$('#statusPass').removeClass()
	 		$('#statusPass').addClass('complexity')
	 		return 'Parola prea scurtă'
	 	}
	 	if (password.length > 7) strength += 1
		// If password contains both lower and uppercase characters, increase strength value.
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
		// If it has numbers and characters, increase strength value.
		if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
		// If it has one special character, increase strength value.
		if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
		// If it has two special characters, increase strength value.
		if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
		// Calculated strength value, we can return messages
		// If value is less than 2
		if (strength < 2) {
			$('#statusPass').removeClass()
			$('#statusPass').addClass('complexity')
			return 'Complexitate scăzută'
		} else if (strength == 2) {
			$('#statusPass').removeClass()
			$('#statusPass').addClass('complexity')
			return 'Complexitate bună'
		} else {
			$('#statusPass').removeClass()
			$('#statusPass').addClass('complexity')
			return 'Complexitate puternică'
		}
	}

});