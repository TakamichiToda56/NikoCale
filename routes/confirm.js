var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var id = req.body.new_id;
  var name = req.body.new_name;
  res.render('confirm', { id: id,
                          name: name});
});

module.exports = router;
