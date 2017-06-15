var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
/* GET home page. */
router.all('/', function(req, res, next) {
    //获取分类
    mongoClient.connect(dbUrl, function(err, db) {
        var collection = db.collection('cate');
        collection.find().toArray(function (err, result) {
            if (err) {
                console.log('查询失败');
                return false;
            }
            res.render('admin/add', {result:result});
        });
    });
    //获取post参数
    // console.log(req);
    // console.log(req.body);
    // var data = req.body;
    // if (data.title) {
    //     var oDate = new Date();
    //     data.time  = oDate.getTime();
    //     mongoClient.connect(dbUrl, function(err, db) {
    //         var collection = db.collection('list');
    //         collection.insert(data, function(err, result) {
    //             if (err) {
    //                 console.log('Error:' + err);
    //                 return;
    //             }
    //             console.log('插入成功');
    //             res.render('admin/add', { message: '插入成功'});
    //             db.close();
    //         });
    //     });
    // } else {
    //     res.render('admin/add', {message:'无'});
    // }
});

module.exports = router;/**
 * Created by Administrator on 2017/4/25.
 */
