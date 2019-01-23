module.exports = function (Mongoose) {
   
    var Order = Mongoose.models.Order;

     /**
     * Get all orders.
    */
    
    this.getOrder = function(success, fail) {
        Order.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get order by id.
    */
    this.getByIdOrder = function (id, success, fail) {
            Order.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new order.
    */

    this.addOrder = function(title, success, fail) {
        var newOrder = new Order(title);
        newOrder.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }

    /**
     * Delete by id order
    */

    this.remove = function (id, success, fail) {
        Order.deleteOne({
            _id: id
        }, function (error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Delete all orders
    */

    this.removeAll = function(success, fail) {
        Order.remove(function(error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Update order by id
    */
    this.update = function(id, data, succes,fail) {
        Order.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, function(error,result){
            error ? fail(error) : succes(result);
        });
    }

    
};