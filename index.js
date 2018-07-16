var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var m = require('moment');
var topic = 'order-one-min-data';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var port = 3001;
//var Cloudant = require('@cloudant/cloudant');
//var cloudant = Cloudant(process.env.CLOUDANT_DB_URL);
 
//connect to rai DB
//var rai = cloudant.use(process.env.RAI_DB);
  
  //create index in db on status no if not existing
//   var status = {name:'status', type:'json', index:{fields:['status']}};
//                 rai.index(status, function(er, response) {
//                   if (er) {
//                                 console.log("Error creating index on status no:"+ er);
//                                 }else{
//                                 console.log('Index creation result on status:'+ response.result);
//                   }
//                 });
                
                
 
app.get('/', function(req, res){
    res.sendfile('indexdyna.html');
});
    var seriesData = [];
 var dataPoint=[];
 var shipped;
 var processed;
 var delivered;
io = io.on('connection', function(socket){
    console.log('a user connected');
 // cloudant db query starts here
//                 rai.find({selector:{status:String("shipped")}}, function(er, result) {
//                   if (er) {
//                                 console.log("Error finding documents");
//                   }
//                   console.log('Found documents with EID count:'+  result.docs.length); 
//                   if(result.docs.length > 0){
//                         var ShippedRecords=result.docs[0];
//                         for (var i = 0; i < result.docs.length; i++) {
//                           console.log('Doc:'+ JSON.stringify(result.docs[i]));
//                          console.log('Status:' + result.docs[i].status);       
    // dataPoint={
    // "shipped":result.docs.length,
    // "processing":20,
    // "delivered":40
    // }
  // console.log("dataPoint"+ JSON.stringify(dataPoint));
   // socket.emit("message", dataPoint);                                                                }
//                 }              
//                 else
//                    res.json({success : true, message:"Found "+result.docs.length+" documents", ShippedRecords:{}});             
// });

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("mydb");
dbo.collection("customers").find({ status:"shipped"}).toArray(function(err, result) {
    if (err) throw err;
    console.log("result inside find are:"+result.length);
    db.close();
 shipped = result.length;
 });
dbo.collection("customers").find({ status:"processed"}).toArray(function(err, result) {
    if (err) throw err;
    console.log("result inside find are:"+result.length);
    db.close();
 processed = result.length;
 });
dbo.collection("customers").find({ status:"delivered"}).toArray(function(err, result) {
    if (err) throw err;
    console.log("result inside find are:"+result.length);
    db.close();
 delivered = result.length;
 });
  });
console.log("result outside shipped are:"+shipped);
console.log("result outside processed are:"+processed);
console.log("result outside delivered are:"+delivered);
dataPoint={
    "shipped":shipped,
     "processing":processed,
     "delivered":delivered
 }
 console.log("dataPoint"+ JSON.stringify(dataPoint));
 socket.emit("message", dataPoint); 
 
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
http.listen(port, function(){
    console.log("Running on port " + port)
});
