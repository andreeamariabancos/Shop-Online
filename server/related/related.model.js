module.exports = function (Mongoose) {

	const relatedSchema = new Mongoose.Schema({
		title: {
			type: String,
			unique: true
		}
	});

	const related = Mongoose.model("Related", relatedSchema);
}