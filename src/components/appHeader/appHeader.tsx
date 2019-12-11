import {AppBar, Toolbar, Typography} from '@material-ui/core'
import React, {ReactElement} from 'react'

import {useStyles} from './styles'
import {UnitSwitch} from '..'


export function AppHeader(): ReactElement {
	const styles = useStyles()

	return (
		<>
			<AppBar>
				<Toolbar>
					<Typography className={styles.title} variant='h6'>ForeKast</Typography>

					<UnitSwitch />
				</Toolbar>
			</AppBar>

			<div className={styles.filler} />
		</>
	)
}
