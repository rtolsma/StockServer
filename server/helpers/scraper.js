

var https=require("http");
var parser=require("./parser");
exports.getData= function(period, days, ticker, callback) {

	var urlpath=getGooglePath(period,days,ticker);
	
	var options= {
		host: "www.google.com",
		port: 80,
		path: urlpath,
		method: 'GET'
	};

	requestTicker(options, callback);
};

function requestTicker(options, callback) {

	var data="";
	var candles=[];

	var requestCallback= function(res) {
		
		//Log STATUS and HEADERS
		//console.log('STATUS: ' + res.statusCode);
  		//console.log('HEADERS: ' + JSON.stringify(res.headers));
  		res.setEncoding('utf8');

  		//Event listener while data is being buffered
  		res.on('data', function (chunk) {
  			data+=chunk;
		  });
  		//Listener for end of response
  		res.on('end', function() {

  			//Now we have all the ticker data pass it into the parser now
  			candles=parser.parseData(data);
  			callback(candles);

  		});
	};

	

	//HTTP request Google URL
	var req= https.request(options, requestCallback);

	//Event listener for request error	
	req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
	req.end()
}



function getGooglePath(period, days, ticker) {


return "/finance/getprices?i="
	+period+
	"&p="
	+days+
	"y&f=d,o,h,l,c,v&df=cpct&q="
	+ticker;
} 

/*
TEST
exports.getData(60, 1, "IBM");
console.log("Done");
*/