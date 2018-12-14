import GlobalStyle, { theme } from 'theme/globalStyle'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'res/stylesheet/main.css'
import reducer from 'reducer'
import StartMenu from 'components/StartMenu'
import { ThemeProvider } from 'styled-components'

require('dotenv').config()

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />

            <StartMenu />
          </Provider>
        </ThemeProvider>
    )
  }
}

export default App
