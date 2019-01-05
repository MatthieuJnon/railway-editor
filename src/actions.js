export const changeScreen = newScreen => {
  return {
    type: 'CHANGE_SCREEN',
    screen: newScreen,
  }
}

export const updateEditorInfo = info => {
  return {
    type: 'UPDATE_EDITOR_INFO',
    info: info,
  }
}

export const UPDATE_EDITOR_INFO = 'UPDATE_EDITOR_INFO'
export const CHANGE_SCREEN = 'CHANGE_SCREEN'
