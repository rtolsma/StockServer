
/*
This file contains the class representing the stock data for a
single candlestick indicator
*/

class Candlestick {


	constructor(time, close, high, low, open, volume) {
		this.time=time;
		this.close=close;
		this.high=high;
		this.low=low;
		this.open=open;
		this.volume=volume;
	}

}
//must come after class declaration for reference error
exports.Candlestick=Candlestick;


