/**
 * 添加分类
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/', function(req, res, next) {
    res.render('./admin/cateadd');
});

module.exports = router;
