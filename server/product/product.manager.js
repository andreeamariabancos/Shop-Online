module.exports = function (Mongoose) {
	var Products = Mongoose.models.Products;

	/**
	 * Get all products. 
	*/
	this.getProducts = function(success,fail) {
		Products.find(function(error, result) {
			error ? fail(error) : success(result);
		});		
	}

	/**
	 * Get product by limit for pagination and filter
	*/

	this.getProductsLimit = function(index, count, title, description, colors, categories, design, price, related, complementary, success, fail) {
		const options = {};

		if (title) {
			options.$and = options.$and || [];
			options.$and.push({
				$or: [{
					title: new RegExp(title, 'i')
				}, {
					description: new RegExp(title, 'i')
				}]
			});
		} 

		if (colors && colors.length > 0) {
			options.$and = options.$and || [];
			options.$and.push({
				colors: {
					$in: colors
				}
			});
		}

		if(categories && categories != "All") {
			options.$and = options.$and || [];
			options.$and.push({
				categories
			});
		}

		if(related) {
			options.$and = options.$and || [];
			options.$and.push({
				related
			});
		}

		if(complementary) {
			options.$and = options.$and || [];
			options.$and.push({
				complementary
			});
		}


		if (design) {
			options.$and = options.$and || [];
			options.$and.push({
				design: design
			});
		}

		if (price) {
			options.$and = options.$and || [];
			options.$and.push({
			 price: { "$lte":price}
			});
		}

		Products.count(options, function(error, total) {
			if (error) {
				fail(error);
			} else {
				Products.find(options).skip(index - 1).limit(count).exec(function(error, result) {
					error ? fail(error) : success({
						total: total,
						result: result
					});
				});
			}
		});
	}


	/**
	* Get products by id.
	*/
	this.getByIdProducts = function (id, success, fail) {
			Products.findOne({
				_id: id
		}, function (error, result) {
			error ? fail(error) : success(result);
		});
	}

	/**
	* Get product by category id.
	*/

	this.getProductByIdCategories = function (id, success, fail) {
		Products.find({
			categories: id
		}, function (error, result) {
			error ? fail(error) : success(result);
		});
	}

	/**
	 * Add new products
	*/
	this.addProducts = function(title, success, fail) {
		var newProducts = new Products(title);
		newProducts.save (function(error, result) {
			error ? fail(error) : success(result); // :short if
		});
	}

	
	/**
	 * Delete products by id
	*/
    this.remove = function (id, success, fail) {
        Products.deleteOne({
            _id: id
        }, function (error, result) {
            error ? fail(error) : success(result);
        });
    }

	/**
     * Delete all products
    */

    this.removeAll = function(success, fail) {
        Products.remove(function(error, result) {
            error ? fail(error) : success(result);
        });
    }


	/**
	 * Update products
	*/
	this.updateProducts = function(id, data, succes,fail) {
		Products.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, function(error,result){
			error ? fail(error) : succes(result);
		});
	}


}

