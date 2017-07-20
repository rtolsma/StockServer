//contains the graph class

function Graph(arrayData,chartDivID,view){
            this.arrayData=arrayData;
            this.chartDivID=chartDivID;
            this.view=view;
            this.updatePoints=function(){//to be implemented later will updat the points to be graphed

            }
            this.setView=function(){
                var data = google.visualization.arrayToDataTable(arrayData, true);
                this.view = new google.visualization.DataView(data);

            }
            this.setFullArray=function(){

            }
        }