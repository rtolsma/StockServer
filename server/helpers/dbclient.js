var mongo=require("mongodb");
const url= "mongodb://localhost:21017/"
//const url= "mongodb://root:inKLHw2f@10.128.0.2:27017/"
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
			var newTable=true;
			if(err) {
				console.error(err);
			}

			db.createCollection(name, function(err, res) {
				
				if(err) {
					console.error(err);
					newTable=false;
				}

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
	insertDays(candles, tableName, callback=null) {
		this.mongoClient.connect(this.uri, function(err, db) {
			if(err) console.error(err);
			//array is empty
			if(candles.length<=0) {
				callback();
				return;
			}
			var bulk=db.collection(tableName).initializeUnorderedBulkOp();
				
			candles.forEach(function (candle) {
				var query= {time: candle.time};

				bulk.find(query).upsert().updateOne(candle, function(err, res) {
					if(err) console.error("Error inserting daycandle\n",err);
				
				});
			});

			bulk.execute(function(err, res) {
				//update query is done
				if(callback!=null) {
					callback();
				}
				//updates finished so close database
				db.close();
				//console.log(JSON.stringify(res,undefined,2));
			});				//.insert(candle, function(err, res ) {

			
		
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
				//console.log("RESULT==", result)
				if(err!=null) console.error(err);
				if(result==null) {
					console.error("Retrieving elements array is null");

					return;
				}
				result.forEach(function(candleDay) {
					delete candleDay._id; //remove that component
					candleList.push(candleDay);
				});
					//resulting array is done
				if(callback!=null) {
					callback(candleList);
				}
				//console.log(result);
				db.close();

			});

		});
		
		return candleList;
	}

	 displayDBContents(table) {
	 	console.log("Displaying DB Contents")
	 	this.mongoClient.connect(this.uri, function(err, db) {

	 		if(err) console.error(err);

	 		db.collection(table).find().forEach(e => console.log(e));
	 		db.close();
	 	});
	}

	tableExists(tableName) {
		var exists=false;
		this.mongoClient.connect(this.uri, function(err, db) {

			db.admin().listDatabases( function(databases) {



			})
			db.close();

		})

	}
}


exports.DBClient=DBClient;