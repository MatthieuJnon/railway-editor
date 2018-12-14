import { ADD_LINE, ADD_STATION, ADD_STATION_TO_LINE } from './actions'

const initialMapState = {
  lines: [
    {
      id: 0,
      name: 'Black',
      order: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
    },
    {
      id: 1,
      name: 'Blue',
      order: [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19],
    },
  ],
  stations: [
    { name: 'Agapanthe', id: 0, position: [0, 0] },
    { name: 'Bleuet', id: 1, position: [71.5, 61.5] },
    { name: 'Coquelicot', id: 2, position: [7.1, 7.1] },
    { name: 'Dahlia', id: 3, position: [64.4, 54.4] },
    { name: 'Edelweiss', id: 4, position: [14.1, 14.1] },
    { name: 'Ficaire', id: 5, position: [57.3, 47.3] },
    { name: 'Grebera', id: 6, position: [18, 23.4] },
    { name: 'Hortensia', id: 7, position: [47.34, 47.34] },
    { name: 'Iris', id: 8, position: [21.8, 32.6] },
    { name: 'Jasmin', id: 9, position: [40.3, 40.3] },
    { name: 'Kalmie', id: 10, position: [31, 36.4] },
    { name: 'Lys', id: 11, position: [21, 36.4] },
    { name: 'Marguerite', id: 12, position: [34.9, 45.7] },
    { name: 'Narcisse', id: 13, position: [11.9, 40.3] },
    { name: 'Ophrys', id: 14, position: [31, 54.9] },
    { name: 'Petunia', id: 15, position: [1.8, 40.3] },
    { name: 'Quinoa', id: 16, position: [34.9, 64.2] },
    { name: 'Renoncule', id: 17, position: [-7.4, 44.1] },
    { name: 'Scabieuse', id: 18, position: [44.1, 68] },
    { name: 'Tulipe', id: 19, position: [-14.5, 51.2] },
  ],
  autoIndexLineCounter: 0,
  autoIndexStationCounter: 0,
}

function map(state = initialMapState, action) {
  switch (action.type) {
    case ADD_STATION:
      return Object.assign({}, state, {
        stations: [
          ...state.stations,
          {
            name: action.station.name,
            position: action.station.position,
            id: state.autoIndexStationCounter++,
          },
        ],
      })
    case ADD_LINE:
      return Object.assign({}, state, {
        lines: [
          ...state.lines,
          {
            name: action.line.name,
            order: [],
            id: state.autoIndexLineCounter++,
          },
        ],
      })
    case ADD_STATION_TO_LINE:
      return {
        ...state,
        lines: state.lines.map(line => {
          if (line.index !== action.index) {
            return line
          }
          //slice copies the array by value
          let order = line.order.slice()
          order.splice(action.index, 0, action.stationId)
          return {
            ...line,
            order: order
          }
        }),
      }
    default:
      return state
  }
}

export default map
