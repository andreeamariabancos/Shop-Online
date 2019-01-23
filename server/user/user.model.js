module.exports = function(Mongoose) {
	const schema = Mongoose.Schema({
		name: String,
		surname: String,
		email: String,
		username: String,
		password: String

	}, {
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
			}
		}
	});

	Mongoose.model('User', schema);
}