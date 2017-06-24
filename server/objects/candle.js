
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

	//Takes in variable number of parameters
	//assumes parameters come in time order ascending
	static combine() {
		var time=Infinity, close=0, 
		open=Infinity, high=0, low=Infinity, volume=0;
	

		if(arguments.length>0) {
			open=arguments[0].open;
			close=arguments[arguments.length-1].close;
			for(var i=0; i<arguments.length; i++)
				volume+=arguments[i].volume;
				if(arguments[i].high>high) high=arguments[i].high;
				if(arguments[i].low<low) low=arguments[i].low;
		}

		return new Candlestick(time,close,high, low, open,volume);

	}

}
//must come after class declaration for reference error
exports.Candlestick=Candlestick;


