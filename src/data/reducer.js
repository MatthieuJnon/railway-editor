import { ADD_LINE, ADD_STATION, ADD_STATION_TO_LINE, MOVE_STATION } from './actions'

const initialMapState = {
  lines: {
    '0': {
      name: 'Black',
      color: '#aaaaaa',
      order: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
    },
    '1': {
      name: 'Blue',
      color: '#216eb4',
      order: [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19],
    },
  },
  stations: {
    '0': { name: 'Agapanthe', position: [150, 700] },
    '1': { name: 'Bleuet', position: [865, 85] },
    '2': { name: 'Coquelicot', position: [221, 629] },
    '3': { name: 'Dahlia', position: [794, 156] },
    '4': { name: 'Edelweiss', position: [291, 559] },
    '5': { name: 'Ficaire', position: [723, 227] },
    '6': { name: 'Grebera', position: [330, 466] },
    '7': { name: 'Hortensia', position: [623.4, 226.6] },
    '8': { name: 'Iris', position: [368, 374] },
    '9': { name: 'Jasmin', position: [553, 297] },
    '10': { name: 'Kalmie', position: [460, 336] },
    '11': { name: 'Lys', position: [360, 336] },
    '12': { name: 'Marguerite', position: [499, 243] },
    '13': { name: 'Narcisse', position: [269, 297] },
    '14': { name: 'Ophrys', position: [460, 151] },
    '15': { name: 'Petunia', position: [168, 297] },
    '16': { name: 'Quinoa', position: [499, 58] },
    '17': { name: 'Renoncule', position: [76, 259] },
    '18': { name: 'Scabieuse', position: [591, 20] },
    '19': { name: 'Tulipe', position: [5, 188] },
  },
  autoIndexLineCounter: 2,
  autoIndexStationCounter: 20,
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
            order: order,
          }
        }),
      }
    case MOVE_STATION:
      return {
        ...state,
        stations: {
          ...state.stations,
          [action.stationId]: {
            ...state.stations[action.stationId],
            position: action.newPosition
          }
        }
      }
    default:
      return state
  }
}

export default map
