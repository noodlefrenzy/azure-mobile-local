var apiPath = '../service/api';

var express = require('express');
var fs = require('fs');

var app = express();

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.length >= suffix.length && this.indexOf(suffix, this.length - suffix.length) !== -1;
	}
}

var verbs = [ 'delete', 'get', 'patch', 'post', 'put' ];
var apiFiles = fs.readdirSync(apiPath).filter(function(fn) { return fn.endsWith('.js'); });
for (var idx=0; idx < apiFiles.length; ++idx) {
	var apiFile = apiFiles[idx];
	var apiName = apiFile.substring(0, apiFile.length - '.js'.length);
	var apiImpl = require(apiPath + '/' + apiFile);
	console.log("Defining API method %s", apiName);
	var apiApp = express();
	for (var verbIdx=0; verbIdx < verbs.length; ++verbIdx) {
		var verb = verbs[verbIdx];
		if (typeof apiImpl[verb] === 'function') {
			console.log("\tAPI method %s contains verb %s", apiName, verb);
			apiApp[verb]('/', apiImpl[verb]);
		}
	}
	// Now check to see if it's registered other API methods.
	if (typeof apiImpl['register'] === 'function') {
		apiImpl['register'](apiApp);
	}
	app.use('/api/' + apiName, apiApp);
}

var port = 3000;
if (!module.parent) {
    var server = app.listen(port, function () {
        console.log("Express server listening on port %d in %s mode",
            server.address().port,
            app.settings.env
        );

    });
}

exports.app = app;
