import styled from 'styled-components'
import { connect } from 'react-redux'
import React from 'react'

import {
  addLine,
  showEditorErrorBriefly,
  exportMap,
  updateLineInput,
  addStation,
} from 'data/actions'
import AddStation from 'components/icons/AddStation'
import AddLine from 'components/icons/AddLine'
import Export from 'components/icons/Export'

const Header = styled.div`
  height: 100vh;
  width: 20vw;
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: 0;
  left: 130vw;
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.22);
`

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 10vw;
  align-items: center;
`
const Icon = styled.div`
  margin-top: 1em;
  height: 20vh;
  width: 10vw;
  padding: 1.5em;
  cursor: pointer;
  &:first-of-type {
    padding-bottom: 0;
  }
`

const LinePrompt = styled.input`
  box-shadow: inset 0 0 14px 0px rgba(0, 0, 0, 0.5);
  height: 1.8em;
  width: 1.5em;
  padding-left: 0.5em;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  margin-top: 0.5em;
  border: none;
  outline: none;
  color: ${props => props.theme.textSecondary};
  font-size: 1.5em;
`

class EditMenu extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddLineClick = this.handleAddLineClick.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleLineInputChange = this.handleLineInputChange.bind(this)
    this.handleAddStation = this.handleAddStation.bind(this)
  }

  handleAddLineClick() {
    if (Object.keys(this.props.lines).length >= 6) {
      this.props.showEditorErrorBriefly('max number of lines reached', 3000)
    } else if (!this.props.namesAvailable) {
      this.props.showEditorErrorBriefly(
        'You reached the max number of stations',
        3000
      )
    } else {
      this.props.addLine()
    }
  }

  handleExport() {
    const { dialog } = window.require('electron').remote
    const exportPath = dialog.showSaveDialog({
      defaultPath: 'map_config.xml',
    })
    if (exportPath === undefined) {
      return
    }
    this.props.exportMap(exportPath)
    this.props.showEditorErrorBriefly(
      'Map exported, you might want to add events to the file',
      3000
    )
  }

  handleLineInputChange(event) {
    let value = event.target.value
    if (event.target.value.length > 0) {
      this.props.updateLineInput(value.substr(value.length - 1))
      return
    }
    this.props.updateLineInput(value)
  }

  handleAddStation() {
    if (this.props.addStationInput.length === 0) {
      this.props.showEditorErrorBriefly(
        'Please input a line to add a station on',
        3000
      )
    } else if (this.props.lines[this.props.addStationInput - 1] === undefined) {
      this.props.showEditorErrorBriefly("This line doesn't exist", 3000)
    } else if (!this.props.namesAvailable) {
      this.props.showEditorErrorBriefly(
        'You reached the max number of stations',
        3000
      )
    } else {
      this.props.addStation()
    }
  }

  render() {
    return (
      <Header>
        <IconsContainer>
          <Icon onClick={this.handleAddStation}>
            <AddStation />
          </Icon>
          <LinePrompt
            type="text"
            value={this.props.addStationInput}
            onChange={this.handleLineInputChange}
          />
          <Icon onClick={this.handleAddLineClick}>
            <AddLine />
          </Icon>
          <Icon onClick={this.handleExport}>
            <Export />
          </Icon>
        </IconsContainer>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  lines: state.map.lines,
  addStationInput: state.map.addStationInput,
  namesAvailable: state.map.availableStationNames.length > 0 ? true : false,
})

const mapDispatchToProps = {
  addLine,
  showEditorErrorBriefly,
  exportMap,
  updateLineInput,
  addStation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenu)
