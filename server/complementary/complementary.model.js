module.exports = function (Mongoose) {

	const complementarySchema = new Mongoose.Schema({
		title: {
			type: String,
			unique: true
		}
	});

	const comp = Mongoose.model("Complementary", complementarySchema);
}