import { combineReducers } from 'redux'
import map from 'data/reducer'
import { CHANGE_SCREEN, UPDATE_EDITOR_INFO } from 'actions'

const initialAppState = {
  screen: 'menu',
  error: '',
  editorInfo: '',
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
    case UPDATE_EDITOR_INFO:
      return {
        ...state,
        editorInfo: action.info,
      }
    default:
      return state
  }
}

export default combineReducers({ map, app })
