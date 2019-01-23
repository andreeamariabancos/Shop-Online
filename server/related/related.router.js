var RelatedManager = require("./related.manager");

module.exports = function (Mongoose, app) {
    var relatedManager = new RelatedManager(Mongoose);

    /**
	 * Get all related products.
	*/
	app.get("/api/related", function (request, response) {
		relatedManager.getRelated(function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
     * Get relateds products by id.
    */
	app.get("/api/related/:id", function (request, response) {
		var id = request.params.id
		relatedManager.getByIdRelated(id, function (data) {
			response.status(200).json(data);
		}, function (error) {
			response.status(500).json(error);
		});
	})

	/**
	 * Add new related products.
	*/
	app.post("/api/related", function (request, response) {
		relatedManager.addRelated(request.body, function(data) {
			console.log(data);	
			response.status(200).json(data)
		}, function(data) {
			response.status(500).json(data);
		});
	});

	
	/**
	 * Delete related products by id 
	*/
	
	app.delete("/api/related/:id", function (request, response) {
        var id = request.params.id;

        relatedManager.remove(id,
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });

    /**
	 * Delete all related prroducts. 
	*/

     app.delete("/api/related", function (request, response) {
        relatedManager.removeAll(
            function (data) {
                response.status(200).json(data);
            },
            function (data) {
                response.status(500).json(data);
            });
    });


     /**
	 * Update related product.
	*/
	app.put("/api/related/:id",function(request, response) {
		relatedManager.update(request.params.id,request.body,function(data) {
			response.status(200).json(data);
		},
		function(error){
			response.status(500).json(error);
		});
	});

};
