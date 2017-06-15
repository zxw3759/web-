/**
 * 添加评论
 */
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
router.post('/', function(req, res, next){
    var data = req.body;
    mongoClient.connect(dbUrl, function(err, db) {
       if (err) {
           console.log('连接失败');
           return false;
       }
       var oDate = new Date();
       data['createTime'] = oDate.getTime();
       var collection = db.collection('comment');
       collection.insert(data, function(err, result) {
          if (err) {
              console.log('添加失败');
              return false;
          }
          console.log('添加成功');
          res.json({message:'添加成功'});
       });
   });
});
module.exports =  router;
