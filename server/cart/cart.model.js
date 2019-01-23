module.exports = function (Mongoose) {
	const cartSchema = new Mongoose.Schema({	
		boughtProd: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Products'
		}],

		whoBought: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		
		quantity:[{
			type:Number,
            required:true
		}],
		total: {
			type:String,
	        required:true
	    }

    });

	const cart = Mongoose.model("Cart", cartSchema);
}