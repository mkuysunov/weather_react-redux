import React from 'react'
import { Box, fade, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { YMaps, Map } from 'react-yandex-maps'
import { shallowEqual, useSelector } from 'react-redux'
import suniseSunset from '../../assets/weather_aimated/sunriseSunset.svg'
import globe from '../../assets/weather_aimated/globe.svg'

const useStyle = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  forcast: {
    '& *': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  paperContent: {
    position: 'relative',
    padding: theme.spacing(2),
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  sunContent: {
    position: 'relative',
    marginTop: 16,
    marginBottom: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 280,
    minHeight: 160,
    background: `url(${suniseSunset}) no-repeat center 30px`,
    backgroundSize: 'contain',
  },
  sunCircles: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    width: 420,
    height: 420,
    backgroundColor: fade('#ffc700', 0.5),
    opacity: 0.3,
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: '#ffc700',
    },
  },
  daylightContent: {
    textAlign: 'center',
  },
  globeImg: {
    position: 'absolute',
    width: 100,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sunriseSunsetContent: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: -5,
    width: '100%',
    '& strong:first-of-type': {
      marginLeft: -5,
    },
    '& strong:last-of-type': {
      marginRight: -5,
    },
  },

  cityContent: {
    marginBottom: 16,
  },
  mapsContent: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  populationContent: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    backgroundColor: fade('#000', 0.4),
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    overflow: 'hidden',
    '& strong ': {
      letterSpacing: 1,
    },
    '& > *': {
      whiteSpace: 'nowrap',
    },
  },
}))

export function GeoData() {
  const city = useSelector((state) => state.data.city, shallowEqual)
  const classes = useStyle()

  if (!city) {
    return null
  }

  const sunriseSunsetDayDuration = () => {
    const sunriseDate = new Date(city.sunrise * 1000)
    const sunsetDate = new Date(city.sunset * 1000)

    let DaylightHour = sunsetDate.getHours() - sunriseDate.getHours()
    let DaylightMinute = sunsetDate.getMinutes() - sunriseDate.getMinutes()

    if (sunsetDate.getMinutes() < sunriseDate.getMinutes()) {
      DaylightMinute = sunsetDate.getMinutes() + 60 - sunriseDate.getMinutes()
      DaylightHour = DaylightHour - 1
    }
    return `${DaylightHour < 10 ? '0' + DaylightHour : DaylightHour} h ${
      DaylightMinute < 10 ? '0' + DaylightMinute : DaylightMinute
    } m`
  }

  const unixToStringTime = (unixtime) => {
    const date = new Date(unixtime * 1000)
    return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }`
  }

  console.log(city)

  // RENDER
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container sm={6} xs={12}>
          <Grid item xs={12} className={classes.cityContent}>
            {/* 5-days forcast */}
            <Paper elevation={0} className={classes.paperContent}>
              <Box className={classes.forcast}>
                <Typography variant="h5">
                  Weather in{' '}
                  <Typography color="primary" variant="inherit" component="strong">
                    {city.name}, {city.country}
                  </Typography>
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  5-days forcast
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* daylight */}
          <Grid item xs={12}>
            <Paper elevation={0} className={`${classes.paperContent} ${classes.leftContent}`}>
              <Box className={classes.sunContent}>
                <Box className={classes.daylightContent}>
                  <Typography>Daylight hours</Typography>
                  <Typography variant="inherit" component="strong">
                    {sunriseSunsetDayDuration()}
                  </Typography>
                </Box>
                <img src={globe} alt="Globe" className={classes.globeImg} />
                <Box className={classes.sunriseSunsetContent}>
                  <Typography variant="inherit" component="strong">
                    {unixToStringTime(city.sunrise)}
                  </Typography>
                  <Typography variant="inherit" component="strong">
                    {unixToStringTime(city.sunset)}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.sunCircles} />
            </Paper>
          </Grid>
        </Grid>

        {/* map */}
        <Grid item sm={6} xs={12}>
          <Paper elevation={0} className={classes.paperContent}>
            <YMaps>
              <Map className={classes.mapsContent} state={{ center: [city.coord.lat, city.coord.lon], zoom: 9 }}>
                <Box className={classes.populationContent} p={1}>
                  <Typography>Population</Typography>
                  <Typography variant="inherit" component="strong">
                    {city.population}
                  </Typography>
                </Box>
              </Map>
            </YMaps>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
