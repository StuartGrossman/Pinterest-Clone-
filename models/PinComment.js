var mongoose = require('mongoose');

var PinCommentSchema = new mongoose.Schema({
  created: Date,
  body: String,
  pin: {type: mongoose.Schema.Types.ObjectId, ref: 'Pin'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  deleted: {type: Boolean, default: true}
});

mongoose.model('PinComment', PinCommentSchema);
