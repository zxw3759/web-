var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';

/* GET home page. */
router.get('/', function(req, res, next) {
    //获取列表数据
    mongoClient.connect(dbUrl, function(err,db) {
       if (err) {
           console.log('connect err:' + err);
           return;
       }
       console.log('连接成功');
       var collection = db.collection('list');
       collection.find().sort({time:-1}).toArray(function(err, result) {
           if (err) {
               console.log('err:' +err);
               return ;
           }
           for(var i=0;i<result.length;i++) {
               result[i]['createTime'] = getDate(result[i]['createTime']);
           }
           res.render('admin/index', { result: result});
       });
    });

});
function getDate(time) {
    var oDate = new Date();
    return oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + oDate.getDate();
}

module.exports = router;
