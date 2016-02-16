var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

router.post('/', function(req, res, next) {
  var db_id = req.body.db_id;
  UserData.findOne({
    '_id' : db_id
  }, function(err, doc){
    if(err){
      console.log(err);
    }
    var name = doc.name;
    var tweet = doc.tweet;
    res.render('personal', {name : name,
                            tweet : tweet
    });
  });
});

module.exports = router;
