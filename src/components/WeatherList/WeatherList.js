import './WeatherList.css'
import React, { useMemo } from 'react'
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { months, weekDays } from './weatherUtils'
import { ListParser } from './ListParser'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles & install Swiper components
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
SwiperCore.use([Navigation])
const swiperOptions = {
  slidesPerView: 1,
  freeMode: true,
  navigation: true,
  breakpoints: {
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
  },
}

const useStyle = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: '#fff',
      borderRadius: theme.shape.borderRadius,
    },
    dayTitle: {
      marginRight: 16,
    },
    swiperRoot: {
      maxWidth: '100%',
    },
    swiperSlide: {
      padding: 4,
    },
  }
})

export function WeatherList() {
  const list = useSelector((state) => state.list, shallowEqual)
  const classes = useStyle()

  const memoList = useMemo(() => {
    const arr = []
    let innserArr = []
    for (let i = 0; i < list.length; i++) {
      const currentDate = list[i].dt_txt.slice(0, 10)
      const nextDate = list[i + 1]?.dt_txt.slice(0, 10)
      innserArr.push(list[i])
      if (currentDate !== nextDate) {
        arr.push(innserArr)
        innserArr = []
      }
    }
    return arr
  }, [list])

  const header = ({ dt_txt }) => {
    const date = new Date(dt_txt)
    return (
      <Grid container alignItems="center">
        <Grid item className={classes.dayTitle}>
          <Typography variant="h2" component="h3">
            {+dt_txt.slice(8, 10)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">{months[date.getMonth()]},</Typography>
          <Typography color="textSecondary">{weekDays[date.getDay()]}</Typography>
        </Grid>
      </Grid>
    )
  }

  // RENDER
  return memoList.map((list, idx) => (
    <Box key={idx} className={classes.root}>
      <Grid container spacing={4} direction="column">
        <Grid item>{header(list[0])}</Grid>

        <Divider variant="middle" />

        <Grid item className={classes.swiperRoot}>
          <Swiper {...swiperOptions}>
            {list.map((listItem, idx) => (
              <SwiperSlide className={classes.swiperSlide} key={idx}>
                <ListParser listItem={listItem} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  ))
}
