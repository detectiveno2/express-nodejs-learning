var express = require('express');
var app = express();

var port = 3000;

var users = [
    { id: 1, name: 'Thien' },
    { id: 2, name: 'Hieu' },
    { id: 3, name: 'Trung' }
];

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.render('index.pug');
});

app.get('/users', function(req, res) {
    res.render('users/index.pug', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index.pug', {
        users: matchedUsers,
        queryInput: q
    });
})

app.get('/users/create', function(req, res) {
    res.render('users/create.pug');
})

app.post('/users/create', function(req, res) {
    var bodyParser = require('body-parser');
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function() {
    console.log('Server is listening on: ' + port);
});

