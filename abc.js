var request = require("request");

var propertiesObject = { 
	username:'fplpoc', 
	path:'C:/Program Files/nodejs/node_modules/npm/doc'
};

var url = "http://0b0523f7.ngrok.io/account/";

request({url:url, qs:propertiesObject}, function(err, response, body) {
	if(err) { 
		console.log(err); 
		return; 
	}
	console.log("Get response: " + response.statusCode);
	console.log(response.body);
	if(response.statusCode == 200) console.log('asd');
	console.log(response.body['path']);
});