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
    { name: 'Agapanthe', id: 0, position: [-300, 300] },
    { name: 'Bleuet', id: 1, position: [415, -315] },
    { name: 'Coquelicot', id: 2, position: [-229, 229] },
    { name: 'Dahlia', id: 3, position: [344, -244] },
    { name: 'Edelweiss', id: 4, position: [-159, 159] },
    { name: 'Ficaire', id: 5, position: [273, -173] },
    { name: 'Grebera', id: 6, position: [-120, 66] },
    { name: 'Hortensia', id: 7, position: [173.4, -173.4] },
    { name: 'Iris', id: 8, position: [-82, -26] },
    { name: 'Jasmin', id: 9, position: [103, -103] },
    { name: 'Kalmie', id: 10, position: [10, -64] },
    { name: 'Lys', id: 11, position: [-90, -64] },
    { name: 'Marguerite', id: 12, position: [49, -157] },
    { name: 'Narcisse', id: 13, position: [-181, -103] },
    { name: 'Ophrys', id: 14, position: [10, -249] },
    { name: 'Petunia', id: 15, position: [-282, -103] },
    { name: 'Quinoa', id: 16, position: [49, -342] },
    { name: 'Renoncule', id: 17, position: [-374, -141] },
    { name: 'Scabieuse', id: 18, position: [141, -380] },
    { name: 'Tulipe', id: 19, position: [-445, -212] },
  ],
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
            order: order
          }
        }),
      }
    default:
      return state
  }
}

export default map
