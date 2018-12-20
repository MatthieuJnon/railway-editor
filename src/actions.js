export const changeScreen = newScreen => {
  return {
    type: 'CHANGE_SCREEN',
    screen: newScreen,
  }
}

export const CHANGE_SCREEN = 'CHANGE_SCREEN'
