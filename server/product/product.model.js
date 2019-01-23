// export the file and send the app to mongoose (argument)
module.exports = function (Mongoose) {
	const productsSchema = new Mongoose.Schema({
		title: String,
		price: Number,
		description: String,
		colors: [String],
		img: String,
		design: String,
		exhibit: [String],
		categories: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Category'
		}],
		related: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Related'
		},
		complementary: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Complementary'
		}
	});

	const products = Mongoose.model("Products", productsSchema);
}