import React, { Component } from 'react'
import styled from 'styled-components'

const Background = styled.div`
  height: 200vh;
  width: 55vw;
  transform: rotate(8deg);
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: -50vh;
  left: -10vw;
`

class MainMenu extends Component {
  render() {
    return <Background />
  }
}

export default MainMenu
