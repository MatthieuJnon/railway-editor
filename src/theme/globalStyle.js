import { createGlobalStyle, keyframes } from 'styled-components'

export default createGlobalStyle`
  body {
    background-size: 10px 10px;
    background-image: linear-gradient(to right, ${props =>
      props.theme.gridColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${props =>
        props.theme.gridColor} 1px, transparent 1px);
    font-family: ${props => props.theme.fontFamily};
    user-select: none;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`
export const theme = {
  primary: '#216eb4',
  textPrimary: '#e8f2ff',
  textSecondary: '#b6d8ff',
  gridColor: '#fafafa',
  white: '#ffffff',
  fontFamily: 'Montserrat',
}

export const animations = {}
