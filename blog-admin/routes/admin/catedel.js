var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res,next) {
    var data = req.query;
    if (data.id) {
        mongoClient.connect(dbUrl, function(err, db) {
           if (err) {
               console.log('连接失败');
               return ;
           }
           var collection = db.collection('cate');
           collection.remove({_id:ObjectID(data.id)}, function(err, result) {
               if (err) {
                   console.log('删除失败');
                   res.json({message:'删除失败'});
                   return ;
               }
               var colInfo = db.collection('list');
               colInfo.remove({type: data.name}, function(err, result) {
                  if (err) {
                      console.log('删除失败');
                      res.json({message:'删除失败'});
                      return;
                  }
                  console.log('删除成功');
                  res.json({message:'删除成功'});
               });
           });
        });
    } else {
        res.json({message:'缺少参数'});
        // res.redirect('./admin/index');
    }
});

module.exports = router;
