/*
Main file for running everthing/testing
*/
//require('@google-cloud/debug-agent').start();


var express=require("express");
var app=express();

var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var databaseClient=require("./server/helpers/dbclient");
var DataService=require("./server/helpers/dataservice");
var StockCollector=require("./data.js");
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
	var beginning;
	if(!isNaN(req.params["beginning"])) {
		beginning=+req.params["beginning"];
	} else {
		res.end("beginning is not a number, parameters incorrectly formatted");
		return;
	}

	var end=req.params["end"];
	if(isNaN(end)) {
		if( (end+"").toUpperCase()== "NOW") {
		end=Number.MAX_VALUE;
		} else {
			res.end("End is neither a number or NOW, parameters incorrectly formatted");
			return;
		}
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
function getData(ticker, beginning,end) {
	if(!DataService.serviceExists(ticker)) {
		DataService.dataRoutine(ticker,15, function(data) {
			DBMongo.insertDays(data,ticker, function() {
				console.log("got data");
			});
		});
		DataService.service(ticker);
	}
}



console.log("STARTING");
StockCollector.tickers.forEach( (ticker) => getData(ticker,0, Number.MAX_VALUE));
app.listen(80);
