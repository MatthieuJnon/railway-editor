import {
  ADD_LINE,
  ADD_STATION,
  MOVE_STATION,
  UPDATE_EDITOR_ERROR,
  EXPORT_MAP,
  UPDATE_LINE_INPUT,
  SELECT_STATION,
  UNSELECT,
  DELETE_STATION,
  INITIATE_LINK,
  LINK_STATIONS,
  LOAD_MAP,
} from './actions'

import { exportXml } from './xml'

const linesNames = ['Blue', 'Black', 'Green', 'Orange', 'Purple', 'Yellow']

const initialMapState = {
  lines: {
    '0': {
      name: 'Blue',
      id: 0,
      order: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
    },
    '1': {
      name: 'Black',
      id: 1,
      order: [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19],
    },
  },
  stations: {
    '0': { name: 'Agapanthe', position: [129, 587], lines: [0] },
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
  availableStationNames: [
    'Ursinia',
    'Violet',
    'Waterlily',
    'Xeranthemum',
    'Yarrow',
    'Zenobia',
    'Amaranthus',
    'Begonia',
    'Cyclamen',
    'Daphne',
    'Echinacea',
  ],
  error: '',
  addStationInput: 1,
  selectedStation: -1,
  linkMode: false,
  linkStation: -1,
}

function getNewLineId(lines) {
  const possibleIds = ['0', '1', '2', '3', '4', '5']
  const lineKeys = Object.keys(lines)
  return possibleIds.find(id => {
    return !lineKeys.includes(id)
  })
}

function map(state = initialMapState, action) {
  switch (action.type) {
    case ADD_STATION:
      const lineToUpdate = state.addStationInput - 1
      const lastStationPosition =
        state.stations[
          state.lines[lineToUpdate].order[
            state.lines[lineToUpdate].order.length - 1
          ]
        ].position
      return {
        ...state,
        lines: {
          ...state.lines,
          [lineToUpdate]: {
            ...state.lines[lineToUpdate],
            order: [
              ...state.lines[lineToUpdate].order,
              state.autoIndexStationCounter,
            ],
          },
        },
        stations: {
          ...state.stations,
          [state.autoIndexStationCounter]: {
            name: state.availableStationNames[0],
            position: [
              lastStationPosition[0] + 25,
              lastStationPosition[1] + 25,
            ],
            lines: [lineToUpdate],
          },
        },
        autoIndexStationCounter: state.autoIndexStationCounter + 1,
        availableStationNames: state.availableStationNames.slice(1),
      }
    case DELETE_STATION:
      const station = state.stations[action.stationId]
      const lines = []

      //Then we populate lines
      station.lines.forEach(line => {
        lines.push(state.lines[line])
      })

      //We create a new state to facilitate updating of the state
      let newState = {
        ...state,
        availableStationNames: [...state.availableStationNames, station.name],
        selectedStation: -1,
      }

      //We remove the station from each line where its present and remove the line if necessary
      lines.forEach(line => {
        line = line.id
        newState = {
          ...newState,
          lines: {
            ...newState.lines,
            [line]: {
              ...newState.lines[line],
              order: newState.lines[line].order.filter(
                item => parseInt(item) !== parseInt(action.stationId)
              ),
            },
          },
        }

        //We remove the line if necessary
        if (newState.lines[line].order.length === 0) {
          const { ['' + line]: _, ...newLines } = newState.lines
          newState = {
            ...newState,
            lines: newLines,
          }
        }
      })

      const { ['' + action.stationId]: _, ...newStations } = newState.stations

      newState = { ...newState, stations: newStations }

      return newState
    case SELECT_STATION:
      return {
        ...state,
        selectedStation: action.stationId,
      }
    case LOAD_MAP:
      return action.state
    case UNSELECT:
      return {
        ...state,
        selectedStation: -1,
        linkMode: false,
      }
    case INITIATE_LINK:
      return {
        ...state,
        linkMode: true,
        linkStation: action.stationId,
      }
    case LINK_STATIONS:
      const station1 = state.stations[state.linkStation]
      const station2 = state.stations[action.stationId]

      const { ['' + action.stationId]: value, ...stations } = state.stations

      stations[state.linkStation] = {
        ...station1,
        lines: [...station1.lines, ...station2.lines],
      }

      let nState = {
        ...state,
        linkMode: false,
        stations: stations,
        selectedStation: -1,
        availableStationNames: [...state.availableStationNames, station2.name],
      }

      station2.lines.forEach(line => {
        nState = {
          ...nState,
          lines: {
            ...nState.lines,
            [line]: {
              ...nState.lines[line],
              order: nState.lines[line].order.map(station => {
                if (parseInt(station) === parseInt(action.stationId)) {
                  return state.linkStation
                }
                return station
              }),
            },
          },
        }
      })

      return nState
    case UPDATE_LINE_INPUT:
      return {
        ...state,
        addStationInput: action.input,
        linkMode: false,
      }
    case EXPORT_MAP:
      exportXml(state, action.path)
      return {
        ...state,
        linkMode: false,
      }
    case UPDATE_EDITOR_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case ADD_LINE:
      if (Object.keys(state.lines).length > 6) {
        return state
      }
      const newLineId = getNewLineId(state.lines)
      return {
        ...state,
        linkMode: false,
        lines: {
          ...state.lines,
          [newLineId]: {
            name: linesNames[newLineId],
            id: newLineId,
            order: [state.autoIndexStationCounter],
          },
        },
        stations: {
          ...state.stations,
          [state.autoIndexStationCounter]: {
            name: state.availableStationNames[0],
            position: [50, 100 + newLineId * 100],
            lines: [parseInt(newLineId)],
          },
        },
        autoIndexStationCounter: state.autoIndexStationCounter + 1,
        availableStationNames: state.availableStationNames.slice(1),
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
