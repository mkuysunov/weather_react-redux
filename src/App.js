import React from 'react'
import { Container, makeStyles } from '@material-ui/core'
import { HeaderAppBar } from './components/HeaderAppBar/HeaderAppBar'
import { WeatherList } from './components/WeatherList/WeatherList'
import { GeoData } from './components/GeoData/GeoData'

const useStyle = makeStyles(() => ({
  root: { paddingTop: 50, paddingBottom: 50 },
}))

export default function App() {
  const classes = useStyle()

  // RENDER
  return (
    <>
      <HeaderAppBar />
      <Container maxWidth="md" className={classes.root}>
        <GeoData />
        <WeatherList />
      </Container>
    </>
  )
}
