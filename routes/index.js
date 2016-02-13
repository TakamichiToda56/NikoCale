var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user_list = ["a","b","c"];
  var user_tweet = ["hello","hoge","aaaaaa"];
  var latest_tweet = ["hello","hoge","aaaaaa"];
  res.render('index', { title: 'Incubation　Twitter',
                        user_list: user_list,
                        latest_tweet: latest_tweet});
});

module.exports = router;
