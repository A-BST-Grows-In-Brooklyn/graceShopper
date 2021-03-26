import {createMuiTheme, withStyles, makeStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

const palette = {primary: {main: '#ff71ce', contrastText: '#ffff'}}
const themeName = 'Hot Pink Razzmatazz Chuckwalla'

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#ff71ce',
    color: theme.palette.common.white,
    fontSize: 18
  },
  body: {
    backgroundColor: '#ff71ce',
    color: theme.palette.common.white,
    fontSize: 16
  }
}))(TableCell)

export default createMuiTheme({
  palette,
  themeName
})
