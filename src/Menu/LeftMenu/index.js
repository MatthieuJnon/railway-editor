import React, { Component } from 'react'
import styled from 'styled-components'

import CloseIcon from 'components/icons/Close'

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
  font-family: ${props => props.theme.fontFamily};
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

const HandleBar = styled.div`
  -webkit-user-select: none;
  -webkit-app-region: drag;
  pointer-events: none;
  z-index: 1000;
  width: 45vw;
  height: 120px;
  position: absolute;
`

const Icon = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;
  width: 20px;
  height: 20px;
  -webkit-app-region: no-drag;
`

class MainMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      closeButtonHovered: false,
    }

    this.handleHoverCloseButton = this.handleHoverCloseButton.bind(this)
  }

  handleHoverCloseButton() {
    this.setState({
      closeButtonHovered: !this.state.closeButtonHovered,
    })
  }

  render() {
    return (
      <header>
        <Background />
        <Title>Railway Editor</Title>
        <NewMap>New map</NewMap>
        <LoadMap>Load map</LoadMap>
        <Icon
          onMouseEnter={this.handleHoverCloseButton}
          onMouseLeave={this.handleHoverCloseButton}
        >
          <CloseIcon color={this.state.closeButtonHovered ? '#ffffff' : ''} />
        </Icon>
        <HandleBar />
      </header>
    )
  }
}

export default MainMenu
