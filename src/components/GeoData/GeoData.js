import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { YMaps, Map } from 'react-yandex-maps'
import { useSelector } from 'react-redux'
import { useStyles } from './useStyles'
import globe from '../../assets/weather_aimated/globe.svg'
import clsx from 'clsx'

export function GeoData() {
  const city = useSelector((state) => state.city)
  const classes = useStyles()

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
          <Paper elevation={0} className={clsx(classes.paperContent, classes.mapPaper)}>
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
