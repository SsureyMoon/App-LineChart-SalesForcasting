var fs = require('fs');
var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app);


app.use('/js', express.static(__dirname + '/js'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/', function (req, res) {
  fs.readFile('index.html', function(err, data){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(8000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
