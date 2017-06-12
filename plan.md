### Criteria

Given a ticker symbol be able to display an interactive candlechart over a given date range for a specified period. Have the page actively refresh data for real time data from Google Finance if the viewing range meets current time.


# Plan
**We will need to separate tasks into testable components using the MVC paradigm**

### Model

The Model will consist of the webscraper and database management. The scraper will be passed time range, period, and ticker symbol to parse data from Google Finance.

The data will be stored actively in a database/CSV/JSON file managed by ticker symbol.

The scraper/parser/database will be constantly updating over a specified interval, or on an per callback basis
 
### Controller

The controller will consist of a nodejs server reacting to user input and updating the display with new data from the databases. 

### View

An interactive candlestick chart. Should have interactive features to have user input on dates, interval, and ticker symbol.
