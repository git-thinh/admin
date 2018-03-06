var express = require('express');
var https = require('https');
var fs = require('fs');

var options = {
  cert: fs.readFileSync('localhost-cert.pem'),
  key: fs.readFileSync('localhost-privkey.pem')
};
var app = express();
var serveIndex = require('serve-index');

var path = require('path');
var __dirname = path.dirname(require.main.filename);
var serveStatic = require('serve-static');
var port = process.env.PORT || 99;

/**for files */
app.use(serveStatic(path.join(__dirname, 'www')));
/**for directory */
app.use('/', express.static('www'), serveIndex('www', {'icons': true}))

var server = https.createServer(options, app);
server.listen(8001, function(){
	console.log("server running at https://IP_ADDRESS:8001/")
});