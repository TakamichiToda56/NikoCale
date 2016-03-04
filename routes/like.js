var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

router.post('/', function(req, res, next) {
  var like_id = req.body.likeId;
  var user_id = req.body.id;
  var tweet_id = req.body.tweetId;
  UserData.findOne({
    '_id' : tweet_id
  },function(err,doc){
    if(err){
      console.log(err);
    }

    var tweet = doc.tweet
    for (var i = 0; i < tweet.length; i++) {
      var tId = tweet[i]._id;
      if(tId == like_id){
        var like = tweet[i].like
        if(doc.tweet[i].like.indexOf(user_id)==-1){
          doc.tweet[i].like.push(user_id);
        }
      }
    }

    doc.save();
    res.redirect("/");
  });
});

module.exports = router;

searchForLike = function(doc,id,user){
  var tweet = doc.tweet
  for (var i = 0; i < tweet.length; i++) {
    var tId = tweet[i]._id;
    if(tId == id){
      doc.tweet[i].like.push(user)
    }
  }

  return(doc)
}
