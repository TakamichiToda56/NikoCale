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
        res.render('index', {
          msg: msg,
          docs : docs,
          user_id : user_id
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

/* POST home page. */
router.post('/', function(req, res, next) {
  var user_id = req.body.user_id;
  var user_pass = req.body.user_pass;
  var msg = '';
  UserData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    var correct_pass = serchPass(docs,user_id);
    if(correct_pass != null && correct_pass == user_pass){
      var user_name = serchName(docs,user_id);
      msg = user_name + 'でログインしました';
      req.session.login = true;
      req.session.name = user_name;
      req.session.user_id = user_id;
      res.render('index', {
        msg : msg,
        docs : docs,
        id : user_id
      });
    }else if(req.body.logout == "true"){
      req.session.login = false;
      req.session.id = "";
      res.render('index', {
        msg : 'ログアウトしました',
        docs : [],
        id : ""
      });
    }else{
      req.session.login = false;
      req.session.id = "";
      res.render('index', {
        msg: 'ログインに失敗しました',
        docs : [],
        id : ""
      });
    }
  });
});

module.exports = router;

// --- functions ---
serchPass = function(db_data,serchId){
  passwd = null;
  for (var i = 0; i < db_data.length; i++) {
    if(db_data[i].id == serchId){
      passwd = db_data[i].pass;
    }
  }
  return(passwd);
}

serchName = function(db_data,serchId){
  name = null;
  for (var i = 0; i < db_data.length; i++) {
    if(db_data[i].id == serchId){
      name = db_data[i].name;
    }
  }
  return(name);
}
