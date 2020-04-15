module.exports.requirePage = function (req, res, next) {
  if (!req.query.page) {
    res.redirect('/products?page=1');
    return;
  }
  next();
};
