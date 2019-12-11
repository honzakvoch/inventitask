# ForeKast

A simple app that let's you look-up a city and provides weather information about the city.

## DEV Usage

As the first step you need to set these env. variables:
```sh
export TASK_FACTS_API_BASE='http://localhost:4000' # base URL for the ForeKast backend
export WEATHERBIT_API_BASE='https://api.weatherbit.io/v2.0' # base URL for Weatherbit API
export WEATHERBIT_API_STATIC='https://weatherbit.io' # base URL for Weatherbit static content
export WEATHERBIT_API_KEY='{YOUR_API_KEY}' # API key for the Weatherbit API
```

To start a DEV server with hot-reload run:
```sh
npm start
```

Run unit tests:
```sh
npm run test
```

Create a production build with:
```sh
npm run build
```
