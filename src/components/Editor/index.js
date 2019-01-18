import React, { Component } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  moveStation,
  selectStation,
  unselect,
  deleteStation,
  linkStations,
  initiateLink,
} from 'data/actions'
import { updateEditorInfo } from 'actions'
import { getLineColors, getSecondaryColors } from 'data'
import Line from 'components/Editor/Line'
import CloseStation from 'components/icons/CloseStation'
import LinkStations from 'components/icons/LinkStations'

const EditorView = styled.div`
  height: 100vh;
  width: 80vw;
  /* border: 3px solid black; */
  position: absolute;
  top: 0;
  left: 50vw;
`

const Station = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 20041997px;
  border: 8px solid ${props => props.color};
  transition: 'border 0.4s ease';
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

const CloseStationIcon = styled.div`
  height: 27px;
  width: 27px;
  position: absolute;
  top: ${props => props.top - 40}px;
  left: ${props => props.left}px;
`

const LinkStationsIcon = styled.div`
  height: 27px;
  width: 27px;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left + 40}px;
`

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
    }

    this.handleStationMouseEnter = this.handleStationMouseEnter.bind(this)
    this.handleStationMouseLeave = this.handleStationMouseLeave.bind(this)
    this.handleStationDelete = this.handleStationDelete.bind(this)
    this.handleStationClick = this.handleStationClick.bind(this)
    this.handleStationDrag = this.handleStationDrag.bind(this)
    this.handleEditorClick = this.handleEditorClick.bind(this)
    this.handleStationLink = this.handleStationLink.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
  }

  handleStationDrag(event, data) {
    const stationId = data.node.attributes['data-id'].value
    const station = this.props.stations[stationId]
    this.setState({
      dragging: true,
    })
    this.props.moveStation(stationId, [data.x, data.y])
    this.props.updateEditorInfo(
      `station : "${station.name}" X:${station.position[0]} Y:${
        station.position[1]
      } line : ${station.lines.map(line => line + 1)} `
    )
  }

  handleStationMouseEnter(station) {
    this.props.updateEditorInfo(
      `station : "${station.name}" X:${station.position[0]} Y:${
        station.position[1]
      } line : ${station.lines.map(line => line + 1)} `
    )
  }

  handleStationMouseLeave() {
    this.props.updateEditorInfo('')
  }

  handleDragStop() {
    setTimeout(() => {
      this.setState({
        dragging: false,
      })
    }, 5)
  }

  handleStationClick(stationIndex) {
    if (
      this.state.dragging ||
      this.props.screen !== 'editor' ||
      (this.props.linkMode && stationIndex === this.props.linkStation)
    ) {
      return
    } else {
      if (this.props.linkMode) {
        this.props.linkStations(stationIndex)
        return
      }
      stationIndex === this.props.selectedStation
        ? this.props.unselect()
        : this.props.selectStation(stationIndex)
    }
  }

  handleEditorClick(event) {
    if (event.target !== document.getElementById('editor-view')) {
      return
    }
    this.props.unselect()
  }

  handleStationDelete(stationIndex) {
    this.props.deleteStation(stationIndex)
  }

  handleStationLink(stationIndex) {
    this.props.initiateLink(stationIndex)
  }

  render() {
    const { stations, lines, screen, selectedStation } = this.props

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
        secondaryColor: getSecondaryColors(lines[element].id),
      })
    })

    linesToRender = linesToRender.map((line, index) => {
      return (
        <Line
          coords={line.coords}
          color={
            screen !== 'editor' || selectedStation !== -1
              ? line.secondaryColor
              : line.color
          }
          key={index}
          disasbled={screen !== 'editor' || selectedStation !== -1}
        />
      )
    })

    const clientHeight = document.documentElement.clientHeight
    const clientWidth = document.documentElement.clientWidth

    return (
      <EditorView
        active={this.props.screen === 'editor'}
        onClick={this.handleEditorClick}
      >
        <EditorSvg
          viewBox={`0 0 ${clientWidth * 0.8} ${clientHeight * 0.98}`}
          id="editor-view"
        >
          {linesToRender}
        </EditorSvg>
        {Object.keys(stations).map(stationIndex => {
          const station = stations[stationIndex]
          return (
            <React.Fragment key={stationIndex}>
              <Draggable
                bounds="parent"
                disabled={
                  screen !== 'editor' ||
                  (stationIndex !== selectedStation && selectedStation !== -1)
                }
                defaultPosition={{
                  x: station.position[0],
                  y: station.position[1],
                }}
                onDrag={this.handleStationDrag}
                key={stationIndex}
                onStop={this.handleDragStop}
              >
                <Station
                  data-id={stationIndex}
                  color={
                    screen !== 'editor' ||
                    (stationIndex !== selectedStation && selectedStation !== -1)
                      ? getSecondaryColors(station.lines[0])
                      : getLineColors(station.lines[0])
                  }
                  onClick={() => this.handleStationClick(stationIndex)}
                  onMouseEnter={() => this.handleStationMouseEnter(station)}
                  onMouseLeave={this.handleStationMouseLeave}
                />
              </Draggable>
              {stationIndex === selectedStation && !this.props.linkMode && (
                <React.Fragment>
                  <CloseStationIcon
                    left={station.position[0]}
                    top={station.position[1]}
                    onClick={() => this.handleStationDelete(stationIndex)}
                  >
                    <CloseStation />
                  </CloseStationIcon>
                  <LinkStationsIcon
                    left={station.position[0]}
                    top={station.position[1]}
                    onClick={() => this.handleStationLink(stationIndex)}
                  >
                    <LinkStations />
                  </LinkStationsIcon>
                </React.Fragment>
              )}
            </React.Fragment>
          )
        })}
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
  selectedStation: state.map.selectedStation,
  linkMode: state.map.linkMode,
  linkStation: state.map.linkStation,
})

const mapDispatchToProps = {
  moveStation,
  updateEditorInfo,
  selectStation,
  unselect,
  deleteStation,
  linkStations,
  initiateLink,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
