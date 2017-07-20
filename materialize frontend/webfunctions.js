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
    for(var i=0;i<object.length;i++){
        array.push([new Date(object[i].time),object[i].low,object[i].open,object[i].close,object[i].high]);
    }
    return array;
}

//changes the data to a specified user input rather than a set time
function changeTime(minutes){
    chartTime=minutes;
    if(minutes==120){
        getNewData(minutes);
    }
}

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

function init() {
    google.charts.load('current', {'packages': ['corechart']});//loads all of the functions required by the charts
    google.charts.setOnLoadCallback(drawChart);

}