var CartManager = require("./cart.manager");

module.exports = function (Mongoose, app) {
    var cartManager = new CartManager(Mongoose);

    /**
	 * Get all products cart.
	*/
	app.get("/api/cart", function (request, response) {
		cartManager.getCart(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get products cart by id.
    */
	app.get("/api/cart/:id", function (request, response) {
		var id = request.params.id
		cartManager.getByIdCart(id, function (data) {
			console.log("dsadsad");
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})


	/**
	 * Add new products cart.
	*/
	app.post("/api/cart", function (request, response) {
		cartManager.addCart(request.body, function(data) {
			console.log("dsadsad");	
			response.status(200).json(data);
		}, function(data) {
			response.status(500).json(data);
		});
	});
};
