/*
Main file for running everthing
*/

var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var databaseClient=require("./server/helpers/dbclient");


var DBMongo= new databaseClient.DBClient("Stocks");



var run= function(data) {

	//console.log(data);
	DBMongo.init();
	//DBMongo.makeTable("FB");
	//for ttesting
	//data=data.slice(0,1);
	//DBMongo.insertDays(data, "FB");
	//console.log(data)
	data=DBMongo.getDayRange(0, 1500040000, "FB");
	console.log(data)
}

 function displayDBContents(table) {
 	console.log("Displaying DB Contents")
 	DBMongo.mongoClient.connect(DBMongo.uri, function(err, db) {

 		if(err) console.error(err);

 		db.collection(table).find().forEach(e => console.log(e));

 	}  )
}



scraper.getData(60,1 ,"FB", run);
displayDBContents("FB");


