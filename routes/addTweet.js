var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

router.post('/', function(req, res, next) {
  var date = req.body.new_date;
  var feeling = req.body.new_feeling;
  var tweet = req.body.new_tweet;
  var user_id = req.body.id;
console.log(user_id);
  var new_tweet = {'date' : date, 'feeling' : feeling, 'word' : tweet};
  UserData.findOne({
    'id' : user_id
  },function(err,doc){
    if(err){
      console.log(err);
    }
    doc.tweet.unshift(new_tweet);
    doc.save();
    res.redirect("/");
  });
});

module.exports = router;
