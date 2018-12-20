import React, { Component } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { connect } from 'react-redux'

const EditorView = styled.div`
  height: 100vh;
  width: 80vw;
  /* border: 3px solid black; */
  position: absolute;
  top: 0;
  left: 50vw;
`

const EditorZone = styled.div`
  top: 50vh;
  left: 50%;
  position: absolute;
  height: 50vh;
  width: 40vw;
  /* border: 3px solid black; */
`

const Station = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 20041997px;
  border: 8px solid ${props => props.theme.primary};
`


class Editor extends Component {
  render() {
    return (
      <EditorView>
        <EditorZone>
          {this.props.stations.map(station => (
            <Draggable
              bounds={{
                left: -document.documentElement.clientWidth * 0.4,
                top: -document.documentElement.clientHeight * 0.5,
                right: document.documentElement.clientWidth * 0.4,
                bottom: document.documentElement.clientHeight * 0.48,
              }}
              disabled={this.props.screen !== 'editor'}
              defaultPosition={{
                x: station.position[0],
                y: station.position[1],
              }}
              key={station.id}
            >
              <Station key={station.id} />
            </Draggable>
          ))}
        </EditorZone>
      </EditorView>
    )
  }
}

const mapStateToProps = state => ({
  stations: state.map.stations,
  lines: state.map.lines,
  screen: state.app.screen,
})

export default connect(mapStateToProps)(Editor)
