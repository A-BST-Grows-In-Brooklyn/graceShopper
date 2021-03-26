import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme/reactTheme.js'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div id="mainBody">
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
