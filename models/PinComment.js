var mongoose = require('mongoose');

var MovieCommentSchema = new mongoose.Schema({
  created: Date,
  body: String,
  movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('MovieComment', MovieCommentSchema);
