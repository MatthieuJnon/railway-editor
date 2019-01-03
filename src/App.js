import GlobalStyle, { theme } from 'theme/globalStyle'
import { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { createStore } from 'redux'
import { connect } from 'react-redux'

import LeftMenu from 'components/Menu/LeftMenu'
import RightMenu from 'components/Menu/RightMenu'
import Editor from 'components/Editor'
import 'res/stylesheet/main.css'
import reducer from 'reducer'

require('dotenv').config()

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const StateScroller = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  transition: ${props => props.theme.menuTransition};
  transform: ${props => (props.screen === 'editor' ? 'translateX(-40vw)' : '')};
`

class ActualApp extends Component {
  render() {
    return (
      <StateScroller screen={this.props.screen}>
        <LeftMenu />
        <Editor />
        <RightMenu />
      </StateScroller>
    )
  }
}

const mapStateToProps = state => ({
  screen: state.app.screen,
})

ActualApp = connect(mapStateToProps)(ActualApp)

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalStyle />
          <ActualApp />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
