
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


	/*
	Returns 0 if equal
	Returns 1 if first>second
	Returns -1 if first<second
	*/
	static compare(first, second) {
		if(first.time>second.time) return 1;
		else if(first.time<second.time) return -1;
		else return 0;
	}

	static isEqual(first, second) {
		if(first.time==second.time
			&& first.close==second.close
			&& first.high==second.high
			&& first.low==second.low
			&& first.open==second.open
			&& first.volume==second.volume) {
			return true;
		}
		else {
			return false;
		}
	}

	//takes array of candles as input
	//combines them into one candle
	static combine(candles) {
		var time=Infinity, close=0, 
		open=Infinity, high=0, low=Infinity, volume=0;
	

		if(candles.length>0) {
			open=candles[0].open;
			close=candles[candles.length-1].close;
			for(var i=0; i<candles.length; i++)
				volume+=candles[i].volume;
				if(candles[i].high>high) high=candles[i].high;
				if(candles[i].low<low) low=candles[i].low;
		}

		return new Candlestick(time,close,high, low, open,volume);

	}

	//takes array of Candlesticks and returns new array
	//of candles combined by the num
	static condense(candles, combine) {
		var condensed=[];

		for(var i=0; i<candles.length; i+=combine) {

			condensed.push(combine(candles.slice(i,i+combine)));

		}


	}
}
//must come after class declaration for reference error
exports.Candlestick=Candlestick;


