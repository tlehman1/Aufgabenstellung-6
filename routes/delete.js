var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'newpois' // collection name

/* GET delete page. */
router.get('/', function(req, res, next) 
{
  res.render('delete', { title: 'Delete Page' });

  getPOIs(client, dbName, collectionName, req)
});

async function getPOIs(client, dbName, collectionName, req) {
  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)

  const cursor =  collection.find({})
   
  const results = await cursor.toArray()
  var finalString = "";
  for(var i = 0; i < results.length; i++) {
    finalString = finalString + " " + results[i].poiname + " " + results[i].coordinates + "br" 
  }
  req.body.elements = finalString

  console.log(finalString);
  //collection.deleteOne(poi) // see https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
  //console.log(`Poi ${poi.poiname} deleted from the database`);
}


router.post('/deletedPoi', function(req, res, next) {
  let poi = {}
  poi.poiname = req.body.pname

  console.log(poi)

  deleteNewPOItoDB(client, dbName,collectionName, poi, res)
})




async function deleteNewPOItoDB(client, dbName, collectionName, poi, res) 
{

  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)
  


  collection.deleteOne(poi) // see https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
  console.log(`Poi ${poi.poiname} deleted from the database`);
 
  // pass the data added as input for the notification page
  res.render('delete_notification', {title: "Delete Completed", newpoi: poi, data: []})


}


module.exports = router;