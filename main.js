/*
Main file for running everthing/testing
*/

var express=require("express");
var app=express();

var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var databaseClient=require("./server/helpers/dbclient");
var DataService=require("./server/helpers/dataservice");

var DBMongo= new databaseClient.DBClient("Stocks");





app.get("/stocks/:ticker/:beginning-:end", function(req, res) {

	var beginning=+req.params["beginning"];
	var end=+req.params["end"];
	var ticker=req.params["ticker"].toUpperCase();
	console.log("beginning", beginning);
	console.log('end', end);
	console.log("ticker", ticker);
	//DBMongo.getDayRange(beginning, end, ticker,
	 console.log(DBMongo.getDayRange(beginning,end, ticker,
	 function(data) {
	 	console.log(data);
	 	res.write(JSON.stringify(data));
	 	res.end();

	 }));
	// var data=DBMongo.getDayRange(beginning, end, ticker);
	 /*console.log("Data", data);
	 res.write(JSON.stringify(data));
	 res.end();*/
	//console.log("after the fact...");

});



var run= function(data) {

	//console.log(data);
	DBMongo.init();
	//DBMongo.makeTable("FB");
	//for ttesting
	//data=data.slice(0,1);
	DBMongo.insertDays(data, "FB");
	//console.log(data)
	//data=DBMongo.getDayRange(0, 1500040000, "FB");
	//console.log(data)
}



/*test data service for multiple symbols 
var symbols=["AAPL", "FB", "IBM", "GOOG", "GPRO"]
//symbols.forEach((e) => DataService.service(e, false));
DataService.service("AAPL", true);
setInterval( () => DBMongo.displayDBContents("AAPL"), 60000);*/
/*
symbols.forEach( (e) => setInterval(() => displayDBContents(e), 61000));


symbols.forEach(  
	(e) => setTimeout(  ()=>DataService.setRefresh(false, e), 65000 ));
*/

//displayDBContents("FB");
//console.log(d);
app.listen(8000);