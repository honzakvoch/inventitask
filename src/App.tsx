import {BrowserRouter as Router} from 'react-router-dom'
import React, {ReactElement} from 'react'
import {Switch, Route, Redirect} from 'react-router'
import {ThemeProvider} from '@material-ui/core'

import {WeatherbitWeatherAPI} from './apis/weather.weatherbit'
import {WeatherInfoProvider} from './stores/weather'
import {MainPage} from './pages/main/mainPage'
import {AppHeader} from './components'
import {PreferencesProvider} from './stores/preferences'
import {TaskFactsAPI} from './apis/facts.task'
import {FactsProvider} from './stores/facts'
import {theme} from './theme'


const weatherAPI = new WeatherbitWeatherAPI(
	process.env.WEATHERBIT_API_KEY as string,
	process.env.WEATHERBIT_API_BASE as string,
	process.env.WEATHERBIT_API_STATIC as string,
	fetch.bind(window),
)

const factsAPI = new TaskFactsAPI(
	process.env.TASK_FACTS_API_BASE as string,
	fetch.bind(window),
)

export function App(): ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<WeatherInfoProvider api={weatherAPI}>
				<PreferencesProvider storage={window.localStorage}>
					<FactsProvider api={factsAPI}>
						<Layout />
					</FactsProvider>
				</PreferencesProvider>
			</WeatherInfoProvider>
		</ThemeProvider>
	)
}


function Layout(): ReactElement {
	return <>
		<AppHeader />

		<Router>
			<Switch>
				<Route exact path='/'>
					<MainPage />
				</Route>

				<Route>
					<Redirect to='/' />
				</Route>
			</Switch>
		</Router>
	</>
}
