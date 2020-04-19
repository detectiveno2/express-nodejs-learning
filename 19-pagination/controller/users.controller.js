var User = require('./../models/user.model.js');

module.exports.index = function (req, res) {
  User.find().then(function (user) {
    res.render('users/index.pug', {
      users: user,
    });
  });
};

module.exports.search = async function (req, res) {
  var q = req.query.q;
  var users = await User.find();
  var matchedUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index.pug', {
    users: matchedUsers,
    queryInput: q,
  });
};

module.exports.create = function (req, res) {
  res.render('users/create.pug');
};

module.exports.postCreate = function (req, res) {
  req.body.avatar = req.file.path.split('/').slice(1).join('/');

  var newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    avatar: req.body.avatar,
  });

  User.insertMany([newUser], function (err, user) {
    if (err) {
      console.log(err);
    }
  });

  res.redirect('/users');
};

module.exports.view = async function (req, res) {
  var user = await User.findById(req.params.id);
  res.render('users/view.pug', {
    user: user,
  });
};
