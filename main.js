/*
Main file for running everthing/testing
*/
require('@google-cloud/debug-agent').start();


var express=require("express");
var app=express();

var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var databaseClient=require("./server/helpers/dbclient");
var DataService=require("./server/helpers/dataservice");

var DBMongo= new databaseClient.DBClient("Stocks");


function respondData(data,res ) {
	//console.log(data);
	//res.write(JSON.stringify(data), (err)=> res.end());
	res.end(JSON.stringify(data));
}
app.get("/", function(req,res) {
	res.end("This is the index page");
	});


app.get("/stocks/:ticker/:beginning-:end", function(req, res) {

	var beginning=+req.params["beginning"];
	var end=req.params["end"];

	if( (end+"").toUpperCase()== "NOW") {
		end=Number.MAX_VALUE;
	} else {
		end=+end;
	}

	var ticker=req.params["ticker"].toUpperCase();
	console.log("beginning", beginning);
	console.log('end', end);
	console.log("ticker", ticker); 
	 
	//If a data service already exists then just access dat0-1600000000abase
	if(DataService.serviceExists(ticker)) {
		console.log("Service exists: retrieving DATA");
		DBMongo.getDayRange(beginning, end, ticker, (data) =>respondData(data,res));
	} else {
		//Service does not exist, data is null/outdated
		//Need to scrape data, put in database, then call range
		DataService.dataRoutine(ticker, 15, function(data) {

			DBMongo.insertDays(data,ticker, function() {
				DBMongo.getDayRange(beginning, end, ticker,(data) =>respondData(data,res));
			});

		} );
		//setup data service for that ticker
		DataService.service(ticker);
	}
});

console.log("STARTING");
app.listen(8080);
