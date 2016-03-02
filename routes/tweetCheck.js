var express = require('express');
var router = express.Router();

require('date-utils');

router.post('/', function(req, res, next) {
  var dt = new Date();
  var date = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
  var feeling = req.body.feeling;
  var tweet = req.body.tweet;
  var user_id = req.body.id;
  var show_name = req.body.show_name;
  res.render('tweetCheck', { date: date,
                          feeling: feeling,
                          tweet: tweet,
                          id: user_id,
                          show_name:show_name});
});

module.exports = router;
