const UserManager = require('./user.manager');

module.exports = function(Mongoose, app) {
	const userManager = new UserManager(Mongoose);

	app.get('/api/users', function(request, response) {
		userManager.getUsers(function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	});

	app.post('/api/user', function(request, response) {
		userManager.addUser(request.body, function(data) {
			response.status(200).json(data)
		}, function(error) {
			response.status(500).json(error);
		});
	});

	app.post('/api/login', function(request, response) {
		userManager.login(request.body, function(data) {
			response.status(200).json(data);
		}, function(error) {
			response.status(500).json(error);
		});
	})
}