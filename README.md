### Criteria

Given a ticker symbol be able to display an interactive candlechart over a given date range for a specified period. Have the page actively refresh data for real time data from Google Finance if the viewing range meets current time.


# Plan
**We will need to separate tasks into testable components using the MVC paradigm**

### Model

The Model will consist of the webscraper and database management. The scraper will be passed time range, period, and ticker symbol to parse data from Google Finance.

The data will be stored actively in a database/CSV/JSON file managed by ticker symbol.

The scraper/parser/database will be constantly updating over a specified interval, or on an per callback basis.

MongoDB for the database storage. Databases will have a URI based off of ticker symbol. JSON objects for each day will be stored in the DB. The full day JSON objects will primarily hold a sorted array by time of all data available for intraday pricings. 

URI will be $ticker+$interval... pattern


In addition, have a separate helper program which every 10 minutes updates all of our databases for a preset list of indices.

 
### Controller

The controller will consist of a nodejs server reacting to user input and updating the display with new data from the databases. 

Database helper class. Retrieves all data from a database or queries/downloads data and creates the database given a ticker+interval. 

### View

An interactive candlestick chart. Should have interactive features to have user input on dates, interval, and ticker symbol.
