import {makeStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(2, 2, 2, 0),
	},
	cityName: {
		flex: '1',
	},
}))

export {useStyles}
