
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

}
//must come after class declaration for reference error
exports.Candlestick=Candlestick;


