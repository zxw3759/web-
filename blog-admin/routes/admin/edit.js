/**
 * 修改文章
 */
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next){
    var data = req.query;
    if (data.id) {
        var result;
        mongoClient.connect(dbUrl, function(err, db) {
            var collection = db.collection('list');
            collection.find({_id:ObjectID(data.id)}).toArray(function(err, resultInfo) {
                if (err) {
                    console.log('查询出错');
                    return false;
                }
                var colType = db.collection('cate');
                colType.find().toArray(function(err, resultType) {
                    if (err) {
                        console.log('分类查询出错');
                        return false;
                    }
                    console.log('分类查询出错');
                    res.render('./admin/edit', {resultInfo:resultInfo[0], resultType:resultType});
                });
            });
        });
    } else {
        res.render('./admin/edit');
    }
});

module.exports = router;