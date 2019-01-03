import React from 'react'
import { theme } from 'theme/globalStyle'
import PropTypes from 'prop-types'

const AddStation = props => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 74 88">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Matthieu---Landing"
          transform="translate(-1103.000000, -26.000000)"
        >
          <g id="Add-station" transform="translate(1089.000000, 26.000000)">
            <ellipse
              id="Oval"
              stroke={props.color ? props.color : theme.textSecondary}
              strokeWidth="5"
              fillOpacity="0"
              fill="#FFFFFF"
              cx="39.8734553"
              cy="34.8862757"
              rx="11.8734553"
              ry="11.8862757"
            />
            <text
              id="Station"
              fontFamily="Montserrat-Regular, Montserrat"
              fontSize="20"
              fontWeight="normal"
              letterSpacing="0.5149427"
              fill={props.color ? props.color : theme.textSecondary}
            >
              <tspan x="14.2977005" y="87">
                Station
              </tspan>
            </text>
            <path
              d="M70.5424723,7.54247233 L65.209139,12.8758057 L70.5424723,7.54247233 L65.209139,2.209139 L70.5424723,7.54247233 Z M70.5424723,7.54247233 L75.8758057,2.209139 L70.5424723,7.54247233 L75.8758057,12.8758057 L70.5424723,7.54247233 Z"
              id="Combined-Shape"
              stroke={props.color ? props.color : theme.textSecondary}
              strokeWidth="3"
              strokeLinecap="square"
              fillRule="nonzero"
              transform="translate(70.542472, 7.542472) rotate(45.000000) translate(-70.542472, -7.542472) "
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

AddStation.propTypes = {
  color: PropTypes.string,
}

export default AddStation
