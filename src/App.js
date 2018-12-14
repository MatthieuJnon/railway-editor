import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from 'reducer'
import 'res/stylesheet/main.css'
require('dotenv').config()

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <div className="App" />
        </Provider>
      </React.StrictMode>
    )
  }
}

export default App
