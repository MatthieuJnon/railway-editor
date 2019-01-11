export const addStation = () => {
  return {
    type: ADD_STATION
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

export const ADD_STATION = 'ADD_STATION'
export const ADD_LINE = 'ADD_LINE'
export const ADD_STATION_TO_LINE = 'ADD_STATION_TO_LINE'
export const MOVE_STATION = 'MOVE_STATION'
export const UPDATE_EDITOR_ERROR = 'UPDATE_EDITOR_ERROR'
export const EXPORT_MAP = 'EXPORT_MAP'
export const UPDATE_LINE_INPUT = 'UPDATE_LINE_INPUT'

export const showEditorErrorBriefly = (error, time) => {
  return dispatch => {
    dispatch(updateEditorError(error))
    setTimeout(() => dispatch(updateEditorError('')), time)
  }
}
