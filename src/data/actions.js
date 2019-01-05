export const addStation = station => {
  return {
    type: 'ADD_STATION',
    station: station,
  }
}

export const addLine = line => {
  return {
    type: 'ADD_LINE',
    line: line,
  }
}

export const addStationToLine = (stationId, lineId, index) => {
  return {
    type: 'ADD_STATION_TO_LINE',
    stationId: stationId,
    lineId: lineId,
    index: index,
  }
}

export const moveStation = (stationId, newPosition) => {
  return {
    type: 'MOVE_STATION',
    stationId: stationId,
    newPosition: newPosition,
  }
}

export const ADD_STATION = 'ADD_STATION'
export const ADD_LINE = 'ADD_LINE'
export const ADD_STATION_TO_LINE = 'ADD_STATION_TO_LINE'
export const MOVE_STATION = 'MOVE_STATION'
