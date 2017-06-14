//This file takes in the string data from the scraper and will convert
// it into CSV/JSON/Database idk yet

var candle=require("./candle");
exports.parseData=function(body) {

	//probably poor memory management
	var lines= body.split("\n").slice(7);

	//For every index/line replace with candlestick object
	lines.map(function(line) {

		var values= line.split(',');
		var time= +values[0]; //watch out for a....
		var close= +values[1];
		var high=+values[2];
		var low=+values[3];
		var open=+values[4];
		var volume=+values[5];
        return new candle.Candlestick(time,close,high, low, open, volume);

	});
    console.log(lines);
};
