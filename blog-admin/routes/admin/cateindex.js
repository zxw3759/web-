var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';

/* GET home page. */
router.get('/', function(req, res, next) {
    //查询分类
    mongoClient.connect(dbUrl, function(err, db) {
        // console.log(1);
        if (err) {
            console.log('连接失败:'+err);
            return ;
        }
        // res.render('admin/cateindex', { result: result});
       var collection = db.collection('cate');
       collection.find().toArray(function(err, result) {
            if (err) {
                console.log('查询失败:' + err);
                return ;
            }
            res.render('admin/cateindex', { result: result});
       });
    });
});
module.exports = router;
