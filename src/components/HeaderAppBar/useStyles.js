import { fade, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.common.white,
      color: '#333',
    },
    linearProgress: {
      opacity: 0,
    },
    linearProgressActived: {
      opacity: 1,
    },
    titleBox: {
      flexGrow: 1,
      width: 'auto',
      [theme.breakpoints.down('xs')]: {
        flexGrow: 0,
      },
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },

    searchBox: {
      display: 'flex',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      backgroundColor: fade(theme.palette.secondary.main, 0.7),
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        flexGrow: 1,
      },
    },
    searchBtn: {
      padding: '10px 15px',
      borderRadius: 0,
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      '& svg': {
        color: '#fff',
      },
      '&:disabled': {
        backgroundColor: fade(theme.palette.primary.main, 0.7),
      },
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.9),
      },
    },
    inputRoot: {
      color: 'inherit',
      flexGrow: 1,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: 10,
      transition: theme.transitions.create('width'),
    },
  }
})
