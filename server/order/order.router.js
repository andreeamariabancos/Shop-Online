var OrderManager = require("./order.manager");

module.exports = function (Mongoose, app) {
    var orderManager = new OrderManager(Mongoose);

    /**
	 * Get all order.
	*/
	app.get("/api/order", function (request, response) {
		orderManager.getOrder(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get orders by id.
    */
	app.get("/api/order/:id", function (request, response) {
		var id = request.params.id
		orderManager.getByIdOrder(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
	 * Add new order.
	*/
	app.post("/api/order", function (request, response) {
		orderManager.addOrder(request.body, function(data) {	
			response.status(200).json(data)
			console.log(data)
		}, function(data) {
			response.status(500).json(data);
		});
	});

	
	/**
	 * Delete order by id 
	*/
	
	app.delete("/api/order/:id", function (request, response) {
        var id = request.params.id;

        orderManager.remove(id,
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });

    /**
	 * Delete all orders. 
	*/

     app.delete("/api/order", function (request, response) {
        orderManager.removeAll(
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });


     /**
	 * Update order by id.
	*/
	app.put("/api/order/:id",function(request, response) {
		orderManager.update(request.params.id,request.body,function(data) {
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});

};
