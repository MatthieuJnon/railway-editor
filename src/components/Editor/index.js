import React, { Component } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { moveStation } from 'data/actions'
import { updateEditorInfo } from 'actions'
import { getLineColors } from 'data'
import Line from 'components/Editor/Line'

const EditorView = styled.div`
  height: 100vh;
  width: 80vw;
  /* border: 3px solid black; */
  position: absolute;
  top: 0;
  left: 50vw;
  transition: ${props => props.theme.menuTransition};
  opacity: ${props => props.active ? 1 : 0.2};
`

const Station = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 20041997px;
  border: 8px solid ${props => props.color};
`

const EditorSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  height: 98vh;
  width: 80vw;
`
const InfoDisplay = styled.div`
  position: absolute;
  left: -3vw;
  bottom: 0;
  height: 1.8em;
  width: 50vw;
  color: ${props => props.theme.primary};
  font-size: 1em;
`

const ErrorDisplay = styled.div`
  position: absolute;
  left: -3vw;
  bottom: 1.8em;
  width: 50vw;
  color: ${props => props.theme.error};
  font-size: 1.2em;
`

class Editor extends Component {
  constructor(props) {
    super(props)

    this.handleStationDrag = this.handleStationDrag.bind(this)
    this.handleStationMouseEnter = this.handleStationMouseEnter.bind(this)
    this.handleStationMouseLeave = this.handleStationMouseLeave.bind(this)
  }

  handleStationDrag(event, data) {
    this.props.moveStation(data.node.attributes['data-id'].value, [
      data.x,
      data.y,
    ])
  }

  handleStationMouseEnter(station) {
    this.props.updateEditorInfo(
      `station : "${station.name}" X:${station.position[0]} Y:${
        station.position[1]
      } line : ${station.lines.map(line => line + 1)} `
    )
  }

  handleStationMouseLeave(station) {
    this.props.updateEditorInfo('')
  }

  render() {
    const { stations, lines } = this.props

    let linesKeys = Object.keys(lines)
    let linesToRender = []
    linesKeys.forEach(element => {
      let coords = lines[element].order
      coords = coords.map(stationIndex => {
        return stations[stationIndex].position
      })
      linesToRender.push({
        coords: coords,
        color: getLineColors(lines[element].id),
      })
    })

    linesToRender = linesToRender.map((line, index) => {
      return <Line coords={line.coords} color={line.color} key={index} />
    })

    const clientHeight = document.documentElement.clientHeight
    const clientWidth = document.documentElement.clientWidth

    return (
      <EditorView active={this.props.screen === 'editor'}>
        <EditorSvg viewBox={`0 0 ${clientWidth * 0.8} ${clientHeight * 0.98}`}>
          {linesToRender}
        </EditorSvg>
        {Object.keys(stations).map(stationIndex => (
          <Draggable
            bounds="parent"
            disabled={this.props.screen !== 'editor'}
            defaultPosition={{
              x: stations[stationIndex].position[0],
              y: stations[stationIndex].position[1],
            }}
            onDrag={this.handleStationDrag}
            key={stationIndex}
            onStop={() => this.handleStationMouseEnter(stations[stationIndex])}
          >
            <Station
              data-id={stationIndex}
              color={getLineColors(stations[stationIndex].lines[0])}
              onMouseEnter={() =>
                this.handleStationMouseEnter(stations[stationIndex])
              }
              onMouseLeave={() =>
                this.handleStationMouseLeave(stations[stationIndex])
              }
            />
          </Draggable>
        ))}
        {this.props.screen === 'editor' && (
          <InfoDisplay>{this.props.info}</InfoDisplay>
        )}
        {this.props.error !== '' && (
          <ErrorDisplay>{this.props.error}</ErrorDisplay>
        )}
      </EditorView>
    )
  }
}

const mapStateToProps = state => ({
  stations: state.map.stations,
  lines: state.map.lines,
  screen: state.app.screen,
  info: state.app.editorInfo,
  error: state.map.error,
})

const mapDispatchToProps = {
  moveStation,
  updateEditorInfo,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
