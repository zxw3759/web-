var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;
router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id) {
        mongoClient.connect(dbUrl, function(err,db) {
            if (err) {
                console.log('连接失败');
                return false;
            }
            //获取详情
            var collection = db.collection('list');
            collection.find({_id:ObjectID(id)}).toArray(function(err, result) {
                if (err) {
                    console.log('查询失败');
                    return false;
                }
                result[0]['createTime'] = getDate(result[0]['createTime']);
                //获取评论
                var colComment = db.collection('comment');
                colComment.find({artId:id}).toArray(function(err, comment) {
                    if (err) {
                        console.log('获取评论出错'+err);
                        return false;
                    }
                    for (var i=0;i<comment.length;i++) {
                        comment[i]['createTime'] = getDate(comment[i]['createTime']);
                    }
                    res.render('./detail', {result:result[0],artID:id, comment:comment});
                });
            });
        });
    } else {
        res.json('缺少参数');
    }
});
function getDate(time) {
    var oDate = new Date();
    return oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + oDate.getDate();
}
module.exports = router;

