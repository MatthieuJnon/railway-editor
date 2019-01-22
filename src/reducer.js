import { combineReducers } from 'redux'
import map from 'data/reducer'
import { CHANGE_SCREEN, UPDATE_EDITOR_INFO } from 'actions'
import { LOAD_MAP } from 'data/actions'

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
    case LOAD_MAP:
      return {
        ...state,
        screen: 'editor',
      }
    default:
      return state
  }
}

export default combineReducers({ map, app })
