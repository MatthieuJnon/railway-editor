import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    background-size: 10px 10px;
    background-image: linear-gradient(to right, ${props =>
      props.theme.backgroundColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${props =>
        props.theme.backgroundColor} 1px, transparent 1px);
    font-family: ${props => props.theme.fontFamily};
    user-select: none;
  }
`
export const theme = {
  primary: '#216eb4',
  textPrimary: '#e8f2ff',
  textSecondary: '#b6d8ff',
  backgroundColor: '#fafafa',
  fontFamily: 'Montserrat',
}
