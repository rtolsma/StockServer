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

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function setData(HttpRequest){
    stockData=JSON.parse(HttpRequest);
    displayedData.length = 0;
    for(var i=stockData.length-100;i<stockData.length;i++){
        displayedData.push(stockData[i]);

    }
    console.log(displayedData, "object");

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


function init() {

}