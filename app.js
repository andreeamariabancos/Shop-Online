//npm init for json-pack
var Express = require("express");//npm intall express
var BodyParser = require("body-parser"); //npm intall body-parser
var Mongoose = require("mongoose");//npm intall mongose
var BlueBird = require("bluebird");//npm intall bluebird

var crypto = require('crypto');
var data = "Merge criptarea cu structura asta"
console.log('cripteaza ', crypto.createHash('md5').update(data).digest('hex'))

var app = Express();

Mongoose.Promise = BlueBird;
//connecting to the database
Mongoose.connect("mongodb://localhost/databaseOrzacDesign", function() {
	
	//request to table files
	const models = ['user', 'product', 'category', 'related', 'complementary','order','cart'];

	models.forEach(function(item) {
		require('./server/' + item + '/' + item + '.model')(Mongoose);
		require('./server/' + item + '/' + item + '.router')(Mongoose, app);
	});

});


// serve static files from template

app.use(Express.static(__dirname + '/client'));

app.use(BodyParser.json());

app.use(/.*\.js/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});
app.use(/.*\.css/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});
app.use(/.*\.jpg/, function(request, response) {
	response.sendFile(`${__dirname}/client/${request.originalUrl}`);
});

app.get(/^\/(?!api).*/, function(request, response) {
	let url = (request.originalUrl == '/' ? '/index' : request.originalUrl);

	if (url.indexOf('/details/') == 0) {
		url = '/details';
	} else {
		
	}
	response.sendFile(`./client${url}.html`, { root: __dirname });
});


app.listen(4002, function () {
	console.log(" OrzacDesign server started");
});

