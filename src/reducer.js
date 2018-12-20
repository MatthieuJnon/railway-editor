import { combineReducers } from 'redux'
import map from 'data/reducer'
import { CHANGE_SCREEN } from 'actions'

const initialAppState = {
  screen: 'menu',
  error: '',
}

const availablesScreens = ['menu', 'editor']

function app(state = initialAppState, action) {
  switch (action.type) {
    case CHANGE_SCREEN:
      if (availablesScreens.indexOf(action.screen) >= 0) {
        return {
          ...state,
          screen: action.screen,
        }
      } else {
        return {
          ...state,
          error: 'unknown screen',
        }
      }
    default:
      return state
  }
}

export default combineReducers({ map, app })
