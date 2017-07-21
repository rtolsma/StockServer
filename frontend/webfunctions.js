//webfunctions.js
/*
This file is to hold all the computational functions that can be
easily separated to clean up Porter's shit messy code.
*/

function calculateMovingAverage(dt,row) {
    // calculate average of closing value for last x days,
    // if we are x or more days into the data set
    if (row >= days - 1) {
        var total = 0;
        for (var i = 0; i < days; i++) {
            total += dt.getValue(row - i, 3);
        }
        var avg = total / days;
        return {
            v: avg
            , f: avg.toFixed(2)
        };
    }
    else {
        // return null for < x days
        return null;
    }
}



function objectToArray(object){
    var array=[];
    if(object==null) return [[]];
    for(var i=0;i<object.length;i++){
        array.push([new Date(object[i].time),object[i].low,object[i].open,object[i].close,object[i].high]);
    }
    return array;
}

//changes the data to a specified user input rather than a set time
/*function changeTime(minutes){
    chartTime=minutes;
    if(minutes==120){
        getNewData(minutes);
    }
} */

function combine(candles){
    var time=candles[0].time;
    var close=0;
    var open=0;
    var high=0;
    var low=Infinity;
    var volume=0;
    if(candles.length>0) {
        open=candles[0].open;
        close=candles[candles.length-1].close;
        for(var i=0; i<candles.length; i++){
            if(candles[i].high>high){ high=candles[i].high;}
            if(candles[i].low<low){ low=candles[i].low;}
        }
    }
    var date=new Date(time);
    return {"time":date, "low":low, "open":open, "close":close,"high": high};
}
 //BROKE!!!fix combine
 /**
  * Takes in an array of 1min candlesticks
  * Returns a new array of the combined candlesticks
  */
function combineAll(data, minutes){
    var result=[];
    if(data==null) return data;//if there's no data then don't do anything
    for(var i=0; i<data.length-minutes; i+=minutes) {
        var tempCandles=[];
        for(var j=i; j<i+minutes; j++) {
            tempCandles.push(data[j]);
        }
        result.push(combine(tempCandles));
    }
    return result;
}
