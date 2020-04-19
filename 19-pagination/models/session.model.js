var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  cart: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
