var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res) {
    res.render('index.pug');
})

app.get('/users', function(req, res) {
    res.render('users/index.pug', {
        users: [
            { id: 1, name: 'Thien' },
            { id: 2, name: 'Hieu' },
            { id: 3, name: 'Trung' }
        ]
    });
})

app.listen(port, function() {
    console.log('Server is listening on: ' + port);
})
