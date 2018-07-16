var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//var url = "mongodb+srv://mongouser_01:mongouser01@ecomstream-tv6mm.mongodb.net/test?retryWrites=true";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("mydb");
 //query to insert many records
 var myobj = [{ orderDate: new Date(),orderId:"12345", status: "shipped" },
{ orderDate: new Date(),orderId:"12346", status: "shipped" },
{ orderDate: new Date(),orderId:"12347", status: "shipped" },
{ orderDate: new Date(),orderId:"12348", status: "shipped" },
{ orderDate: new Date(),orderId:"12349", status: "shipped" },
{ orderDate: new Date(),orderId:"12340", status: "shipped" },
{ orderDate: new Date(),orderId:"12341", status: "shipped" },
{ orderDate: new Date(),orderId:"12342", status: "shipped" },
{ orderDate: new Date(),orderId:"12343", status: "shipped" },
{ orderDate: new Date(),orderId:"45000", status: "processed" },
{ orderDate: new Date(),orderId:"45001", status: "processed" },
{ orderDate: new Date(),orderId:"45002", status: "processed" },
{ orderDate: new Date(),orderId:"45003", status: "processed" },
{ orderDate: new Date(),orderId:"45004", status: "processed" },

{ orderDate: new Date(),orderId:"24161", status: "delivered" },
{ orderDate: new Date(),orderId:"24162", status: "delivered" },
{ orderDate: new Date(),orderId:"24163", status: "delivered" },
{ orderDate: new Date(),orderId:"24164", status: "delivered" },
{ orderDate: new Date(),orderId:"24165", status: "delivered" },
{ orderDate: new Date(),orderId:"24166", status: "delivered" },
{ orderDate: new Date(),orderId:"24167", status: "delivered" },
{ orderDate: new Date(),orderId:"24168", status: "delivered" },
{ orderDate: new Date(),orderId:"24169", status: "delivered" },
{ orderDate: new Date(),orderId:"24160", status: "delivered" }
];
 dbo.collection("customers").insertMany(myobj, function(err, res) {
     if (err) throw err;
     console.log("Number of documents inserted: " + res.insertedCount);
    //db.close();
   });
//query to delete records:
//var myquery = { status: "shipped" };
 //dbo.collection("customers").deleteMany(myquery, function(err, obj) {
  //  if (err) throw err;
   // console.log("1 document deleted");
   // db.close();
  //});

dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log("result are:"+JSON.stringify(result));
  console.log("result are:"+result.length);
    db.close();
  });
});
