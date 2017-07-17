var scraper=require("./server/helpers/scraper");
var parser=require("./server/helpers/parser");
var candle=require("./server/objects/candle");
var databaseClient=require("./server/helpers/dbclient");
var DataService=require("./server/helpers/dataservice");

var DBMongo= new databaseClient.DBClient("Stocks");


exports.tickers=["FB", "GOOG","AAPL", "T", "ORCL","AMZN", "DIS", "WMT", "HD","PG", 
"MO", "RAI", "NKE", "JPM", "WFC", "BAC", "BRK-B","C", "V",
"GE", "BA", "UTX", "JNJ", "PFE", "XOM", "CVX"  ];
