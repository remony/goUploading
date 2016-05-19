var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var livereload = require('livereload');
var sass = require('node-sass');
var port = process.env.PORT || 8080;
// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

var live = livereload.createServer();
live.watch(__dirname + "/");

// Listen
server.listen(3001)
