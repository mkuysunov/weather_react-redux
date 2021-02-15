import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

// redux
import { Provider } from 'react-redux'
import { store } from './store'

// Material UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

// changed font family
const theme = createMuiTheme({
  typography: {
    fontFamily: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  },
  palette: {
    lightGold: { main: '#FFA500' },
    primary: { main: '#3879A1' },
    secondary: { main: '#ECEEF2', contrastText: '#333' },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
