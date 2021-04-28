import React, { useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { Box, Container, Grid, IconButton, Snackbar } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { searchOnChange, changeData, changeURL, errorSwitcher, resetSearch } from '../../store/actions'
import weatherIcon from '../../assets/weather_aimated/weather.svg'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => {
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
    logoContainer: {
      flexGrow: 1,
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    search: {
      display: 'flex',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      backgroundColor: fade(theme.palette.secondary.main, 0.7),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
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
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }
})

export function HeaderAppBar() {
  const classes = useStyles()
  const { search, url, isLoading, isError } = useSelector((state) => state, shallowEqual)
  const dispatch = useDispatch()

  // onChange
  const handleOnChange = (e) => {
    dispatch(searchOnChange(e.target.value))
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const newURL = new URL(url)
    newURL.searchParams.set('q', search)
    dispatch(changeURL(newURL.href))
    dispatch(resetSearch())
  }

  // default
  useEffect(() => {
    dispatch(changeData(url))
  }, [dispatch, url])

  // close alert
  const handleCloseAlert = () => {
    dispatch(errorSwitcher(false))
  }

  // RENDER
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <LinearProgress className={`${classes.linearProgress} ${isLoading ? classes.linearProgressActived : ''}`} />
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Grid container alignItems="center" className={classes.logoContainer}>
              <Grid item>
                <img src={weatherIcon} alt="weather" />
              </Grid>
              <Grid item>
                <Typography variant="h6" noWrap className={classes.title} color="primary">
                  weather
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <form onSubmit={handleSubmit}>
                <Box className={classes.search}>
                  <InputBase
                    value={search}
                    onChange={handleOnChange}
                    placeholder="Country or city"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />

                  <IconButton disabled={isLoading} className={classes.searchBtn} aria-label="search" type="submit">
                    <SearchIcon color="action" />
                  </IconButton>
                </Box>
              </form>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={Boolean(isError)}
        onClose={handleCloseAlert}
        message={isError}
      />
    </>
  )
}
