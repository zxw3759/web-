/**
 * Created by Administrator on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

//mongo
var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/blog';
var ObjectID = require('mongodb').ObjectID;
router.post('/', function(req, res, next) {
   var data = req.body;
   console.log(data);
   if (!data.id) {
       var oDate = new Date();
       data.createTime = oDate.getTime();
       mongoClient.connect(dbUrl,function(err, db) {
           var collection = db.collection('list');
           collection.insert(data, function(err, result) {
               if (err) {
                   console.log('插入失败');
                   res.json({message: '插入失败'});
                   return false;
               }
               console.log('插入成功');
               console.log(result);
               res.json({message: '插入成功'});
           });
       });
   } else {
       var oDate = new Date();
       data.createTime = oDate.getTime();
       mongoClient.connect(dbUrl, function(err, db) {
           var collection = db.collection('list');
           collection.update({_id:ObjectID(data.id)}, data, function(err, result){
              if (err) {
                  console.log('修改失败');
                 res.json({message: '修改失败'});
              }
              console.log('修改成功');
              res.json({message:'修改成功'});
           });
       });
   }
});


// //form表单需要的中间件。
// var mutipart= require('connect-multiparty');
// var mutipartMiddeware = mutipart();
// var app = express();
// app.use(mutipart({keepExtensions: true,uploadDir:'D:\\temp' }));
// router.post('/', mutipartMiddeware, function(req, res, next) {
//     console.log(req.files);
//     if (req.files) {
//         var dbpath = './upload/' + req.files.filename.originalFilename;
//         var uploadPath = req.files.filename.path;
//         var uploadPath=uploadPath.replace(/ADMINI~1/,'Administrator');
//         fs.rename(uploadPath, dbpath, function(err) {
//             if (err) {
//                 console.log('rename error: ' + err);
//             } else {
//                 console.log('rename ok');
//                 res.send('上传文件成功');
//             }
//         });
//     } else {
//         console.log('上传文件失败');
//         res.send('上传文件失败');
//     }
//     res.send('上传文件失败');
// });

module.exports = router;