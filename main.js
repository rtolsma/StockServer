/*
Main file for running everthing
*/

var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var daycandle=require("./server/objects/daycandle");
var databaseClient=require("./server/helpers/dbclient");


var DBMongo= new databaseClient.DBClient("Stocks");



var run= function(data) {

	//console.log(data);
	DBMongo.init();
	//DBMongo.makeTable("FB");
	//for ttesting
	//data.candles=data.candles.slice(0,5);
	DBMongo.insertDays(data, "FB");
	//console.log(data)
	console.log(  DBMongo.getDayRange(0, 1499000000, "FB"));

}

scraper.getData(60,1,"FB", run);



