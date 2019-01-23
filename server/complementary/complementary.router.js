var ComplementaryManager = require("./complementary.manager");

module.exports = function (Mongoose, app) {
    var complementaryManager = new ComplementaryManager(Mongoose);

    /**
	 * Get all complementary products.
	*/
	app.get("/api/complementary", function (request, response) {
		complementaryManager.getComplementary(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get complementary products by id.
    */
	app.get("/api/complementary/:id", function (request, response) {
		var id = request.params.id
		complementaryManager.getByIdComplementary(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})


	/**
	 * Add new complementary products.
	*/
	app.post("/api/complementary", function (request, response) {
		complementaryManager.addComplementary(request.body, function(data) {
			console.log(data);	
			response.status(200).json(data)
		}, function(data) {
			response.status(500).json(data);
		});
	});


};
