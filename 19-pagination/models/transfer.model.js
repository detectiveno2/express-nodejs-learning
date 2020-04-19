var mongoose = require('mongoose');

var transferSchema = mongoose.Schema({
  accountId: String,
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

var Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;
