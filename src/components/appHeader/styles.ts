import {makeStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
	filler: {
		...theme.mixins.toolbar,
	},
	title: {
		flexGrow: 1,
	},
}))

export {useStyles}
