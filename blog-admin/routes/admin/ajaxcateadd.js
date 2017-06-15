/**
 * Created by Administrator on 2017/4/27.
 */
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;
router.get('/', function(req, res, next) {
    var data = req.query;
    if (!data.id) {
        mongoClient.connect(dbUrl, function(err, db) {
            var collection = db.collection('cate');
            collection.insert(data, function(err, result) {
                if (err) {
                    console.log('err:' +err);
                    res.json({message: '添加失败'})
                    return false;
                }
                console.log('添加成功');
                res.json({message:'添加成功'});
                db.close();
            })
        });
    } else {
        mongoClient.connect(dbUrl, function(err, db) {
           if (err) {
               console.log('连接失败:'+err);
               return;
           }
           var collection = db.collection('cate');
           collection.update({_id:ObjectID(data.id)}, {name:data.name}, function(err, result){
               if (err) {
                   console.log('修改失败');
                   return ;
               }
               console.log('修改成功');
               res.json({message:'修改成功'});
           });
        });
    }
});
router.all('./', function(req, res, next) {

});
module.exports = router;
