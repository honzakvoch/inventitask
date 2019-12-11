import {makeStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		paddingTop: theme.spacing(4),
	},
	inputField: {
		maxWidth: 'calc(100% - 60px)',
	},
}))

export {useStyles}
