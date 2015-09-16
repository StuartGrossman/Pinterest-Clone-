var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PinComment = mongoose.model('PinComment');
var Pin = mongoose.model('Pin');
var jwt = require('express-jwt');
var User = mongoose.model('User')
var auth = jwt({
  'userProperty': 'payload',
  'secret': '_secret_sauce'
});

// router.param('id', function(req, res, next, id){
//   console.log(id)

//   PinComment.findOne({_id: id}).exec(function(){
    
//   })
  
//   next();
// })

var temp;

router.post('/', auth, function(req, res) {

  User.find({_id: req.payload.id}).exec(function(err, response){
    // console.log(req.payload);
    temp = response;
    // console.log('this is response ' + temp)
    temp = temp[0].name
    var comment = new PinComment(req.body);
      comment.created = new Date();
      comment.user = req.payload.id;
      comment.name = temp;
    comment.save(function(err, result) {
      if (err) return res.status(500).send({
        err: "There is a problem"
      });
      if (!result) return res.status(400).send({
        err: "Could not create comment"
      });
      Pin.update({ _id: comment.movie}, 
        {$push: 
          {
            comments: {
              _id: result._id
            }
          }
        }, 
      function(err, movie) {
        if(err) return res.status(500).send({err: "there was an error"});
        if(!movie) return res.status(400).send({err: "this error should never happen"});
        PinComment.findOne({ _id : result._id }).populate("user").exec(function(err, comment) {
            res.send(comment);
        })
      })
  });
})
 
  
});


router.delete('/:id', auth, function(req, res){
  console.log(req.params.id)
  var comment_id = req.params.id;
  PinComment.findOne({_id: req.params.id}).exec(function(err, response){
    console.log(response)
    response.update({deleted: false}).exec(function(err, comment){
      console.log(comment);
    })

    res.send();
  })
})

module.exports = router;
