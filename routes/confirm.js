var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var id = req.body.new_id;
  var pass = req.body.new_pass;
  var name = req.body.new_name;
  res.render('confirm', { id: id,
                          pass: pass,
                          name: name});
});

module.exports = router;
