/*
This will periodically retrieve data from Google and update
the databases with new candlesticks

Gets 1 min data


Every 60 seconds, calls the scraper to get new data
Scraper will execute callback on finish, which simply
Stores/upserts the data into the database
*/
var databaseclient=require("./dbclient");
const DBMongo=new databaseclient.DBClient("Stocks");
var scraper=require("./scraper");
var refresh=true;
var timers={};




function serviceExists(ticker) {
	if(timers[ticker]!=null) {
		return true;
	}
	return false;
}
function setRefresh(shouldRefresh, ticker) {
	if(!shouldRefresh) {
		clearInterval(timers[ticker]);
	}
}
//first time around gets past 15 days if isNew
//then on only does most recent
function service(ticker, isNew=false) {
	if(timers[ticker]) return; //already established a service
	DBMongo.init();
	//DBMongo.makeTable(ticker);

	if(isNew) dataRoutine(ticker, 15,
	 (data)=>	DBMongo.insertDays(data, ticker));

	

	timers[ticker]=setInterval(
		 () => dataRoutine(ticker, 1,
		 	(data) =>DBMongo.insertDays(data, ticker)), 60*1000);
	// function { dataRoutine(ticker,1, scraperCallback)}




}
//assumes 1 min interval
function dataRoutine(ticker, days, callback) {

	scraper.getData(60, days, ticker, callback);


}

exports.service=service;
exports.dataRoutine=dataRoutine;
exports.setRefresh= setRefresh;


exports.serviceExists= serviceExists;
