var should = require('should');
var app = require('../server.js').app;
var port = 4321;
var http = require('http');

// Indebted to http://51elliot.blogspot.com/2013/08/testing-expressjs-rest-api-with-mocha.html for help with this

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
  };
  return options;
}

describe('app', function () {
 
  before (function (done) {
  	//debugger;
    app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
	});
  });
 
  after(function (done) {
    //app.close();
    done();
  });
 
  it('should be created', function (done) {
    should.exist(app);
    done();
  });
 
  it('should be listening', function (done) {
    var headers = defaultGetOptions('/');
    http.get(headers, function (res) {
      res.statusCode.should.eql(404);
      done();
    });
  });

  it('should have myendpoint api route', function (done) {
    var headers = defaultGetOptions('/api/myendpoint');
    http.get(headers, function(res) {
      res.statusCode.should.eql(200);
      done();
    });
  });

  it('should have myendpoint/mycustom api route', function (done) {
    var headers = defaultGetOptions('/api/myendpoint/mycustom');
    http.get(headers, function(res) {
      res.statusCode.should.eql(200);
      done();
    });
  });
 
});
