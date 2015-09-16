var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var PinComment = mongoose.model('PinComment'); //Multiple ways of bringing authentication from different providers. such as fb, local, google, twitch


// router.use('/', function(req, res, next){
// 	console.log('in middle ware line 9')
// 	next();
// })
router.param('id', function(req, res, next, id){
	User.findOne({_id: id}).populate('pins').exec(function(err, user_id){

		console.log('this is the user ' + user_id)
		// user.populate('pins', function(){
			req.user = user_id
			next();
		// })
	})
})

router.post('/register', function(req, res) {
	console.log('in the register function')
	var user = new User(req.body); //bringing in the request, and adding a document from our schema.
	user.setPassword(req.body.password); //We are running a model function, which encrypts our password.
	user.save(function(err, result) { //we are saving that user to our collection
		if(err) console.log(err); //if err console.log err, either 400-500
		if(err) return res.status(500).send({err: "Issues with the server"}); //server error
		if(!result) return res.status(400).send({err: "You messed up."}); //error in saving
		 //completing the post.
	})

});

router.post('/login', function(req, res, next) { //goes to passport module, in config.
	// console.log('this is the req in userpost ' + req);
	passport.authenticate('local', function(err, user, info){ //calling from the passport
		if(!user) return res.status(400).send(info);
		res.send({token: user.generateJWT()}); //generating a token when there is a user in the collection.
	})(req, res, next);
});

router.get('/:id', function(req, res){
	// console.log('inside get request for user');
	res.send(req.user)
})

module.exports = router;
