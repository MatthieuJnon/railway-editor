import React from 'react'
import PropTypes from 'prop-types'
import { theme } from 'theme/globalStyle'

const Close = props => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 23 22">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      >
        <g
          id="Matthieu---Landing"
          transform="translate(-28.000000, -29.000000)"
          fillRule="nonzero"
          stroke={props.color ? props.color : theme.textSecondary}
          strokeWidth="3"
        >
          <g id="Close" transform="translate(30.000000, 30.000000)">
            <path
              d="M10,10 L-1.77635684e-15,20 L10,10 L-3.55271368e-15,1.77635684e-15 L10,10 Z M10,10 L20,20 L10,10 L20,0 L10,10 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

Close.propTypes = {
  color: PropTypes.string,
}

export default Close
