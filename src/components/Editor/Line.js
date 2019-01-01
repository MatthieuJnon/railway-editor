import React from 'react'
import PropTypes from 'prop-types'

// const Wrapper = styled.div`
// `

class Line extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.coords.map((coords, index) => {
          if (index !== this.props.coords.length - 1) {
            return (
              <line
                x1={coords[0] + 14}
                y1={coords[1] + 14}
                x2={this.props.coords[index + 1][0] + 14}
                y2={this.props.coords[index + 1][1] + 14}
                stroke={this.props.color}
                strokeWidth="8"
                key={index}
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
