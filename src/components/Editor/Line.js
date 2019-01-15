import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CustomLine = styled.line`
  transition: 'stroke 0.4s ease';
`

class Line extends React.Component {
  render() {
    //We set this offset because we have to correct for the size of a station,
    //Stations are placed from the top left hand corner but we want to place lines ends at the center of stations
    const offset = 14

    return (
      <React.Fragment>
        {this.props.coords.map((coords, index) => {
          if (index !== this.props.coords.length - 1) {
            const x1 = coords[0] + offset
            const y1 = coords[1] + 14
            const x2 = this.props.coords[index + 1][0] + offset
            const y2 = this.props.coords[index + 1][1] + offset

            const length = Math.sqrt(
              Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
            )
            return (
              <CustomLine
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={this.props.color}
                strokeWidth="8"
                key={index}
                strokeDashoffset={-10}
                strokeDasharray={length - 20 + ' ' + 10}
              />
            )
          }
          return null
        })}
      </React.Fragment>
    )
  }
}

Line.propTypes = {
  coords: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
}

export default Line
