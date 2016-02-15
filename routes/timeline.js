var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

router.post('/', function(req, res, next) {
  var name = req.body.new_name;
  var pass = req.body.new_pass;
  UserData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    var newUserData = new UserData({
      'name' : name,
      'pass' : pass,
      'tweet' : [{'feeling' : "good", 'word' : "Hello"}]
    });
    newUserData.save();
    res.render('timeline', { title : 'Incubation　Twitter',
                              docs : docs
              });
  });
});

module.exports = router;
