import xml2js, { parseString } from 'xml2js'

export const exportXml = (map, pathToExportTo) => {
  map = { ...map }

  const xmlObject = {
    map: {
      stations: {
        station: [],
      },
      lines: {
        line: [],
      },
      events: {
        event: [],
      },
    },
  }

  const stationsKeys = Object.keys(map.stations)
  const linesKeys = Object.keys(map.lines)

  stationsKeys.forEach(stationIndex => {
    let station = map.stations[stationIndex]
    xmlObject.map.stations.station.push({
      id: stationIndex,
      name: station.name,
      position: {
        latitude: station.position[1] / 10000,
        longitude: station.position[0] / 10000,
      },
      lines: {
        line: station.lines.map(id => {
          return {
            $: {
              id: id,
              platform: '',
            },
          }
        }),
      },
    })
  })

  linesKeys.forEach(lineIndex => {
    let line = map.lines[lineIndex]
    xmlObject.map.lines.line.push({
      id: lineIndex,
      name: line.name,
      numberOfTrain: Math.round(line.order.length / 2),
      stations: {
        station: line.order.map((stationId, index) => {
          return {
            $: {
              id: stationId,
              order: index,
            },
          }
        }),
      },
    })
  })

  if (pathToExportTo.substr(pathToExportTo.length - 4) !== '.xml') {
    pathToExportTo = pathToExportTo + '.xml'
  }

  const builder = new xml2js.Builder()
  const remote = window.require('electron').remote
  const fs = remote.require('fs')

  fs.writeFile(pathToExportTo, builder.buildObject(xmlObject), err => {})
}

export const importXml = async path => {
  const remote = window.require('electron').remote
  const fs = remote.require('fs')
  const util = remote.require('util')

  const readXml = util.promisify(parseString)

  const xmlFile = fs.readFileSync(path, { encoding: 'utf8' })

  const xml = await readXml(xmlFile)

  let state = {
    lines: {},
    stations: {},
    autoIndexLineCounter: 1,
    autoIndexStationCounter: 1,
    availableStationName: [],
    error: '',
    addStationInput: 1,
    selectedStation: -1,
    linkMode: false,
    linkStation: -1,
  }

  const stations = xml.map.stations[0].station

  stations.forEach(station => {
    state.stations[station.name] = {}
  })
  const lines = xml.map.lines[0].line
  console.log(lines)
}
