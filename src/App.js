import { createStore, applyMiddleware, compose } from 'redux'
import GlobalStyle, { theme } from 'theme/globalStyle'
import { ThemeProvider } from 'styled-components'
import thunkMiddleware from "redux-thunk";
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { connect } from 'react-redux'

import RightMenu from 'components/Menu/RightMenu'
import LeftMenu from 'components/Menu/LeftMenu'
import Editor from 'components/Editor'
import 'res/stylesheet/main.css'
import reducer from 'reducer'

require('dotenv').config()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
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
