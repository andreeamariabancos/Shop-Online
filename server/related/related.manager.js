module.exports = function (Mongoose) {
   
    var Related = Mongoose.models.Related;

     /**
     * Get all related products.
    */
    
    this.getRelated = function(success, fail) {
        Related.find(function(error, result) {
            error ? fail(error) : success(result);
        });     
    }

    /**
     * Get type by id.
    */
    this.getByIdRelated = function (id, success, fail) {
            Related.findOne({
                _id: id
            }, function (error, result) {
                error ? fail(error) : success(result);
            });
        }

    /**
     * Add new type.
    */

    this.addRelated = function(title, success, fail) {
        var newRelated = new Related(title);
        newRelated.save (function(error, result) {
            error ? fail(error) : success(result); //short if
        });
    }

    /**
     * Delete by id related products
    */

    this.remove = function (id, success, fail) {
        Related.deleteOne({
            _id: id
        }, function (error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Delete all related products
    */

    this.removeAll = function(success, fail) {
        Related.remove(function(error, result) {
            error ? fail(error) : success(result);
        });
    }

    /**
     * Update products
    */
    this.update = function(id, data, succes,fail) {
        Related.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, function(error,result){
            error ? fail(error) : succes(result);
        });
    }

    
};