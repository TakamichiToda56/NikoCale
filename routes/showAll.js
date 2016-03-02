var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

/* GET home page. */
router.get('/', function(req, res, next) {
  msg = 'ログインしていません';
  if(req.session != null || req.body.logout == "true"){
    if(req.session.login == true){
      msg = req.session.name + 'でログインしています';
      var user_id = req.session.user_id;
      UserData.find(function(err,docs){
        if(err){
          console.log(err);
        }
        docs.sort(function(a,b){
          if(Date.parse(a.tweet[0].date) > Date.parse(b.tweet[0].date)) return -1;
          if(Date.parse(a.tweet[0].date) < Date.parse(b.tweet[0].date)) return 1;
          return 0;
        });
        res.render('showAll', {
          msg: msg,
          docs : docs,
          id : user_id
        });
      });
    }else{
      res.render('index', {
        msg: msg,
        docs : [],
        id : ""
      });
    }
  }else{
    res.render('index', {
      msg: msg,
      docs : [],
      id : ""
    });
  }
});

module.exports = router;
