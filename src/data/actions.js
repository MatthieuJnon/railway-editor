import { importXml } from './xml'

export const addStation = () => {
  return {
    type: ADD_STATION,
  }
}

export const addLine = () => {
  return {
    type: ADD_LINE,
  }
}

export const addStationToLine = (stationId, lineId, index) => {
  return {
    type: ADD_STATION_TO_LINE,
    stationId: stationId,
    lineId: lineId,
    index: index,
  }
}

export const moveStation = (stationId, newPosition) => {
  return {
    type: MOVE_STATION,
    stationId: stationId,
    newPosition: newPosition,
  }
}

export const updateEditorError = error => {
  return {
    type: UPDATE_EDITOR_ERROR,
    error: error,
  }
}

export const exportMap = path => {
  return {
    type: EXPORT_MAP,
    path: path,
  }
}

export const updateLineInput = input => {
  return {
    type: UPDATE_LINE_INPUT,
    input: input,
  }
}

export const selectStation = stationId => {
  return {
    type: SELECT_STATION,
    stationId: stationId,
  }
}

export const unselect = () => {
  return {
    type: UNSELECT,
  }
}

export const deleteStation = stationId => {
  return {
    type: DELETE_STATION,
    stationId: stationId,
  }
}

export const initiateLink = stationId => {
  return {
    type: INITIATE_LINK,
    stationId: stationId,
  }
}

export const linkStations = stationId => {
  return {
    type: LINK_STATIONS,
    stationId: stationId,
  }
}

export const loadMap = state => {
  return {
    type: LOAD_MAP,
    state: state,
  }
}

export const ADD_STATION_TO_LINE = 'ADD_STATION_TO_LINE'
export const UPDATE_EDITOR_ERROR = 'UPDATE_EDITOR_ERROR'
export const UPDATE_LINE_INPUT = 'UPDATE_LINE_INPUT'
export const SELECT_STATION = 'SELECT_STATION'
export const DELETE_STATION = 'DELETE_STATION'
export const INITIATE_LINK = 'INITIATE_LINK'
export const LINK_STATIONS = 'LINK_STATIONS'
export const MOVE_STATION = 'MOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const EXPORT_MAP = 'EXPORT_MAP'
export const UNSELECT = 'UNSELECT'
export const ADD_LINE = 'ADD_LINE'
export const LOAD_MAP = 'LOAD_MAP'

export const showEditorErrorBriefly = (error, time) => {
  return dispatch => {
    dispatch(updateEditorError(error))
    setTimeout(() => dispatch(updateEditorError('')), time)
  }
}

export const loadXml = path => {
  return async dispatch => {
    const newState = await importXml(path)

    dispatch(loadMap(newState))
  }
}
