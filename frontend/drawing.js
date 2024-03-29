//frontmain.js
//primary execution file


var days = 5;
var movingAverage={
    type: 'number'
    , label: days + '-minute Moving Average'
    , calc: calculateMovingAverage
}
var graphs=[];
graphs.push(new Graph([], "bananas", "AAPL", 60, 2));

function drawChart() {

    graphs.forEach((graph) =>{
        graph.init();
        graph.getData(graph.drawChart);
        //graph.drawChart();
    });

    setInterval(()=>updateGraphs(graphs), 5*1000);
    setInterval(() => drawGraphs(graphs), 10 * 1000);
    // drawChart();//draws chart the first time
    /* google.load("visualization", "1", {
        packages: ["corechart"]
        , callback: drawChart
    }); */
}

//BUG TESTING
 google.charts.load('current', {'packages': ['corechart']});//loads all of the functions required by the charts
 //google.load("visualization", "1", {packages:["corechart"]});
 google.charts.setOnLoadCallback(drawChart);//testing




function drawGraphs(graphs) {
    graphs.forEach((graph)=> graph.drawChart());
}
function updateGraphs(graphs) {
    graphs.forEach((graph)=> graph.getData());
}
/*function drawData(chart){
    var displayedArray=objectToArray(displayedData);
    var data = google.visualization.arrayToDataTable(displayedArray, true);
    var view = new google.visualization.DataView(data);
    console.log(displayedArray,"display");
    view.setColumns([0, 1, 2, 3, 4, movingAverage]);
    chart.draw(view, options);
}*/




