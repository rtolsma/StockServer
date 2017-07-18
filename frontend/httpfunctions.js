//http functions
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
