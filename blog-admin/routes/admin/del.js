/**
 * 删除文章
 */
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res,next) {
    var id = req.query.id;
    if (id) {
        mongoClient.connect(dbUrl, function(err, db) {
            if (err) {
                console.log('连接失败');
                return false;
            }
            var  collection = db.collection('list');
            collection.remove({_id:ObjectID(id)}, function(err, result) {
                if (err) {
                    console.log('删除失败');
                    return false;
                }
                console.log('删除成功');
                res.json({message:'删除成功'});
            });
        });
    } else {
        res.json({message:'缺少参数'});
    }
});

module.exports = router;

