import React, { Component } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { moveStation } from 'data/actions'
import Line from 'components/Editor/Line'

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
  border: 8px solid ${props => props.theme.primary};
`

const EditorSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  height: 98vh;
  width: 80vw;
`

class Editor extends Component {
  constructor(props) {
    super(props)

    this.handleStationDrag = this.handleStationDrag.bind(this)
  }

  handleStationDrag(event, data) {
    this.props.moveStation(data.node.attributes['data-id'].value, [
      data.x,
      data.y,
    ])
  }

  render() {
    let linesKeys = Object.keys(this.props.lines)
    let lines = []
    linesKeys.forEach(element => {
      let coords = this.props.lines[element].order
      coords = coords.map(stationIndex => {
        return this.props.stations[stationIndex].position
      })
      lines.push({
        coords: coords,
        color: this.props.lines[element].color,
      })
    })

    lines = lines.map((line, index) => {
      return <Line coords={line.coords} color={line.color} key={index} />
    })

    const clientHeight = document.documentElement.clientHeight
    const clientWidth = document.documentElement.clientWidth

    return (
      <EditorView>
        <EditorSvg viewBox={`0 0 ${clientWidth * 0.8} ${clientHeight * 0.98}`}>
          {lines}
        </EditorSvg>
        {Object.keys(this.props.stations).map(stationIndex => (
          <Draggable
            bounds="parent"
            disabled={this.props.screen !== 'editor'}
            defaultPosition={{
              x: this.props.stations[stationIndex].position[0],
              y: this.props.stations[stationIndex].position[1],
            }}
            onDrag={this.handleStationDrag}
            key={stationIndex}
          >
            <Station data-id={stationIndex} />
          </Draggable>
        ))}
      </EditorView>
    )
  }
}

const mapStateToProps = state => ({
  stations: state.map.stations,
  lines: state.map.lines,
  screen: state.app.screen,
})

const mapDispatchToProps = {
  moveStation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
