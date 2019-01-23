module.exports = function (Mongoose) {
   
    var Cart = Mongoose.models.Cart;

     /**
     * Get all products cart.
    */
    
    this.getCart = function(success, fail) {
        Cart.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get products cart by id.
    */
    this.getByIdCart = function (id, success, fail) {
            Cart.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new products cart.
    */

    this.addCart = function(title, success, fail) {
        var newCart = new Cart(title);
        newCart.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }

};