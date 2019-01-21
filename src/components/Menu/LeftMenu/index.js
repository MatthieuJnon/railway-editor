import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { loadXml } from 'data/actions'

import { changeScreen } from 'actions'

const Background = styled.div`
  height: 120vh;
  width: 55vw;
  transform: rotate(8deg);
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: -10vh;
  left: -10vw;
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.22);
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
  outline: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    color: ${props => props.theme.white};
    transform: translateX(2px);
  }
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

const Header = styled.header`
  height: 100vh;
  width: 50vw;
`

class MainMenu extends Component {
  constructor(props) {
    super(props)

    this.handleNewMap = this.handleNewMap.bind(this)
    this.handleLoadMap = this.handleLoadMap.bind(this)
  }

  handleNewMap() {
    this.props.changeScreen('editor')
  }

  handleLoadMap() {
    const { dialog } = window.require('electron').remote
    const importPath = dialog.showOpenDialog({
      title: 'select map',
      filters: [
        {
          name: 'xml file',
          extensions: ['xml'],
        },
      ],
      properties: ['openFile'],
    })

    this.props.loadXml(importPath[0])
  }

  render() {
    return (
      <Header>
        <Background />
        <Title>Railway Editor</Title>
        <NewMap onClick={this.handleNewMap}>New map</NewMap>
        <LoadMap onClick={this.handleLoadMap}>Load map</LoadMap>
        <HandleBar />
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  screen: state.app.screen,
})

const mapDispatchToProps = {
  changeScreen: changeScreen,
  loadXml,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu)
