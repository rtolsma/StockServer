//contains the graph class
//will be used to represent the webapp graphs and ensure modularity

/**
 * 
 * TODO: 
 * 
 * 1. Separate callback function from async call
 * 2. In async callback, correctly combine candlesticks
 * 3. Ensure ArrayData and DisplayData are separate so that
 * changing from 1min to 5min to 2min will be seamless
 * 4. Implement time range functionality
 * 
 */

function Graph(arrayData,chartDivID, ticker, duration, length){
            
            /** Class Variables
             * 
             * ArrayData: the absolute candlestick array of OBJECTS,
             * will always contain the 1 min intervals
             * 
             * Ticker: stock ticker
             * 
             * Duration: The duration i.e 120 min, 2 days etc...
             * 
             * Length: The length i.e 2 min candlesticks v. 5 min
             * 
             * 
             * 
             */
            this.arrayData=arrayData;
            this.displayedData=arrayData;//for now
            this.ticker=ticker;
            this.duration=duration;
            this.length=length;
            //creates the html chart
            this.chartDiv; 
            this.chartDivID=chartDivID;
            



              /**
             * Getters and setters for important variables
             * 
             * 
             */
            this.setData=function(candlesticks){
                this.arrayData=candlesticks;
            }
            this.setDisplayData=function(displayData) {
                this.displayedData=displayData;
            }
           this.setDuration=function(dur) {
                this.duration=dur;
            }
            
            this.setLength=function(len) {
                this.length=len;
            }

            /**
             * Class Functions:
             * 
             * Get Data : Retrieve Data from server
             * 
             * Draw Chart : Update the graph and draws charts (setInterval). 
             * 
             * 
             * 
             */
            this.init=function() {
                this.chartDiv=document.createElement("div");
                this.chartDiv.setAttribute("id", this.chartDivID);
                this.chartDiv.setAttribute("style", "width:1000");
                this.chartDiv.setAttribute("style", "height:300");
                document.body.appendChild(this.chartDiv);
                this.chart=new google.visualization.CandlestickChart(this.chartDiv);
            }
            //TODO:Separate drawing movingAverage from this function
            this.drawChart=function (){
                this.setDisplayData(combineAll(this.arrayData, length))
                var toDisplay=objectToArray(this.displayedArray);
                var data = google.visualization.arrayToDataTable(toDisplay, true);
                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, 2, 3, 4, movingAverage]); //this is for the moving average value
                chart.draw(view, options);
            }

           
            
            this.parseSetData=function(httpResponse) {
                var stockData=JSON.parse(httpResponse);
                var tempData=[];
                for(var i=stockData.length-this.duration;i<stockData.length;i++){
                    //BROKE!!! TODO: Add combineAll to make it 1min, 2min, 5min etc.
                    tempData.push(stockData[i]);
                }
                    
                var isFirstTime= (this.arrayData==[]);
                this.setData(tempData);
                if(isFirstTime) this.drawChart;

                    delete tempData;
            }
           
            this.getData=function(callback=null, firstTime=false, beginning=0, end="now") {
                //sets up url from class variables
                var url="http://104.198.38.190/stocks/"
                    +this.ticker+"/"+beginning+"-"
                    +end;

                httpGetAsync(url, (response)=>{
                    this.parseSetData(response);
                    if(callback!=null) callback();
                } );

            }
          


        }