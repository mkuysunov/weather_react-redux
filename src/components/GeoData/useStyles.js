import { fade, makeStyles } from '@material-ui/core'
import suniseSunset from '../../assets/weather_aimated/sunriseSunset.svg'

export const useStyles = makeStyles((theme) => ({
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
  mapPaper: {
    minHeight: 400,
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
