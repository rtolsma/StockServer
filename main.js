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


function respondData(data,res ) {
	console.log(data);
	res.write(JSON.stringify(data));
	res.end();
}

app.get("/stocks/:ticker/:beginning-:end", function(req, res) {

	var beginning=+req.params["beginning"];
	var end=+req.params["end"];
	var ticker=req.params["ticker"].toUpperCase();
	console.log("beginning", beginning);
	console.log('end', end);
	console.log("ticker", ticker); 
	 
	//If a data service already exists then just access database
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
	 
	// var data=DBMongo.getDayRange(beginning, end, ticker);
	 /*console.log("Data", data);
	 res.write(JSON.stringify(data));
	 res.end();*/
	//console.log("after the fact...");




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
DataService.service("AAPL", true);
console.log(DataService.serviceExists("AAPL"));
//DBMongo.getDayRange(0,99600000000, "AAPL", (data)=> {console.log(data)});

app.listen(8000);