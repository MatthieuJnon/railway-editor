import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const EditorView = styled.div`
  height: 100vh;
  width: 80vw;
  /* border: 3px solid black; */
  position: absolute;
  top: 0;
  left: 50vw;
`

class Editor extends Component {
  render() {
    return <EditorView />
  }
}

export default Editor
