import styled from 'styled-components'
import { connect } from 'react-redux'
import React from 'react'

import { addLine, showEditorErrorBriefly, exportMap } from 'data/actions'
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
`
const Icon = styled.div`
  margin-top: 1em;
  height: 20vh;
  width: 10vw;
  padding: 1.5em;
  cursor: pointer;
`

class EditMenu extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddLineClick = this.handleAddLineClick.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  handleAddLineClick() {
    if (Object.keys(this.props.lines).length >= 6) {
      this.props.showEditorErrorBriefly('max number of lines reached', 3000)
    } else {
      this.props.addLine()
    }
  }

  handleExport() {
    const { dialog } = window.require('electron').remote
    this.props.exportMap(dialog.showSaveDialog())
  }

  render() {
    return (
      <Header>
        <IconsContainer>
          <Icon>
            <AddStation />
          </Icon>
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
})

const mapDispatchToProps = {
  addLine,
  showEditorErrorBriefly,
  exportMap,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenu)
