var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.use(express.static('public'));

router.get('/', function(req, res) {
  res.sendFile('materia.html', {root: path.join(__dirname, '../views')});
});

module.exports = router;
