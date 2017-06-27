/*
This will periodically retrieve data from Google and update
the databases with new candlesticks

Gets 1 min data


Every 60 seconds, calls the scraper to get new data
Scraper will execute callback on finish, which simply
Stores/upserts the data into the database
*/
var databaseclient=require("./dbclient");
var DBMongo=new databaseclient.DBClient("Stocks");
var scraper=require("./scraper");
var refresh=true;
var timer;
function service(ticker) {

	DBMongo.init();
	DBMongo.makeTable(ticker);


	var scraperCallback=function (data) {

	DBMongo.insertDays(data, ticker);

}

	dataRoutine(ticker, 15, scraperCallback);

	

	timer=setInterval(() => dataRoutine(ticker, 1, scraperCallback), 60*1000);





}
//assumes 1 min interval
function dataRoutine(ticker, days, callback) {

	scraper.getData(60, days, ticker, callback);


}

exports.service=service;
exports.setRefresh= function(shouldRefresh) {
	if(!shouldRefresh) {
		clearInterval(timer);
	}
}