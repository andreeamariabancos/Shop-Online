module.exports = function (Mongoose) {
   
    var Complementary = Mongoose.models.Complementary;

     /**
     * Get all complementary products.
    */
    
    this.getComplementary = function(success, fail) {
        Complementary.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get complementary products by id.
    */
    this.getByIdComplementary = function (id, success, fail) {
            Complementary.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new complementary products.
    */

    this.addComplementary = function(title, success, fail) {
        var newComplementary = new Complementary(title);
        newComplementary.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }
};