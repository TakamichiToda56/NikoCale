var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

require('date-utils');

router.post('/', function(req, res, next) {
  var name = req.body.new_name;
  var pass = req.body.new_pass;
  var dt = new Date();
  var formatted = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
  UserData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    var newUserData = new UserData({
      'name' : name,
      'pass' : pass,
      'tweet' : [{'date' : formatted, 'feeling' : "fine", 'word' : "Hello"}]
    });
    newUserData.save();
    res.render('timeline', { title : 'Incubation　Twitter',
                              docs : docs
              });
  });
});

module.exports = router;
