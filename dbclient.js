var mongo=require("mongodb");
const url= "mongodb://localhost:27017/"
var MongoClient=mongo.MongoClient;

class DBClient {
	
	constructor(name) {
		this.uri=url+name;
		this.mongoClient=require("mongodb").MongoClient;
	}

/* 
Creates the database if none exists, otherwise
just simply connects
*/
	init() {

		this.mongoClient.connect(this.uri, function(err,db) {

			if(err) console.error(err);

			db.close();

		});
	}

	/*
		Connects to the database and creates a table
		with the specified name
	*/
	makeTable(name) {
		this.mongoClient.connect(this.uri, function(err, db) {

			if(err) console.error(err);

			db.createCollection(name, function(err, res) {
				
				if(err) console.error(err);

			});

			db.close();
		});
	

	}

	/*
		days: an array containing DayCandles
		tableName: name of data table e.g IBM, AAPL

		Adds DayCandles to the data table 
	*/
	insertDays(days, tableName) {
		this.mongoClient.connect(this.uri, function(err, db) {

			if(err) console.error(err);
			db.collection(tableName).insert(days, function(err, res) {
				if(err) console.error(err);
			});

			db.close();
		});
	}
	/*
	Returns all DayCandles within console.log(the range beginning--end
	Non-Inclusive
	*/
	getDayRange(beginning, end , tableName) {
		var candleDayList=[];
		this.mongoClient.connect(this.uri, function(err, db){
			var query= {time: {$gt: beginning, $lt: end }  } ;
			var sort= {time: 1};
			db.collection(tableName)
			.find(query)
			.sort(sort)
			.toArray(function(err, result) {
				if(err) console.error(err);


				result.forEach(function( candleDay) {
					candleDayList.push(candleDay);

				});

			});

		});
		return candleDayList;

	}




}

exports.DBClient=DBClient;