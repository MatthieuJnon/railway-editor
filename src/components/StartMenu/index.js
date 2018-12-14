import React, { Component } from 'react'
import styled from 'styled-components'

const Background = styled.div`
  height: 120vh;
  width: 55vw;
  transform: rotate(8deg);
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: -10vh;
  left: -10vw;
`

const Title = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-weight: 900;
  position: absolute;
  top: 130px;
  left: 69px;
  font-size: 3rem;
  text-shadow: 2px 3px 7px rgba(0, 0, 0, 0.15);
`

const MenuButton = styled.button`
  color: ${props => props.theme.textSecondary};
  font-weight: 400;
  position: absolute;
  left: 69px;
  font-size: 2.5rem;
  padding: 0;
  letter-spacing: 0.1em;
  border: none;
  background: none;
`

const NewMap = styled(MenuButton)`
  top: 195px;
`

const LoadMap = styled(MenuButton)`
  top: 250px;
`

class MainMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <Background />

        <Title>Railway Editor</Title>
        <NewMap>New map</NewMap>
        <LoadMap>Load map</LoadMap>
      </React.Fragment>
    )
  }
}

export default MainMenu
