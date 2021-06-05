import React, { useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { Box, Container, Grid, IconButton, Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { searchOnChange, loadData, errorSwitcher } from '../../store/actions'
import { useStyles } from './useStyles'
import weatherIcon from '../../assets/weather_aimated/weather.svg'
import LinearProgress from '@material-ui/core/LinearProgress'
import clsx from 'clsx'

export function HeaderAppBar() {
  const search = useSelector((state) => state.search)
  const isLoading = useSelector((state) => state.isLoading)
  const isError = useSelector((state) => state.isError)

  const classes = useStyles()
  const dispatch = useDispatch()

  // onChange
  const handleOnChange = (e) => {
    dispatch(searchOnChange(e.target.value))
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loadData(search))
  }

  // default
  useEffect(() => {
    dispatch(loadData('dushanbe'))
  }, [dispatch])

  // close alert
  const handleCloseAlert = () => {
    dispatch(errorSwitcher(false))
  }

  // RENDER
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <LinearProgress className={clsx(classes.linearProgress, { [classes.linearProgressActived]: isLoading })} />
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Grid container alignItems="center" className={classes.titleBox}>
                <Grid item>
                  <img src={weatherIcon} alt="weather" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" noWrap className={classes.title} color="primary">
                    weather
                  </Typography>
                </Grid>
              </Grid>

              <Box className={classes.searchBox}>
                <InputBase
                  value={search}
                  onChange={handleOnChange}
                  placeholder="Country or city"
                  classes={{ root: classes.inputRoot, input: classes.inputInput }}
                  inputProps={{ 'aria-label': 'search' }}
                />

                <IconButton disabled={isLoading} className={classes.searchBtn}>
                  <SearchIcon color="action" />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </form>
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
