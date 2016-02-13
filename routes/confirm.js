var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var name = req.body.new_name;
  var pass = req.body.new_pass;
  res.render('confirm', { name: name,
                          pass: pass});
});

module.exports = router;
