import React from 'react'
import { theme } from 'theme/globalStyle'
import PropTypes from 'prop-types'

const Export = props => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 67 77">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Matthieu---Landing"
          transform="translate(-1108.000000, -353.000000)"
        >
          <g id="Export" transform="translate(1089.000000, 356.000000)">
            <text
              fontFamily="Montserrat-Regular, Montserrat"
              fontSize="20"
              fontWeight="normal"
              letterSpacing="0.5149427"
              fill={props.color ? props.color : theme.textSecondary}
            >
              <tspan x="17.3051719" y="70">
                Export
              </tspan>
            </text>
            <g
              id="Export-Icon"
              transform="translate(28.000000, 0.000000)"
              fillRule="nonzero"
            >
              <polyline
                id="Path"
                stroke={props.color ? props.color : theme.textSecondary}
                strokeWidth="5"
                strokeLinecap="round"
                points="29 34 0 34 0 2.12746487e-14 29 1.07761022e-14"
              />
              <polygon
                id="Path-2"
                fill={props.color ? props.color : theme.textSecondary}
                points="16 20 16 14 37 14 37 8.10867418 49 17 37 26 37 20"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

Export.propTypes = {
  color: PropTypes.string,
}

export default Export
