/**
 * 编辑分类
 */

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;
test = require('assert');
/* GET users listing. */
router.all('/', function(req, res, next) {
    var id = req.query.id;
    console.log(req.query);
    //获取当前id的详情
    if(id) {
       mongoClient.connect(dbUrl, function(err, db){
          if (err) {
              console.log('缺少参数'+err);
              return ;
          }
          console.log(id);
          var collection = db.collection('cate');
          collection.find({_id:ObjectID(id)}).toArray(function(err, result) {
              if (err) {
                  console.log('查询失败');
                  return ;
              }
              console.log('查询成功');
              console.log(result);
              res.render('./admin/cateedit', {result:result});
          });
       });
    } else {
        res.render('./admin/cateedit');
    }
});

module.exports = router;
