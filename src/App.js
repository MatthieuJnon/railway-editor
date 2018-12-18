import GlobalStyle, { theme } from 'theme/globalStyle'
import { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { createStore } from 'redux'

import LeftMenu from 'Menu/LeftMenu'
import CloseIcon from 'components/icons/Close'
import 'res/stylesheet/main.css'
import reducer from 'reducer'

require('dotenv').config()

const store = createStore(reducer)

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vh;
`

const Icon = styled.div`
  position: absolute;
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalStyle />
          <Wrapper>
            <LeftMenu />
            <Icon>
              <CloseIcon />
            </Icon>
          </Wrapper>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
