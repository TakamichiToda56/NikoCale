var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserData = require('../db.js').UserData;

// dummy data
var member = [{ 'id' : "hoge",
                'pass' : "fuga",
                'name' : "ほげ",
                'tweet' : [{'date' : "formatted", 'feeling' : "fine", 'word' : "Hello"}]},
              { 'id' : "aaa",
                'pass' : "bbb",
                'name' : "あああ",
                'tweet' : [{'date' : "formatted", 'feeling' : "fine", 'word' : "Hello"}]}]

/* GET home page. */
router.get('/', function(req, res, next) {
  msg = 'ログインしていません';
  if(req.session != null){
    if(req.session.login == true){
      msg = req.session.name + 'でログインしています';
      res.render('index', {
        msg: msg,
        docs : []
      });
    }else{
      res.render('index', {
        msg: msg,
        docs : []
      });
    }
  }else{
    res.render('index', {
      msg: msg,
      docs : []
    });
  }
});

/* POST home page. */
router.post('/', function(req, res, next) {
  var user_id = req.body.user_id;
  var user_pass = req.body.user_pass;
  var msg = '';
  var correct_pass = serchPass(member,user_id);
  if(correct_pass != null && correct_pass == user_pass){
    msg = user_id + 'でログインしました';
    req.session.login = true;
    req.session.name = user_id;
    UserData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      res.render('index', {
        msg: msg,
        docs : docs
      });
    });

  }else{
    req.session.login = false;
    res.render('index', {
      msg: 'ログインに失敗しました',
      docs : []
    });
  }
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
