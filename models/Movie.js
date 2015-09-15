var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
	title: String,
	created: Date,
	rating: Number, //0 - 10 user rating,
	director: mongoose.Schema.Types.Mixed,
	actors: [{ type: String }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MovieComment' }]
});

mongoose.model('Movie', MovieSchema);
