import {
  ADD_LINE,
  ADD_STATION,
  ADD_STATION_TO_LINE,
  MOVE_STATION,
} from './actions'

const initialMapState = {
  lines: {
    '0': {
      name: 'Black',
      id: 0,
      order: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
    },
    '1': {
      name: 'Blue',
      id: 1,
      order: [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19],
    },
  },
  stations: {
    '0': { name: 'Agapanthe', position: [150, 700], lines: [0] },
    '1': { name: 'Bleuet', position: [865, 85], lines: [1] },
    '2': { name: 'Coquelicot', position: [221, 629], lines: [0] },
    '3': { name: 'Dahlia', position: [794, 156], lines: [1] },
    '4': { name: 'Edelweiss', position: [291, 559], lines: [0] },
    '5': { name: 'Ficaire', position: [723, 227], lines: [1] },
    '6': { name: 'Grebera', position: [330, 466], lines: [0] },
    '7': { name: 'Hortensia', position: [623.4, 226.6], lines: [1] },
    '8': { name: 'Iris', position: [368, 374], lines: [0] },
    '9': { name: 'Jasmin', position: [553, 297], lines: [1] },
    '10': { name: 'Kalmie', position: [460, 336], lines: [0, 1] },
    '11': { name: 'Lys', position: [360, 336], lines: [1] },
    '12': { name: 'Marguerite', position: [499, 243], lines: [0] },
    '13': { name: 'Narcisse', position: [269, 297], lines: [1] },
    '14': { name: 'Ophrys', position: [460, 151], lines: [0] },
    '15': { name: 'Petunia', position: [168, 297], lines: [1] },
    '16': { name: 'Quinoa', position: [499, 58], lines: [0] },
    '17': { name: 'Renoncule', position: [76, 259], lines: [1] },
    '18': { name: 'Scabieuse', position: [591, 20], lines: [0] },
    '19': { name: 'Tulipe', position: [5, 188], lines: [1] },
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
            position: action.newPosition,
          },
        },
      }
    default:
      return state
  }
}

export default map
