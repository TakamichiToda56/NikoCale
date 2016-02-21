var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

require('date-utils');

router.post('/', function(req, res, next) {
  var id = req.body.new_id;
  var name = req.body.new_name;
  var dt = new Date();
  var formatted = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
  UserData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    var newUserData = new UserData({
      'id' : id,
      'pass' : "",
      'name' : name,
      'tweet' : [{'date' : formatted, 'feeling' : "fine", 'word' : "Hello"}]
    });
    newUserData.save();
    res.redirect("/");
  });
});

module.exports = router;
