var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(request, response) {
    response.send('<h2>Hello world!</h2>');
})

app.listen(port, function() {
    console.log('Server is listening on: ' + port);
})
