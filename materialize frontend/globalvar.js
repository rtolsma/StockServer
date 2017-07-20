//Global Variables config



var stockData;
var displayedData=[];

var chart;
var chartTime=60;
//sets up the variable for all of the options used later in the graphs
var options = {
    height: 300
    , width: 1000
    , candlestick: {
        fallingColor: {
            strokeWidth: 0
            , fill: '#a52714'
        }, // red
        risingColor: {
            strokeWidth: 0
            , fill: '#0f9d58'
        } // green
    }
    , bar: {
        groupWidth: '90%'
    }
    , chartArea: {
        left: '7%'
        , width: '92%'
    }
    , series: {
        0: {
            type: 'candlesticks'
        }
        , 1: {
            type: 'line'
        }
    }
}


