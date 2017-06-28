var mongo=require("mongodb");
const url= "mongodb://localhost:8080/"
const MongoClient=mongo.MongoClient;
exports.MongoClient=MongoClient;
class DBClient {
	
	constructor(name) {
		this.uri=url+name;
		this.mongoClient=MongoClient;
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

				console.log(res);
			});

			db.close();
		});
	

	}

	/*
		days: a DayCandle
		tableName: name of data table e.g IBM, AAPL

		Adds DayCandle to the data table 
	*/
	insertDays(candles, tableName) {
		this.mongoClient.connect(this.uri, function(err, db) {

			if(err) console.error(err);
			

			candles.forEach(function(candle) {

				var query= {time: candle.time};

				db.collection(tableName)
				//.insert(candle, function(err, res ) {
				.update(query, candle, {upsert:true}, function(err, res) {
					if(err) console.error("Error inserting daycandle\n",err);
					
					//console.log(res);

				});



			})
		
			db.close();
		});
	}
	/*
	Returns all DayCandles within console.log(the range beginning--end
	Non-Inclusive
	*/
	getDayRange(beginning, end , tableName, callback=null) {
		var candleList=[];
		this.mongoClient.connect(this.uri, function(err, db){
			var query= {time: {$gt: beginning, $lt: end} } ;
			var sort= {time: 1};
			db.collection(tableName)
			.find(query)
			.sort(sort)
			.toArray(function(err, result) {
				if(err) console.error(err);


				result.forEach(function( candleDay) {
					candleList.push(candleDay);
					if(callback!=null) {
					callback(result);
					}
				});
				//console.log(result);
			});


		});
		
		return candleList;
	}

	 displayDBContents(table) {
	 	console.log("Displaying DB Contents")
	 	this.mongoClient.connect(this.uri, function(err, db) {

	 		if(err) console.error(err);

	 		db.collection(table).find().forEach(e => console.log(e));

	 	}  )
	}


}

exports.DBClient=DBClient;