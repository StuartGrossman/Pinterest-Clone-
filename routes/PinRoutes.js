var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var express = require('express');
var router = express.Router();
// var PinComment = mongoose.model('PinComment');
var jwt = require("express-jwt");


var auth = jwt({
	secret: "_secret_sauce",
	userProperty: "payload"
})

router.use('/', function(req, res, next){
	console.log('in middle ware line 14')
	next();
})

router.param('id', function(req, res, next, id) {
	console.log('in params function')
	console.log(id);
	Pin.findOne({_id:id}).populate('comments').exec(function(err, pin){
		console.log('this is the pin ' + pin)
		req.pin = pin
		next();
	})
});

router.post('/', function(req, res){
	console.log(req.body)
	var pin = new Pin(req.body)
	pin.save(function(err, response){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!response) return res.status(400).send({err: "Could not create that pin."});
		res.send({_id: response._id});
	})
})

router.get('/', function(req, res){
	Pin.find({})
	.exec(function(err, pins) {
		// console.log(pins)
		if(err) return res.status(500).send({err: "error getting all pins"});
		if(!pins) return res.status(500).send({err: "pins do not exist"});
		res.send(pins);
	});
})

router.get('/:id', function(req, res){
		res.send(req.pin)
})





module.exports = router;