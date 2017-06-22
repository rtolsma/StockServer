/*
Main file for running everthing
*/

var scraper=require("./scraper")
var parser=require("./parser")
var candle=require("./parser")
var daycandle=require("./daycandle")
var databaseClient=require("./dbclient")


var DBMongo= new databaseClient.DBClient("Stocks");



var run= function(data) {

	//console.log(data);
	DBMongo.init();
	console.log("Initialized table");
	console.log("Made table");

	//DBMongo.insertDays(data, "FB");
	//console.log(data)
	console.log(  DBMongo.getDayRange(0, Infinity, "FB"));

}

scraper.getData(60,1,"FB", run);



