

class DayCandle {


	constructor(candles) {
		this.candles=candles;

		if(this.candles.length>0) {
			this.time=candles[0].time;
		}
	}

	//Binary search add to maintain list order
	//?
	addCandle(candle) {
		this.candles.push(candle);
		this.time=candles[0].time; //redundant check in case of anything
	}

	addCandles(candleList) {

		candleList.forEach( function(candle) {
			addCandle(candle);
		})
	}

}


exports.DayCandle=DayCandle;