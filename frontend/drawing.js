//frontmain.js
//primary execution file


var days = 5;
var movingAverage={
    type: 'number'
    , label: days + '-minute Moving Average'
    , calc: calculateMovingAverage
}
var graph=new Graph(displayedData,'chart_div');



function drawChart() {
    //httpGetAsync("http://104.198.38.190/stocks/dis/0-now",setData);
    chart = new google.visualization.CandlestickChart(document.getElementById(graph.chartDivID));
    
    //init
    httpGetAsync("http://104.198.38.190/stocks/dis/0-now", (response) =>{
        setData(response,stockData);
        drawData(chart);
    });
    
    //the interval crap
    setInterval(() => httpGetAsync("http://104.198.38.190/stocks/dis/0-now",setData), 15 * 1000);//change the url
    setInterval(() => drawData(), 10 * 1000);
    // drawChart();//draws chart the first time
    /* google.load("visualization", "1", {
        packages: ["corechart"]
        , callback: drawChart
    }); */
}
function drawData(chart){
    var displayedArray=objectToArray(displayedData);
    var data = google.visualization.arrayToDataTable(displayedArray, true);
    var view = new google.visualization.DataView(data);
    console.log(displayedArray,"display");
    view.setColumns([0, 1, 2, 3, 4, movingAverage]);
    chart.draw(view, options);
}






var twoHR=[];
function getNewData(minutes){
    newData=[];
    //fix stuff later
    combineAll(newData, stockData, 2);   
}

        