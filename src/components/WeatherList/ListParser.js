import React, { useState } from 'react'
import { animatedIcons } from './weatherUtils'
import { Box, Divider, fade, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${fade(theme.palette.common.black, 0.08)}`,
    padding: theme.spacing(1),
    transition: `${theme.transitions.duration.standard}ms`,
    width: '100%',
    '&:hover': {
      boxShadow: theme.shadows[1],
    },
    '&:hover > button[name="arrowBtn"]': {
      opacity: 1,
    },
  },
  swiper: {
    overflow: 'hidden',
  },
  swiperSlide: {
    position: 'relative',
    left: 0,
    minWidth: '100%',
    transition: `${theme.transitions.duration.standard}ms`,
  },
  slideMoved: {
    left: '-100%',
  },
  temp: {
    fontWeight: '700',
  },
  degreesIcon: {
    fontSize: 14,
    position: 'relative',
    top: -3,
  },
  weathersIcon: {
    width: 60,
  },
  arrowBtn: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    zIndex: 1,
    padding: 5,
    opacity: 0,
    backgroundColor: theme.palette.secondary.main,
    '& svg': {
      width: 18,
      height: 18,
    },
    '& span svg': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  rotatedArrowIcon: {
    transform: 'scale(-1)',
  },
  smallTitle: {
    fontSize: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
}))

export function ListParser({ listItem }) {
  const classes = useStyle()
  const [iconRotated, setIconRotated] = useState(false)
  const { dt_txt, weather, main, wind, visibility } = listItem
  const kelvin = -273.3

  const handleRotateIcon = () => {
    setIconRotated(!iconRotated)
  }

  // RENDER
  return (
    <Box className={classes.root}>
      {/* firs slide */}
      <Grid container wrap="nowrap" className={classes.swiper}>
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          className={`${classes.swiperSlide} ${iconRotated ? classes.slideMoved : ''}`}
        >
          <Grid item>
            <Typography color="textSecondary">
              {dt_txt.slice(11, 16)} <br /> {weather[0].main}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.temp} color="primary">
              {Math.round(main.temp + kelvin)}
              <sup className={classes.degreesIcon}>o</sup>
            </Typography>
          </Grid>
          <Grid item>
            <img src={animatedIcons[weather[0].icon]} alt={weather[0].main} className={classes.weathersIcon} />
          </Grid>
        </Grid>

        {/* second slide */}
        <Grid item className={`${classes.swiperSlide} ${iconRotated ? classes.slideMoved : ''}`}>
          <Grid container justify="space-between" wrap="nowrap">
            <Grid item>
              <Typography color="textSecondary" className={classes.smallTitle}>
                WIND
              </Typography>
              <Typography color="primary">{wind.speed.toString()} m/s</Typography>
            </Grid>

            <Grid item>
              <Typography color="textSecondary" className={classes.smallTitle}>
                FEELS LIKE
              </Typography>
              <Typography color="primary">
                {Math.round(main.feels_like + kelvin)}
                <sup className={classes.degreesIcon}>o</sup>
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container justify="space-between" wrap="nowrap">
            <Grid item>
              <Typography color="textSecondary" className={classes.smallTitle}>
                PRESSURE
              </Typography>
              <Typography color="primary">{main.pressure} hPa</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" className={classes.smallTitle}>
                VISIBILITY
              </Typography>
              <Typography color="primary">
                {visibility > 999 ? Math.round(visibility / 1000) + ' km' : visibility + ' m'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <IconButton disableRipple className={classes.arrowBtn} onClick={handleRotateIcon} name="arrowBtn">
        <ArrowForwardIcon color="action" className={iconRotated ? classes.rotatedArrowIcon : ''} />
      </IconButton>
    </Box>
  )
}
