# Currency Converter

React app to get rates of any currency.

## Usage

If API not working please allow insecure content from site settings on your browser.

## API

I used a Fixer.io API with free subscription so I have only 1000 requests per month, If you need to 

## Limitations

The app uses a free subscription to Fixer.io, which provides a limited number of requests (1000 requests per month).

Make sure to replace the access key in the .env file with your own access key from Fixer.io.

```javascript
// .env
REACT_APP_API_KEY = 'YOUR_ACCESS_KEY';
```

## Implementation

The app uses a free subscription to Fixer.io, which provides a limited number of requests (1000 requests per month).

Make sure to replace the access key in the .env file with your own access key from Fixer.io.

```javascript
// .env
REACT_APP_API_KEY = 'YOUR_ACCESS_KEY';
```

## Using Historical Rates API for Last Year's Monthly Data

To retrieve historical exchange rates for a specific currency (e.g., `USD`) for each month of the last year, you can utilize the Historical Rates API provided by Fixer.io. This example demonstrates how the app's `HistoricalChart` component accomplishes this.

1. **API Endpoint:** The API endpoint used in the app is of the form:
- `YYYY-MM-DD`: Date for the last day of each month within the last year.
- `BASE_CURRENCY`: The base currency you want to convert from.
- `TARGET_CURRENCY`: The target currency you want to convert to.

2. **Loop through Months:** The `renderChart` function in the `HistoricalChart` component loops through each month and constructs the API endpoint for the last day of that month in the previous year. It then makes a request to the Fixer.io API using the `getChartData` function and appends the returned data to the `chartData` state.

3. **Handling Dates:** The `getChartData` function constructs the API URL and sends a request to Fixer.io. The component uses the data returned from the API to populate the `chartData` state, which is used to render the chart.

4. **Displaying Data:** The `chartData` is used to create the dataset for the chart. The component sorts the data by timestamp and maps the exchange rates for the target currency into an array.

5. **Customization:** You can customize the base and target currencies by setting the `convertion.from` and `convertion.to` values in your app.

This section provides an explanation of how your `HistoricalChart` component interacts with the Fixer.io Historical Rates API to fetch monthly data for the last year. It also guides users on how they can use this functionality in their own projects.