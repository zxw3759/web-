var express = require('express');
var router = express.Router();


var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = req.query;
    var where = data.type?{type:data.type}:{}
    var limit = 5;
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            console.log('err:'+err);
            return false;
        }
        var collection = db.collection('list');
        collection.find(where).limit(limit).skip((data.page-1)*limit).toArray(function(err,resultInfo){
            if (err) {
                console.log('查询失败');
                return false;
            }
            for(var i=0;i<resultInfo.length;i++) {
                resultInfo[i]['createTime'] = getDate(resultInfo[i]['createTime']);
                resultInfo[i]['url'] = './detail?id='+resultInfo[i]['_id'];
            }
            var colType = db.collection('cate');
            colType.find().toArray(function(err, resultType) {
                if (err) {
                    console.log('分类查询失败');
                    return false;
                }
                console.log(resultType);
                res.render('./index', {type:data.type,resultInfo:resultInfo,resultType:resultType, page:Math.ceil(resultInfo.length/limit)});
            });
        });
    });
});
function getDate(time) {
    var oDate = new Date();
    return oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + oDate.getDate();
}
module.exports = router;
