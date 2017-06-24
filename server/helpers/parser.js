//This file takes in the string data from the scraper and will convert it into CSV/JSON/Database idk yet
var candle=require("../objects/candle");
var lastTime=0;
exports.parseData=function(body) {
	//probably poor memory management
	var lines= body.split("\n").slice(7);

	var candles=[];
	//For every line, parse data
	lines.forEach(function(line) {
		//console.log(line);
		var values= line.split(',');
		var time=0;

		if(values[0].startsWith("a")) {
			time=+values[0].split("a")[1];
			lastTime=time;		
		} else {
			time= (+values[0])*6000+lastTime;
		}
		var close= +values[1];
		var high=+values[2];
		var low=+values[3];
		var open=+values[4];
		var volume=+values[5];

		var candleIndicator= 
				new candle.Candlestick(time, close, high, low, open, volume);

		candles.push(candleIndicator);

	});
	//console.log(candles);
	//console.log("Lasttime:",lastTime)
	//haxy way cuz last line ends on new line which gets processed
	candles.pop(); 
	return candles;

}